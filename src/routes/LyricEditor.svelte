<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { EMPTY_SONG_CONTENTS } from "./constants.js";
	import { insertAtIndex, removeAtIndex, splitLine } from "./functions.js";
	import { max, min } from './functions.js';
	import {
		author,
		breakIndexes,
		color,
		currentSongId,
		fontFamily,
		lines,
		numberOfColumns,
		rawClipboardContents,
		songId,
		textColor,
		title,
	} from "./stores.js";

	const maxLength = 23;
	const editLines = writable(true);
	// let workIsUnsaved = false;
	let column_ch_width = writable(30);

	function createNewSong() {
		// new id
		const newId = new Date().getTime().toString();
		songId.set(newId);
		currentSongId.set(newId);
		// clear everything
		title.set("");
		author.set("");
		rawClipboardContents.set(EMPTY_SONG_CONTENTS);
	}

	onMount(async () => {
		rawClipboardContents.subscribe((v) => setLyricDataFromClipboard(v));
		document.addEventListener("paste", (event) => {
			if (event.target.tagName != "INPUT") readClipboard();
		});

		lines.subscribe((newLines) => {
			let longestLineWidth = 0;
			for (let { text } of newLines) {
				if (text.length > longestLineWidth) longestLineWidth = text.length;
			}
			//column_ch_width.set(longestLineWidth);
			column_ch_width.set(max(20, min(longestLineWidth, 40)));
		});

		//allow for scrolling with mouse wheel
		let lyricRegion = document.getElementById("lyric-region");
		if (lyricRegion) {
			lyricRegion.addEventListener("wheel", function (e) {
				lyricRegion.scrollLeft += e.deltaY;
			});
		}
	});

	function removeRange(str, start, end) {
		return str.slice(0, start) + str.slice(end);
	}

	async function handleTextAreaEdit(input) {
		// console.log({ input });
		// get index of lyric/textarea
		const index = parseInt(input.target.dataset["lyricLineNumber"]);
		// get cursor location
		const textareaElement = document.getElementById(
			`lyric-input-${index}`,
		);
		const selectionStart = textareaElement.selectionStart;
		const selectionEnd = textareaElement.selectionEnd;
		const hasSelectionRange = selectionStart != selectionEnd;
		console.log({selectionStart, selectionEnd})
		console.log(input.target.value.length)
		// sleep 100ms so I can read the target value after it is set
		await new Promise((resolve) => setTimeout(resolve, 100));
		// create a copy of lines to edit
		let allLines = $lines;
		let focusIndex = index;
		let focusCursor = selectionStart;

		// console.log(input.key == "Delete", selectionStart == input.target.value.length);
		// break into multiple lines as necessary
		if (input.key == "Enter") {
			// get contents into list of lines
			let lyrics = input.target.value
				.trim()
				.split("\n")
				.map((e) => e.trim());
			// enter at the end of the line -> empty next line
			if (lyrics.length == 1) {
				lyrics[1] = "";
				// remove \n from input
				let el = document.getElementById(`lyric-input-${index}`);
				el.value = el.value.trim();
			}
			// add the new line, with divider value of previous line
			allLines = insertAtIndex(
				allLines,
				{ text: lyrics[1], divider: allLines[index].divider },
				index + 1,
			);
			// update old lines value, set divider to false
			allLines[index] = { text: lyrics[0], divider: false };
			// set focus location
			focusIndex = index + 1;
			// focusCursor = allLines[index + 1].text.length;
			focusCursor = 0;
		}
		// join next line to the current line
		else if (input.key == "Delete" && selectionEnd == input.target.value.length) {
			// update current line to have next line contents
			allLines[index] = {
				// join lines
				text: (allLines[index].text + " " + allLines[index + 1].text).trim(),
				// keep divider
				divider: allLines[index].divider || allLines[index + 1].divider,
			};
			// remove next line
			allLines = removeAtIndex(allLines, index + 1);
			// set focus location
			focusIndex = index;
			focusCursor = selectionStart + 1;
		}
		// join current line to the previous line
		else if (input.key == "Backspace" && selectionStart == 0 && !hasSelectionRange) {
			// set focus location
			focusIndex = index - 1;
			focusCursor = allLines[index - 1].text.length + 1;
			// update previous line to have current line contents
			allLines[index - 1] = {
				text: (allLines[index - 1].text + " " + allLines[index].text).trim(),
				divider: allLines[index - 1].divider || allLines[index].divider,
			};
			// remove current line
			allLines = removeAtIndex(allLines, index);
		}
		// ignore all other input
		else {
			allLines[index] = { text: textareaElement.value, divider: allLines[index].divider };
			lines.set(allLines);
			return;
		}
		// set lines
		lines.set(allLines);
		// after lines have been updated, focus and return selectionStart position
		setTimeout(() => {
			let el = document.getElementById(`lyric-input-${focusIndex}`);
			el.focus();
			el.setSelectionRange(focusCursor, focusCursor);
		}, 100);
	}

	/**
	 * @param {String} contents - Check if a line should be split in half
	 */
	function setLyricDataFromClipboard(contents) {
		// rawClipboardContents.set(EXAMPLE_CONTENTS_2)
		// console.log(contents)

		// split at single newlines
		let lyricLines = contents
			// remove something like [Refrain]
			.replace(/\[[^\]]+\]/g, "")
			// remove indexes in hymns
			.replace(/^\d\D/g, "")
			// remove annotations
			.replace(/^(Refrain|Verse|Chorus):?/g, "")
			.trim()
			.split(/\n/)
			// remove leading and trailing whitespace
			.map((line) => line.trim())
			// split lines in half as necessary
			.map(splitLine)
			.flat();

		// filter out lines
		// lyricLines = lineFilter(lyricLines);

		// get indexes of lines where spaces are after
		// doing this before filtering them out
		let offset = 1;
		let emptyIndexes = [];

		for (let i in lyricLines) {
			let line = lyricLines[i];
			if (line.length == 0) {
				emptyIndexes.push(Number(i) - offset);
				offset++;
			}
		}
		breakIndexes.set(emptyIndexes);

		// remove empty lines
		lyricLines = lyricLines.filter((line) => line.length > 0);
		// lines.set(lyricLines)
		lines.set(
			lyricLines.map((value, i) => {
				return {
					text: value,
					divider: emptyIndexes.includes(i),
				};
			}),
		);
	}

	async function readClipboard() {
		// save the clipboard contents
		rawClipboardContents.set(await navigator.clipboard.readText());
		setLyricDataFromClipboard($rawClipboardContents);
	}
	// numberOfColumns = Math.floor($lines.length /NUMBER_OF_LINES_PER_COLUMN + 0.99)

	function divideLine(line) {}

	const NUMBER_OF_LINES_PER_COLUMN = 12;

	let leftMostDisplayColumn = writable(0);
