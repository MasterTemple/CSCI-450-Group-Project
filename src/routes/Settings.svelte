<script>
	import EditorSettings from "./EditorSettings.svelte";
	import PresentationSettings from "./PresentationSettings.svelte";
	import {
		color,
		settingsIsOpen,
		settingsSelection,
		settingsToggleOption,
	} from "./stores";

	let icons = ["<", ">"];

	let selectedColor = color.darkPurple;
	let nonSelectedColor = color.lightPurple;

	let editorColor = selectedColor;
	let presentationColor = nonSelectedColor;

	function toggleDrawer() {
		settingsIsOpen.set(!$settingsIsOpen);
	}

	function editorToggled() {
		settingsSelection.set(settingsToggleOption.editor);
		editorColor = selectedColor;
		presentationColor = nonSelectedColor;
	}

	function presentationToggled() {
		settingsSelection.set(settingsToggleOption.presentation);
		editorColor = nonSelectedColor;
		presentationColor = selectedColor;
	}
</script>

<div id="drawerDiv">
	<button
		id="drawerButton"
		style="--color: {color.brown}"
		on:click={toggleDrawer}>{icons[$settingsIsOpen ? 1 : 0]}</button
	>
</div>

<div id="editorOrPresentationToggle">
	<button
		id="editorToggle"
		on:click={editorToggled}
		style="--color: {editorColor}">Editor</button
	>
	<button
		id="presentationToggle"
		on:click={presentationToggled}
		style="--color: {presentationColor}">Presentation</button
	>
</div>

<div
	id="editorSettings"
	style="--visibility: {$settingsSelection == settingsToggleOption.editor
		? 'visible'
		: 'hidden'}"
>
	<EditorSettings />
</div>

<div
	id="presentationSettingsDiv"
	style="--visibility: {$settingsSelection ==
	settingsToggleOption.presentation
		? 'visible'
		: 'hidden'}"
>
	<PresentationSettings />
</div>

<style>
	* {
		font-family: var(--font-family);
	}
	#drawerDiv {
		position: absolute;
		bottom: 50%;
		left: -25px;
	}

	#drawerButton {
		background-color: var(--dark0);
		color: var(--white);
		border: none;
		text-align: center;
		font-size: large;
		width: 2rem;
		height: 8rem;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		box-shadow: 2px 1px 15px var(--black);
	}

	#editorOrPresentationToggle {
		display: flex;
	}

	#editorToggle {
		flex: 1;
		width: 50%;
		position: relative;
		background-color: var(--color);
		border: none;
		height: 50px;
		border-top-left-radius: 19px;
	}

	#presentationToggle {
		flex: 1;
		position: relative;
		width: 50%;
		background-color: var(--color);
		border: none;
		height: 50px;
	}

	#editorSettings {
		visibility: var(--visibility);
		position: absolute;
		left: 0;
		top: 100;
	}

	#presentationSettingsDiv {
		visibility: var(--visibility);
		position: absolute;
		left: 0;
		top: 100;
	}
</style>
