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
		numberOfColumns,
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
		<label
			>Font Size<input
				name="editor-settings"
				type="number"
				min="12"
				max="36"
				id="fontSize"
				bind:value={$fontSize}
			/>
			<p class="info-hint">* This only affects your presentation</p>
		</label>
	</div>
	<div class="editor-settings-items">
		<!-- <label>hello</label> -->
		<label
			>Text Color<input
				name="editor-settings"
				type="color"
				id="textColor"
				bind:value={$textColor}
			/></label
		>
	</div>

	<div class="editor-settings-items">
		<label
			>Background Color<input
				name="editor-settings"
				type="color"
				id="backgroundColor"
				bind:value={$backgroundColor}
			/></label
		>
	</div>

	<div class="editor-settings-items">
		<label for="Font Family">Font</label>
		<select name="editor-settings" id="fontFamily" bind:value={$fontFamily}>
			<option value="arial" selected>Arial</option>
			<option value="timeNewRoman">Times New Roman</option>
			<option value="helvetica">Helvetica</option>
		</select>
	</div>

	<div class="editor-settings-items">
		<label
			>Include Title Slide<input
				name="editor-settings"
				type="checkbox"
				id="titleSlide"
				bind:value={$includeTitleSlide}
			/></label
		>
	</div>

	<button on:click={applySettingsToAll}>Apply to All</button>
	<p class="info-hint">
		* Changes are automatically applied to the current slide
	</p>
</div>

<style>
	#editor-settings-style {
		display: flex;
		flex-direction: column;
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
	}

	.editor-settings-items {
		padding-bottom: 0.25rem;
		padding-top: 0.25rem;
		margin-left: 30px;
		font-size: 20px;
	}
	.info-hint {
		font-size: 12px;
		padding: 0;
		padding-top: 0.25rem;
		margin: 0;
	}
</style>