</script>

<div id="songInfoAndEditMode">
	<div
		id="songInformation"
		style="--title-ch-width: {max($title?.length || 0, 20)}ch;--author-ch-width: {max(
			$author?.length || 0,
			20,
		)}ch;"
	>
		<input
			type="text"
			placeholder="Song Title"
			id="songTitle"
			maxlength = {maxLength};
			bind:value={$title}
		/>
		<input
			type="text"
			placeholder="Artist"
			id="songArtist"
			maxlength = {maxLength};
			bind:value={$author}
		/>
	</div>
	<div id="edit-mode-toggle">
		<button class:edit-mode-selected={$editLines} on:click={() => editLines.set(true)}>Divide Lines</button>
		<button class:edit-mode-selected={!$editLines} on:click={() => editLines.set(false)}>Edit Text</button>
	</div>
</div>
<div id="lyric-region" style="--column-ch-width: {$column_ch_width}ch;">
	{#each { length: NUMBER_OF_LINES_PER_COLUMN } as _, i}
		{#if $leftMostDisplayColumn <= i && i <= $leftMostDisplayColumn + $numberOfColumns - 1 && $lines.length >= i * NUMBER_OF_LINES_PER_COLUMN}
			<!-- This is what should be contained in the scroll view? 
				This JS could potentially fix the horixontal scroll with mouse

				var item = document.getElementById("lyric-region");

				window.addEventListener("wheel", function (e) {
					if (e.deltaY > 0) item.scrollLeft += 100;
					else item.scrollLeft -= 100;
				});

				or mayve even this:
				(event) => event.currentTarget.scrollLeft += event.deltaY
			-->

			<div id="column-{i}" class="lyric-column"
				class:is-dividing-lines={$editLines}
				>
				<!-- class:hide={i < $leftMostDisplayColumn || $leftMostDisplayColumn + $numberOfColumns <= i} -->
				{#each $lines.slice(i * NUMBER_OF_LINES_PER_COLUMN, min((i + 1) * NUMBER_OF_LINES_PER_COLUMN), $lines.length) as line, j}
					<button
						class="line-border"
						on:click={() => {
							if($editLines) {
								$lines[i * NUMBER_OF_LINES_PER_COLUMN + j].divider =
								!$lines[i * NUMBER_OF_LINES_PER_COLUMN + j].divider
							}
						}}
						class:start={$lines[
							min(
								max(i * NUMBER_OF_LINES_PER_COLUMN + j + -1, 0),
								$lines.length - 1,
							)
						].divider ||
							(i == 0 && j == 0)}
						class:end={$lines[
							min(i * NUMBER_OF_LINES_PER_COLUMN + j + 0, $lines.length - 1)
						].divider ||
							i * NUMBER_OF_LINES_PER_COLUMN + j == $lines.length - 1}
					>
						<p
							class="lyric-text"
							style="font-size: 14px; font-family: {$fontFamily}; color: {$textColor}"
						>
							<textarea
								type="text"
								class="lyric-input"
								id="lyric-input-{i * NUMBER_OF_LINES_PER_COLUMN + j}"
								data-lyric-line-number={i * NUMBER_OF_LINES_PER_COLUMN + j}
								on:keydown={handleTextAreaEdit}
								readonly={$editLines}
								value={line.text}
								rows="1"
							/>
								<!-- disabled={$editLines} -->

							<!-- <textarea name="" id="" rows="1" class="lyric-input" value="{line.text}"/> -->
							<!-- {#each [...line.text.match(/\S+/g)] as word, i}
                        {word}
                        {#if i != [...line.text.match(/\S+/g)].length - 1}
                            <button class="vertical-separator"/>
                        {/if}
                    {/each} -->
						</p>
					</button>

					<!-- <div
						class="outer-divider"
						on:click|stopPropagation={() =>
							($lines[
								i * NUMBER_OF_LINES_PER_COLUMN + j
							].divider =
								!$lines[i * NUMBER_OF_LINES_PER_COLUMN + j]
									.divider)}
						class:selected={$lines[
							i * NUMBER_OF_LINES_PER_COLUMN + j
						].divider}
					>
						<button
							class="divider"
							on:click|stopPropagation={() =>
								($lines[
									i * NUMBER_OF_LINES_PER_COLUMN + j
								].divider =
									!$lines[i * NUMBER_OF_LINES_PER_COLUMN + j]
										.divider)}
							class:selected={$lines[
								i * NUMBER_OF_LINES_PER_COLUMN + j
							].divider}
						/>
					</div> -->
				{/each}
			</div>
		{/if}
	{/each}
</div>

<button on:click={readClipboard}>Paste from Clipboard</button>
<div id="column-nagivation">
	<button
		disabled={$leftMostDisplayColumn == 0}
		on:click={leftMostDisplayColumn.set(max(0, $leftMostDisplayColumn - 1))}
		>Left</button
	>
	<button
		disabled={$leftMostDisplayColumn + $numberOfColumns ==
			Math.floor($lines.length / NUMBER_OF_LINES_PER_COLUMN + 0.99)}
		on:click={leftMostDisplayColumn.set(
			min(
				Math.floor($lines.length / NUMBER_OF_LINES_PER_COLUMN + 0.99),
				$leftMostDisplayColumn + 1,
			),
		)}>Right</button
	>
	<button on:click={createNewSong}>Create New Song</button>
</div>

<style>
	button.line-border {
		all: unset;
		background-color: var(--background-color);
		/* padding: 0.5ch 2ch;
		margin: 0; */
		/* max-width: 100% !important; */
		text-wrap: nowrap;
		width: var(--column-ch-width);
	}
	button.line-border {
		/* button.line-border textarea { */
		background-color: var(--background-color);
		padding: 0.5ch 2ch;
		margin: 0;
		max-width: 100% !important;
		width: fit-content;
		text-wrap: nowrap;
	}

	button.line-border.start,
	.is-dividing-lines button.line-border:hover + button.line-border {
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
		margin-top: 0.25ch;
		padding-top: 0.25ch;
	}
	button.line-border.end,
	.is-dividing-lines button.line-border:hover {
		border-bottom-left-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
		margin-bottom: 0.25ch;
		padding-bottom: 0.25ch;
	}
	.is-dividing-lines button.line-border.end:hover,
	.is-dividing-lines button.line-border.end:hover + button.line-border.start {
		padding: 0.5ch 2ch !important;
		margin: 0 !important;
		border-radius: 0rem !important;
	}

	#lyric-region {
		display: flex;
		flex-direction: row;
		color: white;
		width: 100%;
		max-width: 72vw;
		height: 40rem;
		background-color: var(--dark1);
		justify-content: space-between;
		align-items: center;
		flex-wrap: nowrap;
		overflow-x: scroll;
		overflow-y: hidden;
		scroll-snap-type: x mandatory;
	}


	.lyric-column { /*This is where I am working. I need to contain this within a scroll view(?) which is n% of the entire screen. */
		align-items: center;
		display: flex;
		flex: 1;
		flex-direction: column;
		flex-wrap: nowrap;
		/* flex-basis: content; */
		/* flex: 0 0 auto; */
		align-items: center;
		/* max-width: 40ch;
		min-width: 20ch; */
		width: var(--column-ch-width);
		/* width: fit-content; */
		/* background-color: red; */
		/* margin: 0 auto; */
		/* margin: 0 2rem; */
		margin: 0;
		padding: 0 2rem;
		border-radius: 10px;
		scroll-snap-align: start
	}

	p {
		text-align: center;
	}

	.outer-divider {
		padding: 0;
		margin: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		opacity: 0.4;
	}
	.outer-divider:hover {
		opacity: 0.8;
	}

	.divider {
		margin: 0.3rem;
		background-color: red;
		border: none;
		height: 0.5rem;
		width: 70%;
		/* opacity: 0.4; */
		border-radius: 4px;
	}

	/* .divider:hover {
		opacity: 0.8;
	} */

	.divider.selected,
	.outer-divider.selected {
		opacity: 1;
	}

	.vertical-separator {
		opacity: 0.05;
		background-color: blue;
		margin: 0;
		padding: 0;
		border: none;
		width: 0.25rem;
		height: 1rem;
	}

	.vertical-separator:hover {
		opacity: 0.8;
	}

	.hide {
		display: none;
	}

	.lyric-text {
		width: var(--column-ch-width);
		/* width: 100%; */
		margin: 0;
		padding: 1ch 0;
		/* padding: 0; */
	}

	textarea.lyric-input {
		all: unset;
		/* height: fit-content; */
		/* padding: 0;
		margin: 0; */
		/* width: 40ch; */
		width: 100%;
		overflow: hidden;
		/* text-overflow: ellipsis; */
	}

	#column-nagivation {
		display: flex;
		flex-direction: row;
	}
	#songInfoAndEditMode {
		display: flex;
		flex-direction: row;
		
	}

	#songInformation {
		align-items: center;
		display: flex;
		gap: 5px;
		flex-direction: column;
		margin: 0 10% 0 30%;
	}

	#songTitle {
		text-align: center;
		border: 3px solid var(--dark1);
		background-color: var(--dark0);
		color: var(--white);
		border-radius: 10px;
		font-size: xx-large;
		width: var(--title-ch-width);
		padding: 0.25rem 0;
	}
	#songTitle:focus {
		border-color: var(--primary);
		outline-width: 0;
	}

	#songArtist {
		text-align: center;
		border: 3px solid var(--dark1);
		background-color: var(--dark0);
		color: var(--white);
		border-radius: 8px;
		font-size: large;
		padding: 0.25rem 0;
		width: var(--author-ch-width);
	}
	#songArtist:focus {
		border-color: var(--primary);
		outline-width: 0;
	}

	::placeholder {
		color: grey;
	}
	#edit-mode-toggle {
		padding: 0.75rem;
		border-radius: 8px;
	}
	#edit-mode-toggle > button {
		all: unset;
		font-family: var(--font-family);
		background: var(--black);
		padding: 0.75rem;
		margin: 0.25rem;
		border: 2px solid var(--dark1);
		border-radius: 8px;
	}
	#edit-mode-toggle > button.edit-mode-selected {
		border: 2px solid var(--primary);
	}
	/* .lyric-column p.lyric-text:not(.is-dividing-lines p.lyric-text), */
	/* .lyric-column textarea.lyric-input:not(.is-dividing-lines textarea.lyric-input) */
	.is-dividing-lines p.lyric-text,
	.is-dividing-lines textarea.lyric-input
	{
		cursor: pointer;
	}
	::-webkit-scrollbar {
		width:17px;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--white);
		border-radius: 25px;
		border: 6px solid transparent;
		background-clip: content-box;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: #cdcccc;
	}
</style>
