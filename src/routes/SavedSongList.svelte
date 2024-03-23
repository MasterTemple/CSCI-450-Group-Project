<script>
	import { writable } from "svelte/store";
	import SavedSong from "./SavedSong.svelte";
	import { allSongs, color, savedSongsIsOpen } from "./stores";

	let icons = [">", "<"];
	const UNKNOWN_SONG_AUTHOR_PLACEHOLDER = "Unknown";
	var icon = 1;
	function toggleDrawer() {
		console.log("Toggle Drawer:" + $savedSongsIsOpen);
		savedSongsIsOpen.set(!$savedSongsIsOpen);
	}
	const searchValue = writable("");
	function isSearchMatch(query, song) {
		const title = song["title"].toLowerCase();
		const author = (
			song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER
		).toLowerCase();
		const terms = query.split(/ +/);
		if (terms.length == 0) return true;
		return terms.every(
			(term) => title.includes(term) || author.includes(term),
		);
	}
</script>

<div id="drawerDiv">
	<button
		id="drawerButton"
		style="--color: {color.brown}"
		on:click={toggleDrawer}>{icons[$savedSongsIsOpen ? 1 : 0]}</button
	>
</div>

<input
	type="text"
	placeholder="Search.."
	id="searchBar"
	bind:value={$searchValue}
/>
<div id="songs">
	{#each $allSongs as song}
		{#if isSearchMatch($searchValue, song)}
			<SavedSong
				songTitle={song["title"]}
				songId={song["songId"]}
				songAuthor={song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER}
				dateCreated={new Date(parseInt(song["songId"]))}
			/>
		{/if}
	{/each}
</div>

<style>
	#drawerDiv {
		position: absolute;
		bottom: 50%;
		left: 100%;
	}

	#drawerButton {
		background-color: var(--color); /* Green */
		border: none;
		text-align: center;
		font-size: 16px;
		width: 25px;
		height: 75px;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#searchBar {
		border-radius: 10px;
		border: none;
		width: 150px;
		left: 20px;
		position: relative;
		top: 10px;
		margin-bottom: 1rem;
	}

	#songs {
		height: 720px;
		overflow-y: scroll;
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
