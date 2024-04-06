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

<div id="saved-song-list">
	<div id="drawerDiv">
		<button
			id="drawerButton"
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
					songAuthor={song["author"] ||
						UNKNOWN_SONG_AUTHOR_PLACEHOLDER}
					firstSlideLyrics={song["slides"][0]}
					dateCreated={new Date(parseInt(song["songId"]))}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	#saved-song-list {
		display:flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
		border-radius: var(--border-radius);
		overflow: hidden;
		height: 100%;
		width: 100%;
	}
	
	#drawerDiv {
		position: absolute;
		bottom: 50%;
		left: 100%;
	}

	#drawerButton {
		background-color: var(--dark0);
		color: var(--white);
		border: none;
		text-align: center;
		font-size: large;
		width: 2rem;
		height: 8rem;
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		box-shadow: 2px 1px 15px var(--black);
		visibility: visible;
		/* box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19); */
	}

	#searchBar {
		border-radius: 8px;
		width: 90%;
		border: 3px solid var(--dark1);
		margin: 0.35rem;
		position: relative;
		padding: 0.25rem;
		font-size: 1rem;
		background: var(--black);
		color: var(--white);
	}
	#searchBar:focus {
		border-color: var(--primary);
		outline-width: 0;
	}

	#songs {
		height: 100%;		
		/* align-content: center; */
		overflow-x: hidden;
		overflow-y: scroll;
		display: flex;
		align-items: center;
		flex-direction: column;
		/* gap: 10px; */
		scrollbar-track-color: red !important;
	}
	::-webkit-scrollbar {
		width:17px;
	}
	::-webkit-scrollbar-track {
		background-color: transparent;
	}
	::-webkit-scrollbar-thumb {
		background-color: var(--white);
		border-radius: 25px;
		border: 6px solid transparent;
		background-clip: content-box;
	}
	::-webkit-scrollbar-thumb:hover {
		background-color: #cdcccc;
	}
</style>
