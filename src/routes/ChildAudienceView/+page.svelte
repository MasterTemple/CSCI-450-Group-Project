<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { setWindowFullscreen } from "../functions";
	import {
		breakIndexes,
		dividerList,
		lines,
		lyricsBySlide,
		rawClipboardContents,
	} from "../stores.js";

	const bc = new BroadcastChannel("lyric_of_lyrics");
	const isReady = writable(false);
	const lyrics = writable([]);

	function goFullscreen() {
		// tell presenter screen to go fullscreen
		bc.postMessage({ msg: "goFullscreen" });
		// set this window fullscreen
		setWindowFullscreen(document);
		// set this window to the audience view
		isReady.set(true);
	}

	bc.onmessage = (event) => {
		if (event.data.msg == "setLyrics") {
			console.log({ data: event.data });
			lyrics.set([...event.data.lyrics]);
		}
	};

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft"];
	// send keys to presenter view
	onMount(() => {
		document.addEventListener("keydown", (event) => {
			if (RESERVED_KEYS.includes(event.key)) {
				event.preventDefault();
				bc.postMessage({ msg: "sendKey", key: event.key });
			}
		});

		// load data
		const savedCurrentSong = JSON.parse(
			localStorage.getItem("currentSong"),
		);

		if (savedCurrentSong) {
			rawClipboardContents.set(savedCurrentSong["rawClipboardContents"]);
			lines.set(savedCurrentSong["lines"]);
			lyricsBySlide.set(savedCurrentSong["lyricsBySlide"]);
			breakIndexes.set(savedCurrentSong["breakIndexes"]);
			dividerList.set(savedCurrentSong["dividerList"]);
		}
	});
</script>

<div id="body">
	{#if !$isReady}
		<h1>audience view!</h1>
		<button on:click={goFullscreen}
			>click when ready to go fullscreen</button
		>
	{:else}
		<div id="lyrics">
			{#each $lyrics as line}
				<p>{line}</p>
			{/each}
		</div>
	{/if}
</div>

<style>
	#body {
		overflow: hidden;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#lyrics {
		align-items: center;
		align-content: center;
		text-align: center;
		vertical-align: middle;
	}
	p {
		text-align: center;
		font-size: 4rem;
	}
</style>
