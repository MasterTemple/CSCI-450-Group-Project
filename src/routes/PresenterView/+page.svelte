<script>
	import { onMount } from "svelte";
	import { max, min, setWindowFullscreen } from "../functions";
	import {
		currentSlideIndex,
		lyricsBySlide,
		setCurrrentSong,
	} from "../stores";
	import LeftColumn from "./LeftColumn.svelte";
	import RightColumn from "./RightColumn.svelte";

	const bc = new BroadcastChannel("lyric_of_lyrics");

	bc.onmessage = (event) => {
		// console.log(event);
		if (event.data.msg == "goFullscreen") {
			setWindowFullscreen(document);
			currentSlideIndex.set(-1);
			currentSlideIndex.set(0);
		} else if (event.data.msg == "sendKey") {
			onKey(event.data.key);
		}
	};

	currentSlideIndex.subscribe((newIndex) => {
		if ($currentSlideIndex < 0) return;
		if (!$lyricsBySlide?.[newIndex]) return;
		console.log({ lyrics: $lyricsBySlide[newIndex], newIndex });
		bc.postMessage({
			msg: "setLyrics",
			lyrics: $lyricsBySlide[newIndex],
		});
	});

	function onKey(key) {
		// right arrow: advance slide
		if (key == "ArrowRight") {
			// currentSlideIndex.update((i) => i + 1);
			currentSlideIndex.set(
				min($lyricsBySlide.length - 1, $currentSlideIndex + 1),
			);
		}
		// left arrow: retreat slide
		else if (key == "ArrowLeft") {
			// currentSlideIndex.update((i) => i - 1);
			currentSlideIndex.set(max(0, $currentSlideIndex - 1));
		}
	}

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape"];
	onMount(() => {
		// load data
		lyricsBySlide.set([]);
		console.log({ $lyricsBySlide });
		const allLocalSongs = JSON.parse(localStorage.getItem("allSongs"));
		const currentSongId = JSON.parse(localStorage.getItem("currentSongId"));
		let savedCurrentSong = allLocalSongs.find(
			(s) => s.songId == currentSongId,
		);

		if (savedCurrentSong) {
			console.log(savedCurrentSong);
			setCurrrentSong(savedCurrentSong);
			currentSlideIndex.set(-1);
			currentSlideIndex.set(0);
		}
		lyricsBySlide.subscribe((lbs) => {
			console.log({ lbs });
		});

		// lyricsBySlide.set(
		// 	// JSON.parse(localStorage.getItem("currentSong")).slides,
		// 	JSON.parse(localStorage.getItem("lyricsBySlide")),
		// );

		document.addEventListener("keydown", (event) => {
			if (RESERVED_KEYS.includes(event.key)) {
				event.preventDefault();
				// bc.postMessage({ msg: "sendKey", key: event.key });
				onKey(event.key);
			}
		});
	});
</script>

<div id="row">
	<div id="LeftColumn">
		<LeftColumn lyrics={$lyricsBySlide?.[$currentSlideIndex] || []} />
		<!-- <LeftColumn lyrics={["asdf", "fdas"]} /> -->
	</div>
	<div id="RightColumn">
		<!-- <RightColumn lyrics={$lyricsBySlide?.[$currentSlideIndex] || []} /> -->
		<RightColumn />
	</div>
</div>

<style>
	#row {
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	#LeftColumn {
		/*background-color: blue;*/
		height: 100%;
		width: 100vw;
		display: flex;
		align-items: center;
		vertical-align: top;
	}

	#RightColumn {
		/*background-color: beige;*/
		height: 100%;
		width: 50vw;
		position: relative;
		right: var(--loc);
		display: flex;
	}
</style>
