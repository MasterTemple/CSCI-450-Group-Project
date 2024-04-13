<script>
	import { writable } from "svelte/store";
	import SavedSong from "./SavedSong.svelte";
	import { allSongs, color, savedSongsIsOpen } from "./stores";

	let icons = [">", "<"];
	const UNKNOWN_SONG_AUTHOR_PLACEHOLDER = "Unknown";
	var icon = 1;
	const searchValue = writable("");
	function isSearchMatch(query, song) {
		query = query.toLowerCase();
		const title = song["title"].toLowerCase();
		const author = (
			song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER
		).toLowerCase();
		const terms = query.split(/ +/);
		if (terms.length == 0) return true;
		return terms.every((term) => title.includes(term) || author.includes(term));
	}
</script>

<div id="saved-song-list">
	<input
		type="text"
		placeholder="Search.."
		id="search-bar"
		bind:value={$searchValue}
	/>
	<div id="songs">
		{#each $allSongs as song}
			{#if isSearchMatch($searchValue, song)}
				<SavedSong
					songTitle={song["title"]}
					songId={song["songId"]}
					songAuthor={song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER}
					firstSlideLyrics={song["slides"][0]}
					dateCreated={new Date(parseInt(song["songId"]))}
				/>
			{/if}
		{/each}
	</div>
</div>

<style>
	#saved-song-list {
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
		border-radius: var(--border-radius);
		overflow: hidden;
		height: 100%;
		width: 100%;
	}

	#search-bar {
		border-radius: 8px;
		width: 90%;
		border: 3px solid var(--dark1);
		margin: 0.35rem;
		margin-top: 0.5rem;
		position: relative;
		padding: 0.25rem;
		font-size: 1rem;
		background: var(--black);
		color: var(--white);
	}
	#search-bar:focus {
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
		width: 17px;
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
