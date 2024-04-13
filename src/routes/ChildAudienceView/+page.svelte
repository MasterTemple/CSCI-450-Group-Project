<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { setWindowFullscreen } from "../functions";
	import {
		backgroundColor,
		fontFamily,
		fontSize,
		setCurrrentSong,
		textColor,
	} from "../stores.js";

	const bc = new BroadcastChannel("lyric_of_lyrics");
	const isReady = writable(false);
	const lyrics = writable([]);
	const title = writable("");
	const author = writable("");
	const showTitleSlide = writable(false);

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
			// console.log({ data: event.data });
			lyrics.set([...event.data.lyrics]);
			showTitleSlide.set(false);
		} else if (event.data.msg == "setTitleSlide") {
			// console.log({ data: event.data });
			title.set(event.data.title);
			author.set(event.data.author);
			showTitleSlide.set(true);
		} else if (event.data.msg == "close") {
			window.close();
		}
	};

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape"];
	// send keys to presenter view
	onMount(() => {
		document.addEventListener("mousedown", (event) => {
			// if ($isReady == false) goFullscreen();
			// if(window.innerWidth == screen.width && window.innerHeight == screen.height) // this works to check if in full screen
			goFullscreen();
			// else bc.postMessage({ msg: "sendKey", key: "ArrowRight" });
		});
		document.addEventListener("keydown", (event) => {
			if (RESERVED_KEYS.includes(event.key)) {
				// event.preventDefault();
				bc.postMessage({ msg: "sendKey", key: event.key });
			}
			if (event.key == "Escape") {
				window.close();
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
	});
</script>

<div
	id="body"
	style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize}px;"
>
	{#if !$isReady}
		<p>Drag window to desired output</p>
		<p>Click anywhere to enter Fullscreen Mode</p>
	{:else}
		<div id="lyrics">
			{#if $showTitleSlide}
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
		/* font-size: 4rem; */
	}
</style>
