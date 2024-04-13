<script>
	import { onMount } from "svelte";
	import { allSongs, color, savedSongsIsOpen, switchTabIndex } from "../stores";
	import SearchResult from "./SearchResult.svelte";
	import { writable } from "svelte/store";

	export let closeModal;
	// export let closeModal = () => {
	// 	closeModal();
	// };
	const UNKNOWN_SONG_AUTHOR_PLACEHOLDER = "Unknown";
	// const searchValue = writable("");
	export let searchValue;

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

	$: tabIndex = 0;
	onMount(() => {
		document.addEventListener("keydown", (event) => {
			console.log(event);
			if (event.key == "Tab")
				if (event.shiftKey) switchTabIndex.update((i) => i - 1);
				else switchTabIndex.update((i) => i + 1);
			// document.querySelector(`#search-result-${tabIndex}`).focus()
		});
	});
	let filteredSongs = writable([...$allSongs]);
	searchValue.subscribe((v) =>
		filteredSongs.set($allSongs.filter((s) => isSearchMatch(v, s))),
	);
</script>

<h1>Switch Current Song:</h1>
<div class="column">
	<input
		type="text"
		placeholder="Search for another song..."
		id="search-input"
		bind:value={$searchValue}
		on:keydown|stopPropagation={(event) => {
			if (event.key == "Enter") {
				document.querySelector(`#search-result-${$switchTabIndex}`)?.click();
				closeModal();
			}
			if (event.key == "Escape") {
				event.preventDefault();
				closeModal();
			}
		}}
		autocomplete="off"
	/>
	<!-- <p>{0}/{$allSongs.length}</p> -->
</div>
<div id="switch-songs">
	<!-- {#each $allSongs.filter((song) => isSearchMatch($searchValue, song)) as song, i} -->
	<!-- 	{#if } -->
	{#each $filteredSongs as song, i}
		<!-- {#if isSearchMatch($searchValue, song)} -->
		<SearchResult
			songIndex={i}
			name={song["title"]}
			author={song["author"] || UNKNOWN_SONG_AUTHOR_PLACEHOLDER}
			songId={song["songId"]}
			{closeModal}
		/>
		<!-- {/if} -->
	{/each}
</div>

<style>
	* {
		font-family: var(--font-family);
	}
	h1 {
		color: var(--white);
		/* background: var(--dark0); */
		margin: 0;
	}
	#switch-songs {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow-y: scroll;
		scrollbar-face-color: green;
	}
	#search-input {
		all: unset;
		background: var(--black);
		color: var(--white);
		font-size: 1.5rem;
		border-radius: 16px;
		border: 3px solid var(--dark1);
		padding: 1rem;
		margin: 0.5rem;
		width: 40%;
	}
	#search-input:focus {
		border-color: var(--primary);
	}
</style>
