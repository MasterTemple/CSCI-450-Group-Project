<script>
	import { writable } from "svelte/store";
	import EditorSettings from "./EditorSettings.svelte";
	import PresentationSettings from "./PresentationSettings.svelte";

	let isEditorSettings = writable(true);
</script>

<div id="settings-list">
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
</div>

<style>
	#settings-list {
		font-family: var(--font-family);
		/* justify-content: center; */
		height: 100%;
		width: 100%;
	}

	#settings-section-select {
		display: flex;
	}

	button {
		flex: 1;
		width: 50%;
		color: var(--white);
		height: 3rem;
		font-size: medium;
		background-color: var(--dark1);
		border: 2px solid var(--dark5);
		border-radius: calc(2 * var(--border-radius));
		margin: 4px;
	}

	button.selected {
		border-color: var(--secondary);
	}

	button:hover {
		border-color: var(--primary);
		background-color: var(--black);
	}

	#settings-content {
		position: absolute;
		left: 0;
		top: 100;
	}
</style>
