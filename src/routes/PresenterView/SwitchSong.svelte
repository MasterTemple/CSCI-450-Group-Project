<script>
	import { onMount } from "svelte";
	import { allSongs, color, savedSongsIsOpen } from "../stores";
	import SearchResult from "./SearchResult.svelte";
	import { writable } from "svelte/store";

	export let closeModal;
	const UNKNOWN_SONG_AUTHOR_PLACEHOLDER = "Unknown";
	// const searchValue = writable("");
	export let searchValue;

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
	
	onMount(() => {
	})
</script>

<h1>Switch Current Song:</h1>
<div class="column">
	<input
		type="text"
		placeholder="Search for another song..."
		id="search-input"
		bind:value={$searchValue}
		on:keydown={(event) => {
			if(event.key == "Enter") {
				console.log(document.querySelector("#switch-songs button"))
				document.querySelector("#switch-songs button")?.click()
			}
		}}
	/>
	<!-- <p>{0}/{$allSongs.length}</p> -->
</div>
<div id="switch-songs">
	{#each $allSongs as song}
		{#if isSearchMatch($searchValue, song)}
			<SearchResult
				name={song["title"]}
				author={song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER}
				songId={song["songId"]}
				closeModal={closeModal}
			/>
		{/if}
	{/each}
</div>


<style>
	* {
		font-family: var(--font-family);
	}
	h1 {
		color: var(--white);
		/* background: var(--dark0); */
	}
	#switch-songs {
		display: flex;
		flex-wrap: wrap;
		
	}
	#search-input {
		all: unset;
		background: var(--black);
		color: var(--white);
		font-size: 1.5rem;
		border-radius: 16px;
		border: 3px solid var(--dark1);
		padding: 1rem;
		margin: 1rem;
		width: 50%;
	}
	#search-input:focus {
		border-color: var(--primary);
	}
</style>
