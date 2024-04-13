<script>
	import { onMount } from "svelte";
	import { max, min, setWindowFullscreen } from "../functions";
	import {
		currentSlideIndex,
		lyricsBySlide,
		setCurrrentSong,
		inputReserved,
		backgroundColor,
		includeTitleSlide,
		title,
		author,
	} from "../stores";
	import LeftColumn from "./LeftColumn.svelte";
	import RightColumn from "./RightColumn.svelte";

	let shouldBeFullscreen = false;

	const bc = new BroadcastChannel("lyric_of_lyrics");
	bc.onmessage = (event) => {
		console.log(event);
		if (event.data.msg == "goFullscreen") {
			setWindowFullscreen(document);
			shouldBeFullscreen = true;
			currentSlideIndex.set(-1);
			currentSlideIndex.set(0);
		} else if (event.data.msg == "sendKey") {
			onKey(event.data.key);
		}
	};

	currentSlideIndex.subscribe((newIndex) => {
		if ($currentSlideIndex == 0 && $includeTitleSlide) {
			bc.postMessage({
				msg: "setTitleSlide",
				title: $title,
				author: $author,
			})
			return;
		}
		if($includeTitleSlide) newIndex--;
		if ($currentSlideIndex < 0) return;
		if (!$lyricsBySlide?.[newIndex]) return;
		console.log({ lyrics: $lyricsBySlide[newIndex], newIndex });
		bc.postMessage({
			msg: "setLyrics",
			lyrics: $lyricsBySlide[newIndex],
			includeTitleSlide: $includeTitleSlide
		});
	});

	function onKey(key) {
		console.log({ key });
		// right arrow: advance slide
		if (["ArrowRight", " ", "l"].includes(key)) {
			currentSlideIndex.set(
				min($lyricsBySlide.length - 1 + $includeTitleSlide, $currentSlideIndex + 1),
			);
		}
		// left arrow: retreat slide
		else if (["ArrowLeft", "h"].includes(key)) {
			// currentSlideIndex.update((i) => i - 1);
			currentSlideIndex.set(max(0, $currentSlideIndex - 1));
		} else if (key == "Escape") {
			window.location.href = "/";
			document.exitFullscreen();
			bc.postMessage({
				msg: "close",
			});
		}
		// press s: switch song
		else if(key == "s") {
			document.querySelector("#switch-song-button").click()
		}
	}

	const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape", " ", "h", "l", "s"];
	onMount(() => {
		// load data
		lyricsBySlide.set([]);
		console.log({ $lyricsBySlide });
		const allLocalSongs = JSON.parse(
			localStorage.getItem("allSongs") || "[]",
		);
		const currentSongId = JSON.parse(localStorage.getItem("currentSongId"));
		let savedCurrentSong = allLocalSongs.find(
			(s) => s.songId == currentSongId,
		);

		console.log({ savedCurrentSong });
		if (savedCurrentSong) {
			setCurrrentSong(savedCurrentSong);
		} else {
			savedCurrentSong = JSON.parse(localStorage.getItem("currentSong"));
			setCurrrentSong(savedCurrentSong);
		}
		currentSlideIndex.set(-1);
		currentSlideIndex.set(0);
		lyricsBySlide.subscribe((lbs) => {
			console.log({ lbs });
		});

		document.addEventListener("keydown", (event) => {
			if($inputReserved) return;
			if (RESERVED_KEYS.includes(event.key)) {
				event.preventDefault();
				// bc.postMessage({ msg: "sendKey", key: event.key });
				onKey(event.key);
			}
		});
		document.addEventListener("mousedown", (event) => {
			// event.target
			console.log(event.target.id);
			if (event.target.id != "backButton") setWindowFullscreen(document);
		});
	});
</script>

<div id="row"
style="--background-color: {$backgroundColor};"
>
	<div id="LeftColumn">
		<LeftColumn lyrics={$lyricsBySlide?.[$currentSlideIndex - ($includeTitleSlide ? 1 : 0)] || []} />
		<!-- <LeftColumn lyrics={["asdf", "fdas"]} /> -->
	</div>
	<div id="RightColumn">
		<!-- <RightColumn lyrics={$lyricsBySlide?.[$currentSlideIndex] || []} /> -->
		<RightColumn />
	</div>
</div>

<style>
	@import "../style.css";
	#row {
		background-color: var(--dark0);
		display: flex;
		flex-direction: row;
		height: 100vh;
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
