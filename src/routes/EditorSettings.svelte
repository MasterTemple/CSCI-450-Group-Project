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

<h2>Actions</h2>

<div id="actions-container">
	<!-- Divide every n lines -->
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
	<br />
	<!-- Autodetect from spacing -->
	<label
		><input
			bind:group={selectedAction}
			name="presentation-settings"
			type="radio"
			id="autodetectCheck"
			value="autodetectCheck"
		/>Autodetect from spacing</label
	>
	<br />
	<!-- Divide at match -->
	<input
		bind:group={selectedAction}
		name="presentation-settings"
		type="radio"
		id="divideAtMatchCheck"
		value="divideAtMatchCheck"
	/><label
		>Divide at match: <input
			type="text"
			id="divideAtMatch"
			name="divideAtMatch"
			placeholder="text"
			bind:value={divideAtMatchWord}
		/></label
	>
	<br />
	<!-- Remove All Dividers -->
	<label
		><input
			bind:group={selectedAction}
			name="presentation-settings"
			type="radio"
			id="removeDividers"
			value="removeDividers"
		/>Remove All Dividers</label
	>
	<br />
	<!-- Remove matches -->
	<input
		bind:group={selectedAction}
		name="presentation-settings"
		type="radio"
		id="removeMatch"
		value="removeMatch"
	/><label
		>Remove matches: <input
			type="text"
			id="removeMatchText"
			name="removeMatchText"
			placeholder="text"
			bind:value={removeMatchText}
		/></label
	>
</div>

<button id="applyChangesButton" on:click={applySettings}>Apply Changes</button>

<!-- <h2>Settings</h2> -->

<!-- <div class="editor-settings-items" id="settings-container"> -->
<!-- <label -->
<!-- 	>Columns <input -->
<!-- 		name="editor-settings" -->
<!-- 		type="number" -->
<!-- 		min="1" -->
<!-- 		max="6" -->
<!-- 		id="numberOfColumns" -->
<!-- 		bind:value={$numberOfColumns} -->
<!-- 	/></label -->
<!-- > -->
<!-- </div> -->

<style>
	#applyChangesButton:hover {
		background-color: #01ae35;
		color: white;
	}
	#applyChangesButton {
		margin-top: 20px;
		background-color: white;
		border: none;
		border-radius: 10px;
		height: 3vh;
		width: 95%;
		box-shadow: 0 5px #999;
	}

	#applyChangesButton:active {
		background-color: #01ae35;
		box-shadow: 0 3px #666;
		transform: translateY(4px);
	}

	#divideEveryLines {
		width: 15px;
		text-align: center;
	}

	#divideAtMatch {
		position: relative;
		width: 50%;
		left: 25%;
	}

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

	#settings-container {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	#actions-container {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
