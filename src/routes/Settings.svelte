<script>
	import { writable } from "svelte/store";
	import EditorSettings from "./EditorSettings.svelte";
	import PresentationSettings from "./PresentationSettings.svelte";
	import {
		color,
		settingsIsOpen,
		settingsSelection,
		settingsToggleOption,
	} from "./stores";

	let icons = ["<", ">"];

	function toggleDrawer() {
		settingsIsOpen.set(!$settingsIsOpen);
	}

	let isEditorSettings = writable(true);
	function settingsToggle() {
		isEditorSettings.set(!$isEditorSettings);
	}
</script>

<div id="drawerDiv">
	<button id="drawerButton" on:click={toggleDrawer}
		>{icons[$settingsIsOpen ? 1 : 0]}</button
	>
</div>

<div id="settings-section-select">
	<button
		id="editorToggle"
		on:click={() => isEditorSettings.set(true)}
		class:selected={$isEditorSettings}>Editor</button
	>
	<button
		id="presentationToggle"
		on:click={() => isEditorSettings.set(false)}
		class:selected={!$isEditorSettings}>Presentation</button
	>
</div>

<div id="settings-content">
	{#if $isEditorSettings}
		<EditorSettings />
	{:else}
		<PresentationSettings />
	{/if}
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

	#settings-section-select {
		display: flex;
	}

	#settings-section-select > button {
		background-color: var(--dark2);
		flex: 1;
		width: 50%;
		position: relative;
		color: var(--white);
		border: none;
		height: 3rem;
		font-size: medium;
		border-top-left-radius: calc(2 * var(--border-radius));
		border-top-right-radius: calc(2 * var(--border-radius));
	}
	#settings-section-select > button.selected {
		background-color: black;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;

	}

	#settings-content {
		position: absolute;
		left: 0;
		top: 100;
	}
</style>
