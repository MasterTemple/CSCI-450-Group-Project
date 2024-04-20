<script>
	import { writable } from "svelte/store";
	import {
		backgroundColor,
		breakIndexes,
		color,
		currentSong,
		dividerList,
		fontFamily,
		fontSize,
		lines,
		lyricsBySlide,
		numberOfColumns,
		rawClipboardContents,
		textColor,
	} from "./stores.js";
    import { removeAtIndex } from "./functions.js";
    import { onMount } from "svelte";

	let divideEveryNLinesCount = 4;
	let divideAtMatchWord = "";
	let removeMatchText = "";
	const action = writable("");

	function applySettings() {
		if ($action == "divideEveryCheck") {
			if (
				divideEveryNLinesCount > $lines.length ||
				divideEveryNLinesCount < 1
			) {
				// TODO: Implement error message
				return;
			}

			var counter = 0;
			$lyricsBySlide = [[]];

			for (var i = 0; i < $lines.length; i++) {
				if (
					(i + 1) % divideEveryNLinesCount == 0 &&
					i + 1 >= divideEveryNLinesCount
				) {
					counter++;
					$lines[i].divider = true;
					$lyricsBySlide[counter] = [];
				}
				$lyricsBySlide[counter].push($lines[i].text);
			}
		} else if ($action == "divideAtMatchCheck") {
			counter = 0;
			if (divideAtMatchWord == "") {
				return; //TODO: Implement error
			}
			let matchText = new RegExp(divideAtMatchWord, "gim");
			for (let i = 0; i < $lines.length; i++) {
				if (
					$lines[i].text.match(matchText)
				) {
					counter++;
					$lines[i].divider = true;
					$lyricsBySlide[counter] = [];
				}
				$lyricsBySlide[counter].push($lines[i].text);
			}
		} else if ($action == "removeDividers") {
			lines.update((linesCopy) => {
				return linesCopy.map(({ text }) => {
					return { text, divider: false };
				});
			});
		} else if ($action == "removeMatch") {
			let matchText = new RegExp(removeMatchText, "gim");
			for (let i = 0; i < $lines.length; i++) {
				$lines[i].text = $lines[i].text.replace(matchText, "");
				// line becomes empty
				if($lines[i].text == "") {
					lines.set(removeAtIndex($lines, i))
				}
			}
		}
		action.set("")
		divideAtMatchWord = ""
		removeMatchText = ""
	}
	onMount(() => {
		[...document.querySelectorAll("input")].forEach((input) => {
			input.addEventListener("keydown", (event) => {
				if(event.key == "Enter") {
					applySettings()
				} else {
					// refocus element if user starts typing
					event.target.click();
				}
			})
		})
	})
</script>

<!-- <h2>Actions</h2> -->

<div id="actions-container">
	<!-- Divide every n lines -->
	<button
		class="row"
		on:click={() => action.set("divideEveryCheck")}
		class:selected={$action == "divideEveryCheck"}
	>
		<label
			>Divide every <input
				type="number"
				id="divideEveryLines"
				name="divideEveryLines"
				placeholder="n"
				bind:value={divideEveryNLinesCount}
			/> lines</label
		>
	</button>
	<!-- Divide at match -->
	<button
		class="row"
		on:click={() => action.set("divideAtMatchCheck")}
		class:selected={$action == "divideAtMatchCheck"}
	>
		<label
			>Divide at match:
			<input
				type="text"
				id="divideAtMatch"
				name="divideAtMatch"
				placeholder="Enter pattern"
				bind:value={divideAtMatchWord}
			/>
		</label>

		<!-- </div> -->
	</button>
	<!-- Remove All Dividers -->
	<button
		class="row"
		on:click={() => action.set("removeDividers")}
		class:selected={$action == "removeDividers"}
	>
		Remove All Dividers
	</button>
	<!-- Remove matches -->
	<button
		class="row"
		on:click={() => action.set("removeMatch")}
		class:selected={$action == "removeMatch"}
	>
		<label
			>Remove matches: <input
				type="text"
				id="removeMatchText"
				name="removeMatchText"
				placeholder="Enter pattern"
				bind:value={removeMatchText}
			/></label
		>
	</button>

	<button id="apply-changes-button" on:click={applySettings}>Apply Changes</button
	>
</div>

<style>

	#divideEveryLines {
		width: 2ch;
		text-align: center;
	}

	/* #divideAtMatch { */
	/* 	position: relative; */
	/* 	width: 50%; */
	/* 	left: 25%; */
	/* } */

	/* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	#actions-container {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	* {
		font-size: large;
	}

	#actions-container > button {
		color: var(--white);
	}

	#actions-container > button.row {
		width: 90%;
		/* max-width: 12vw; */
		margin: 0.5vw;
		padding: 0.5vw;
		/* padding: 0.5rem; */
		background-color: var(--black);
		border: 2px solid var(--dark2);
		border-radius: calc(2 * var(--border-radius));
		justify-content: center;
	}

	#actions-container > button.selected {
		border-color: var(--primary);
	}

	/* #actions-container > div input[type="number"] , */
	#actions-container > * input[type="text"] {
		all: unset;
		color: var(--white);
		background-color: var(--dark0);
		border-radius: calc(2 * var(--border-radius));
		border: 2px solid var(--dark2);
		margin: 0.5rem;
		padding: 0.5rem;
		margin-left: 0;
		max-width: 10vw;
	}

	#divideEveryLines {
		width: 2ch;
		color: var(--white);
		background-color: var(--dark0);
		border-radius: calc(var(--border-radius));
		border: 2px solid var(--dark2);
		margin: 0.25rem;
		padding: 0.25rem;
	}

	#apply-changes-button {
		border: none;
		border-radius: 10px;
		height: 3vh;
		width: 18ch;
		color: var(--white);
		background-color: var(--dark1);
		border: 2px solid var(--dark5);
		border-radius: calc(2 * var(--border-radius));
		margin: 1rem;
		padding: 1rem;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	#apply-changes-button:hover {
		border-color: var(--primary);
		background-color: var(--black);
	}

	#apply-changes-button:active {
		background-color: var(--primary);
	}

</style>
