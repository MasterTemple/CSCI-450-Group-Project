<script>
	import { writable } from "svelte/store";
	import { setWindowFullscreen } from "../functions";

	const bc = new BroadcastChannel("lyric_of_lyrics");
	const isReady = writable(false);
	const lyrics = writable([]);

	function goFullscreen() {
		// tell presenter screen to go fullscreen
		bc.postMessage({ msg: "goFullscreen" });
		// set this window fullscreen
		setWindowFullscreen(window);
		// set this window to the audience view
		isReady.set(true);
	}

	bc.onmessage = (event) => {
		if (event.data.msg == "setLyrics") {
			console.log({ data: event.data });
			lyrics.set([...event.data.lyrics]);
		}
	};
</script>

<h1>audience view!</h1>
{#if !$isReady}
	<button on:click={goFullscreen}>click when ready to go fullscreen</button>
{:else}
	{#each $lyrics as line}
		<p>{line}</p>
	{/each}
{/if}
