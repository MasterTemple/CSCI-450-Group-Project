<script>
	// let textColor;
	// let backgroundColor;
	// let fontSize = 12;
	// let fontFamily = "Arial";
	// let titleSlide = false;
	// let numberOfColumns = 1;
	import {
		allSongs,
		backgroundColor,
		currentSong,
		fontFamily,
		fontSize,
		includeTitleSlide,
		textColor,
	} from "./stores";

	function applySettingsToAll() {
		allSongs.update((songs) => {
			songs.map((s) => {
				s.settings = $currentSong.settings;
				return s;
			});
			localStorage.setItem("allSongs", JSON.stringify(songs));
			return songs;
		});
	}
</script>

<div id="editor-settings-style">
	<div class="editor-settings-items">
		<div class="column">
			<div class="row">
				<p>Font Size</p>
				<input
					name="editor-settings"
					type="number"
					min="12"
					max="36"
					id="fontSize"
					bind:value={$fontSize}
				/>
			</div>
			<p class="info-hint">* This only affects your presentation</p>
		</div>
	</div>
	<div class="editor-settings-items">
		<!-- <label>hello</label> -->
		<div class="row">
			<p>Text Color</p>
			<input
				name="editor-settings"
				type="color"
				id="textColor"
				bind:value={$textColor}
			/>
		</div>
	</div>

	<div class="editor-settings-items">
		<div class="row">
			<p>Background Color</p>
			<input
				name="editor-settings"
				type="color"
				id="backgroundColor"
				bind:value={$backgroundColor}
			/>
		</div>
	</div>

	<div class="editor-settings-items">
		<label for="Font Family">Font</label>
		<select name="editor-settings" id="fontFamily" bind:value={$fontFamily}>
			<option value="Arial" selected>Arial</option>
			<option value="Times New Roman">Times New Roman</option>
			<option value="Helvetica">Helvetica</option>
		</select>
	</div>

	<div class="editor-settings-items">
		<div class="row">
			<p>Include Title Slide</p>
			<input
				name="editor-settings"
				type="checkbox"
				id="titleSlide"
				bind:checked={$includeTitleSlide}
			/>
		</div>
	</div>

	<button on:click={applySettingsToAll} id="apply-changes-button"
		>Apply to All</button
	>
	<p class="info-hint">
		* Changes are automatically applied to the current slide
	</p>
</div>

<style>
	#editor-settings-style {
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
		justify-content: center;
		align-items: center;
		/* max-height: 70vh; */
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		overflow: hidden;
	}
	#textColor {
		margin-right: 5px;
		float: right;
	}
	#backgroundColor {
		margin-right: 5px;
		float: right;
	}

	#fontSize {
		margin-right: 15px;
		float: right;
		width: 2ch;
		text-align: center;
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
		width: 2ch;
		color: var(--white);
		background-color: var(--dark0);
		border-radius: calc(var(--border-radius));
		border: 2px solid var(--dark2);
		margin: 0.25rem;
		padding: 0.25rem;
	}

	* {
		font-size: large;
	}

	.editor-settings-items {
		width: 90%;
		min-height: 2rem;
		margin: 0.5vw;
		padding: 0.5vw 0;

		background-color: var(--black);
		border: 2px solid var(--dark5);
		border-radius: calc(2 * var(--border-radius));
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	input {
		color: var(--white);
		width: 90%;
		background-color: var(--dark0);
		border: 2px solid var(--dark2);
		border-radius: calc(2 * var(--border-radius));
		justify-content: center;
	}

	input[type="color"] {
		all: unset;
		height: 2rem;
		width: 3rem;
		padding: 0;
		margin: 0;
		justify-content: center;
		align-items: center;
		padding: 0.25rem;
		margin-left: 0.5rem;
		background-color: var(--dark0);
		border: 2px solid var(--dark2);
		border-radius: calc(2 * var(--border-radius));
		justify-content: center;
	}

	.info-hint {
		font-size: 12px;
		padding: 0;
		margin: 0;
		margin-top: 0.5rem;
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


	.row {
		display: flex;
		flex-direction: row;
		width: 100%;
		align-items: center;
		justify-content: center;
		height: 1rem;
	}
	.column {
		display: flex;
		flex-direction: column;
	}
	input[type="checkbox"] {
		width: 2ch;
	}
</style>
