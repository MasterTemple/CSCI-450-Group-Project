<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { max, min, setWindowFullscreen } from "../functions";
	import {
		currentSlideIndex,
		lyricsBySlide,
		setCurrrentSong,
	} from "../stores.js";

	const bc = new BroadcastChannel("lyric_of_lyrics");
	const isReady = writable(false);
	const lyrics = writable([]);

	currentSlideIndex.subscribe((newIndex) => {
		if ($currentSlideIndex < 0) return;
		if (!$lyricsBySlide[newIndex]) return;
		lyrics.set($lyricsBySlide[newIndex]);
	});

	function goFullscreen() {
		// tell presenter screen to go fullscreen
		// bc.postMessage({ msg: "goFullscreen" });
		// set this window fullscreen
		setWindowFullscreen(document);
		// enterFullscreen();
		// set this window to the audience view
		isReady.set(true);
	}

	function onKey(key) {
		// right arrow: advance slide
		if (key == "ArrowRight") {
			// currentSlideIndex.update((i) => i + 1);
			currentSlideIndex.set(
				min($lyricsBySlide.length, $currentSlideIndex + 1),
			);
		}
		// left arrow: retreat slide
		else if (key == "ArrowLeft") {
			// currentSlideIndex.update((i) => i - 1);
			currentSlideIndex.set(max(0, $currentSlideIndex - 1));
		}
		// escape: return to lyric editor
		else if (key == "Escape") {
			window.location.href = "/";
		}
	}

	bc.onmessage = (event) => {
		if (event.data.msg == "setLyrics") {
			console.log({ data: event.data });
			lyrics.set([...event.data.lyrics]);
		}
	};

	// const unsubscribe = lyricsBySlide.subscribe(() => currentSlideIndex.set(0));

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape"];
	// send keys to presenter view
	onMount(() => {
		// setWindowFullscreen(window);
		setWindowFullscreen(document);
		document.addEventListener("keydown", (event) => {
			if (RESERVED_KEYS.includes(event.key)) {
				event.preventDefault();
				// bc.postMessage({ msg: "sendKey", key: event.key });
				onKey(event.key);
			}
		});

		// load data
		const allLocalSongs = JSON.parse(localStorage.getItem("allSongs"));
		const currentSongId = JSON.parse(localStorage.getItem("currentSongId"));
		let savedCurrentSong = allLocalSongs.find(
			(s) => s.songId == currentSongId,
		);

		if (savedCurrentSong) {
			setCurrrentSong(savedCurrentSong);
		}
		// setTimeout(() => currentSlideIndex.set(0), 500);
		// currentSlideIndex.set(0);
		currentSlideIndex.set(-1);
		currentSlideIndex.set(0);
	});
</script>

<div id="body">
	<div id="lyrics">
		{#each $lyrics as line}
			<p>{line}</p>
		{/each}
	</div>
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
