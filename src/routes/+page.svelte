<script>
	import AudienceView from "./AudienceView/+page.svelte";
	import LyricEditor from "./LyricEditor.svelte";
	import NavBar from "./NavBar.svelte";
	import PresenterView from "./PresenterView/+page.svelte";
	import Saved from "./Saved.svelte";
	import Settings from "./Settings.svelte";
	import {
		color,
		displayPresenterView,
		displaySingleAudienceView,
		savedSongsIsOpen,
		settingsIsOpen,
	} from "./stores";
</script>

{#if $displaySingleAudienceView}
	<AudienceView />
{:else if $displayPresenterView}
	<PresenterView />
{:else}
	<div id="everything">
		<nav id="navbar">
			<NavBar />
		</nav>
		<div id="content">
			<div
				id="saved"
				style="--loc: {$savedSongsIsOpen
					? 0
					: -14.5}vw; --color: {color.brown}"
			>
				<Saved />
			</div>
			<div id="editor">
				<LyricEditor />
			</div>
			<div
				id="settings"
				style="--loc: {$settingsIsOpen
					? 0
					: -14.5}vw; --color: {color.brown}"
			>
				<Settings />
			</div>
		</div>
	</div>
{/if}

<style>
	#everything {
		max-width: 100wh;
		max-height: 100vh;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	/* :root {
    display: flex;
    flex-direction: row;
} */

	#navbar {
		/* position: fixed; */
		width: 100vw;
		height: 12vh;
		position: relative;
		display: flex;
		/* background-color: pink;      <-- Uncomment to see outline */
	}

	#content {
		display: flex;
		flex-direction: row;
		height: 88vh;
		width: 100vw;
		/* background-color: orange; <-- Uncomment to see outline */
	}

	#saved {
		height: 100%;
		width: 20vw;
		background-color: var(--color);
		position: relative;
		left: var(--loc);
		transition: left 1s;
		border-top-right-radius: 20px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#editor {
		/* background-color: red;       <-- Uncomment to see outline */
		height: 100%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	#settings {
		background-color: var(--color);
		height: 100%;
		width: 20vw;
		position: relative;
		right: var(--loc);
		transition: right 1s;
		border-top-left-radius: 20px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
</style>
