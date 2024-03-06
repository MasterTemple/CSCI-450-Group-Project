<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { EXAMPLE_CONTENTS_2 } from "./constants.js";
	import {
		convertLyricLinesToSlides,
		insertAtIndex,
		removeAtIndex,
		splitLine,
	} from "./functions.js";
	import {
		breakIndexes,
		color,
		currentSong,
		dividerList,
		lines,
		lyricsBySlide,
		numberOfColumns,
		rawClipboardContents,
	} from "./stores.js";

	let workIsUnsaved = false;

	onMount(() => {
		// load value if exists
		const savedCurrentSong = JSON.parse(
			localStorage.getItem("currentSong"),
		);

		if (savedCurrentSong) {
			console.log({ savedCurrentSong });
			rawClipboardContents.set(savedCurrentSong["rawClipboardContents"]);
			lines.set(savedCurrentSong["lines"]);
			lyricsBySlide.set(savedCurrentSong["lyricsBySlide"]);
			breakIndexes.set(savedCurrentSong["breakIndexes"]);
			dividerList.set(savedCurrentSong["dividerList"]);
		} else {
			rawClipboardContents.set(EXAMPLE_CONTENTS_2);
			setLyricDataFromClipboard($rawClipboardContents);
		}

		// keep track if work needs to be saved
		currentSong.subscribe((v) => (workIsUnsaved = true));

		// save work if edited every n seconds
		const N = 1;
		setInterval(() => {
			if (workIsUnsaved) {
				console.log("Saving work");
				console.log({ $currentSong });
				localStorage.setItem(
					"currentSong",
					JSON.stringify($currentSong),
				);
				workIsUnsaved = false;
			}
		}, N * 1000);

		// YOU MUST WAIT UNTIL IT IS SET
		lines.subscribe((value) => {
			lyricsBySlide.set(convertLyricLinesToSlides(value));
			setTimeout(() => console.log($lyricsBySlide), 100);
		});
	});

	async function checkForEnter(input) {
		// console.log({ input });
		// get index of lyric/textarea
		const index = parseInt(input.target.dataset["lyricLineNumber"]);
		// get cursor location
		const cursor = document.getElementById(
			`lyric-input-${index}`,
		).selectionStart;
		// sleep 100ms so I can read the target value after it is set
		await new Promise((resolve) => setTimeout(resolve, 100));
		// create a copy of lines to edit
		let allLines = $lines;
		let focusIndex = index;
		let focusCursor = cursor;

		// console.log(input.key == "Delete", cursor == input.target.value.length);
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
		else if (input.key == "Delete" && cursor == input.target.value.length) {
			// update current line to have next line contents
			allLines[index] = {
				text: allLines[index].text + " " + allLines[index + 1].text,
				divider: allLines[index].divider || allLines[index + 1].divider,
			};
			// remove next line
			allLines = removeAtIndex(allLines, index + 1);
			// set focus location
			focusIndex = index;
			focusCursor = cursor + 1;
		}
		// join current line to the previous line
		else if (input.key == "Backspace" && cursor == 0) {
			// set focus location
			focusIndex = index - 1;
			focusCursor = allLines[index - 1].text.length + 1;
			// update previous line to have current line contents
			allLines[index - 1] = {
				text: allLines[index - 1].text + " " + allLines[index].text,
				divider: allLines[index - 1].divider || allLines[index].divider,
			};
			// remove current line
			allLines = removeAtIndex(allLines, index);
		}
		// ignore all other input
		else {
			lines.set(allLines);
			return;
		}
		// set lines
		lines.set(allLines);
		// after lines have been updated, focus and return cursor position
		setTimeout(() => {
			let el = document.getElementById(`lyric-input-${focusIndex}`);
			el.focus();
			el.setSelectionRange(focusCursor, focusCursor);
		}, 100);
	}

	/**
	 * @param {String} str - Check if a line should be split in half
	 */
	function setLyricDataFromClipboard(contents) {
		// rawClipboardContents.set(EXAMPLE_CONTENTS_2)
		// console.log(contents)

		// split at single newlines
		let lyricLines = contents
			.trim()
			.split(/\n/)
			// remove leading and trailing whitespace
			.map((line) => line.trim())
			// split lines in half as necessary
			.map(splitLine)
			.flat();

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
	function max(a, b) {
		return a < b ? b : a;
	}
	function min(a, b) {
		return a > b ? b : a;
	}
	let leftMostDisplayColumn = writable(0);
</script>

<div id="songInformation">
	<input
		type="text"
		placeholder="Song Title"
		id="songTitle"
		style="--color: {color.darkBlue}"
	/>
	<input
		type="text"
		placeholder="Artist"
		id="songArtist"
		style="--color: {color.darkBlue}"
	/>
</div>
<div id="lyric-region" style="--color: {color.darkBlue}">
	{#each { length: NUMBER_OF_LINES_PER_COLUMN } as _, i}
		<div
			id="column-{i}"
			class="lyric-column"
			class:hide={i < $leftMostDisplayColumn ||
				$leftMostDisplayColumn + $numberOfColumns <= i}
		>
			{#each $lines.slice(i * NUMBER_OF_LINES_PER_COLUMN, min((i + 1) * NUMBER_OF_LINES_PER_COLUMN), $lines.length) as line, j}
				<p class="lyric-text">
					<!-- {line} -->
					<textarea
						type="text"
						class="lyric-input"
						id="lyric-input-{i * NUMBER_OF_LINES_PER_COLUMN + j}"
						data-lyric-line-number={i * NUMBER_OF_LINES_PER_COLUMN +
							j}
						on:keydown={checkForEnter}
						value={line.text}
						rows="1"
					/>
					<!-- <textarea name="" id="" rows="1" class="lyric-input" value="{line.text}"/> -->
					<!-- {#each [...line.text.match(/\S+/g)] as word, i}
                        {word}
                        {#if i != [...line.text.match(/\S+/g)].length - 1}
                            <button class="vertical-separator"/>
                        {/if}
                    {/each} -->
				</p>
				<button
					class="divider"
					on:click={() =>
						($lines[i * NUMBER_OF_LINES_PER_COLUMN + j].divider =
							!$lines[i * NUMBER_OF_LINES_PER_COLUMN + j]
								.divider)}
					class:selected={$lines[i * NUMBER_OF_LINES_PER_COLUMN + j]
						.divider}
				/>
			{/each}
		</div>
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
</div>

<style>
	#lyric-region {
		display: flex;
		flex-direction: row;
		color: white;
		width: 60rem;
		height: 40rem;
		background-color: black;
		justify-content: center;
		align-items: center;
		flex-wrap: nowrap;
		overflow-x: auto;
	}

	.lyric-column {
		align-items: center;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		/* flex: 0 0 auto; */
		align-items: center;
		width: 14vw;
		background-color: var(--color);
		margin: 0 auto;
		border-radius: 10px;
	}

	p {
		text-align: center;
	}

	.divider {
		background-color: red;
		border: none;
		height: 0.5rem;
		width: 70%;
		opacity: 0.4;
		border-radius: 4px;
	}

	.divider:hover {
		opacity: 0.8;
	}

	.divider.selected {
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
		margin: 0;
		padding: 0;
	}

	.lyric-input {
		all: unset;
		height: fit-content;
	}

	#column-nagivation {
		display: flex;
		flex-direction: row;
	}

	#songInformation {
		align-items: center;
		display: flex;
		gap: 10px;
		flex-direction: column;
	}

	#songTitle {
		text-align: center;
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		font-size: larger;
	}

	#songArtist {
		text-align: center;
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		font-size: small;
	}

	::placeholder {
		color: white;
	}
</style>
