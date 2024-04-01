<script>
	import { allSongs, setCurrrentSong, currentSongId, currentSlideIndex } from "../stores";
	export let name;
	export let author;
	export let songId
	export let closeModal;
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

<button class="card" on:click={switchSong}>
	<p class="name">{name}</p>
	<p class="author">By {author}</p>
</button>

<style>
	.card {
		all: unset;
		background: var(--black);
		border-radius: 16px;
		border: 3px solid var(--dark1);
		padding: 1rem;
		margin: 1rem;
	}
	.card:hover {
		border-color: var(--primary);
	}
	.name {
		font-size: 1rem;
	}
	.author {
		font-size: 1rem;
		font-style: italic;
	}
</style>
