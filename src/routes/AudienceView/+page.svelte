<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { max, min, setWindowFullscreen } from "../functions";
	import {
		backgroundColor,
		currentSlideIndex,
		fontFamily,
		fontSize,
		lyricsBySlide,
		setCurrrentSong,
		textColor,
		title,
		author,
		includeTitleSlide,
	} from "../stores.js";

	const bc = new BroadcastChannel("lyric_of_lyrics");
	const isReady = writable(false);
	const lyrics = writable([]);

	currentSlideIndex.subscribe((newIndex) => {
		// offset cause of title slide
		if ($currentSlideIndex < 0) return;
		if ($includeTitleSlide) newIndex--;
		if (!$lyricsBySlide[newIndex]) return;
		lyrics.set($lyricsBySlide[newIndex]);
		console.log({ $lyricsBySlide, $currentSlideIndex, newIndex });
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
		if (["ArrowRight", " ", "l"].includes(key)) {
			currentSlideIndex.set(
				min(
					$lyricsBySlide.length - 1 + ($includeTitleSlide ? 1 : 0),
					$currentSlideIndex + 1,
				),
			);
		}
		// left arrow: retreat slide
		else if (["ArrowLeft", "h"].includes(key)) {
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

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape", " ", "h", "l"];
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
		const allLocalSongs = JSON.parse(localStorage.getItem("allSongs") || "[]");
		const currentSongId = JSON.parse(localStorage.getItem("currentSongId"));
		let savedCurrentSong = allLocalSongs.find((s) => s.songId == currentSongId);

		console.log({ savedCurrentSong });
		if (savedCurrentSong) {
			setCurrrentSong(savedCurrentSong);
		} else {
			savedCurrentSong = JSON.parse(localStorage.getItem("currentSong"));
			setCurrrentSong(savedCurrentSong);
		}
		// setTimeout(() => currentSlideIndex.set(0), 500);
		// currentSlideIndex.set(0);
		currentSlideIndex.set(-1);
		currentSlideIndex.set(0);
	});
</script>

<div
	id="body"
	style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize *
		2}px;"
>
	<div id="lyrics">
		{#if $currentSlideIndex == 0 && $includeTitleSlide}
			<p
				style="color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize *
					2.5}px;"
			>
				{$title}
			</p>
			<p
				style="color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize *
					1.25}px;"
			>
				{$author}
			</p>
		{:else}
			{#each $lyrics as line}
				<p
					style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize *
						2}px;"
				>
					{line}
				</p>
			{/each}
		{/if}
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
		padding: 10px;
	}
	p {
		text-align: center;
		/* font-size: 4rem; */
	}
</style>
