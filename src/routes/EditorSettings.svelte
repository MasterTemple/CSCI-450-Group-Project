<script>
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

	let divideEveryNLinesCount = 4;
	let divideAtMatchWord = "";
	let removeMatchText = "";
	let selectedAction;

	function applySettings(event) {
		// const selectedAction = event.document;
		console.log({ selectedAction });

		if (selectedAction == "divideEveryCheck") {
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
				} else {
					$lines[i].divider = false;
				}
				$lyricsBySlide[counter].push($lines[i].text);
			}
		} else if (selectedAction == "autodetectCheck") {
			var counter = 0;
			$lyricsBySlide = [[]];
			for (i = 0; i < $lines.length; i++) {
				if ($lines[i].divider) {
					counter++;
					$lyricsBySlide[counter] = [];
				} else {
					$lyricsBySlide[counter].push($lines[i].text);
				}
			}
		} else if (selectedAction == "divideAtMatchCheck") {
			counter = 0;
			if (divideAtMatchWord == "") {
				return; //TODO: Implement error
			}
			for (let i = 0; i < $lines.length; i++) {
				if (
					$lines[i].text.toLowerCase().includes(divideAtMatchWord.toLowerCase())
				) {
					counter++;
					$lines[i].divider = true;
					$lyricsBySlide[counter] = [];
				} else {
					$lines[i].divider = false;
				}
				$lyricsBySlide[counter].push($lines[i].text);
			}
		} else if (selectedAction == "removeDividers") {
			lines.update((linesCopy) => {
				return linesCopy.map(({ text }) => {
					return { text, divider: false };
				});
			});
		} else if (selectedAction == "removeMatch") {
			removeMatchText;
			let matchText = removeMatchText;
			if (removeMatchText.match(/^\/.*\/$/)) {
				matchText = new RegExp(removeMatchText.match(/^\/(.*)\/$/)[1]);
			}
			for (let i = 0; i < $lines.length; i++) {
				$lines[i].text = $lines[i].text.replace(matchText, "");
				// if (
				// 	$lines[i].text.toLowerCase().includes(divideAtMatchWord.toLowerCase())
				// ) {
				// 	counter++;
				// 	$lines[i].divider = true;
				// 	$lyricsBySlide[counter] = [];
				// } else {
				// 	$lines[i].divider = false;
				// }
				// $lyricsBySlide[counter].push($lines[i].text);
			}
		}
	}
</script>

	<!-- <h2>Actions</h2> -->

<div id="actions-container">
	<!-- Divide every n lines -->
	<div class="row">
		<input
			bind:group={selectedAction}
			name="presentation-settings"
			type="radio"
			id="divideEveryCheck"
			value="divideEveryCheck"
		/><label
			>Divide every <input
				type="number"
				id="divideEveryLines"
				name="divideEveryLines"
				placeholder="n"
				bind:value={divideEveryNLinesCount}
			/> lines</label
		>
	</div>
	<!-- Autodetect from spacing -->
	<!-- <div class="row"> -->
	<!-- 	<label -->
	<!-- 		><input -->
	<!-- 			bind:group={selectedAction} -->
	<!-- 			name="presentation-settings" -->
	<!-- 			type="radio" -->
	<!-- 			id="autodetectCheck" -->
	<!-- 			value="autodetectCheck" -->
	<!-- 		/>Autodetect from spacing</label -->
	<!-- 	> -->
	<!-- </div> -->
	<!-- Divide at match -->
	<div class="row">
		<input
			bind:group={selectedAction}
			name="presentation-settings"
			type="radio"
			id="divideAtMatchCheck"
			value="divideAtMatchCheck"
		/>
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
	</div>
	<!-- Remove All Dividers -->
	<div class="row">
		<label
			><input
				bind:group={selectedAction}
				name="presentation-settings"
				type="radio"
				id="removeDividers"
				value="removeDividers"
			/>Remove All Dividers</label
		>
	</div>
	<!-- Remove matches -->
	<div class="row">
		<input
			bind:group={selectedAction}
			name="presentation-settings"
			type="radio"
			id="removeMatch"
			value="removeMatch"
		/>
		<label
			>Remove matches: <input
				type="text"
				id="removeMatchText"
				name="removeMatchText"
				placeholder="Enter pattern"
				bind:value={removeMatchText}
			/></label
		>
	</div>

	<button id="applyChangesButton" on:click={applySettings}>Apply Changes</button
	>
</div>

<style>
	#applyChangesButton:hover {
		border-color: var(--primary);
		background-color: var(--black);
	}

	#applyChangesButton {
		margin-top: 1rem;
		border: none;
		border-radius: 10px;
		height: 3vh;
		width: 16ch;
		color: var(--white);
		background-color: var(--dark1);
		border: 2px solid var(--dark5);
		border-radius: calc(2 * var(--border-radius));
	}

	#applyChangesButton:active {
		background-color: var(--primary);
	}

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
		align-items: left;
	}

	#actions-container > div {
		max-width: 12vw;
		margin: 0.5vw;
		padding: 0.5vw;
		/* padding: 0.5rem; */
		background-color: var(--black);
		border: 2px solid var(--dark2);
		border-radius: calc(2 * var(--border-radius));
	}

	/* #actions-container > div input[type="number"] , */
	#actions-container > div input[type="text"] {
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

	/* #actions-container > div:focus-within { */
	/* 	border-color: var(--primary); */
	/* } */

	input[type="text"]:checked + div {
		border-color: var(--secondary);
	}

	input[name="presentation-settings"] {
		margin-right: 1rem;
	}
</style>
