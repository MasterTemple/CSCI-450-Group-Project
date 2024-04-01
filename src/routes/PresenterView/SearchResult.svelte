<script>
	import { allSongs, setCurrrentSong, currentSongId, currentSlideIndex, switchTabIndex } from "../stores";
	export let name;
	export let author;
	export let songId
	export let closeModal;
	export let songIndex;
	function switchSong() {
		let newSong = $allSongs.find((s) => s["songId"] == songId);
		currentSongId.set(songId);
		setCurrrentSong(newSong);
		// if already 0 -> no change -> no update
		currentSlideIndex.set(-1)
		currentSlideIndex.set(0)
		closeModal()
	}
</script>

<button id={"search-result-" + songIndex} class="card" on:click={switchSong}
	class:focused={$switchTabIndex==songIndex}
>
	<p class="result">
		<span class="name">{name}</span>
		-
		<span class="author">By {author}</span>
	</p>
</button>

<style>
	.result {
		text-align: left;
		padding: .25rem 1rem;
		margin: 0.25rem;
	}
	.card {
		all: unset;
		background: var(--black);
		border-radius: 12px;
		border: 1px solid var(--dark1);
		padding: 0;
		margin: 0.25rem;
		/* padding: 1rem; */
		/* margin: 1rem; */
		width: 60%;
	}


	.card.focused,
	.card:hover {
		border-color: var(--primary);
	}
	.name {
		font-size: 1rem;
		margin-left: 3rem;
	}
	.author {
		font-size: 1rem;
		font-style: italic;
		color: var(--dark6);
	}
</style>
