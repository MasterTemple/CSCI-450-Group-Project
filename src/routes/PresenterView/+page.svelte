<script>
	import { onMount } from "svelte";
	import { getLyricData, max, min, setWindowFullscreen } from "../functions";
	import { currentSlideIndex, lyricsBySlide } from "../stores";
	import LeftColumn from "/home/dgmastertemple/Documents/GitHub/CSCI-450-Group-Project/src/routes/PresenterView/LeftColumn.svelte";
	import RightColumn from "/home/dgmastertemple/Documents/GitHub/CSCI-450-Group-Project/src/routes/PresenterView/RightColumn.svelte";
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
		if (!$lyricsBySlide[newIndex]) return;
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
				min($lyricsBySlide.length, $currentSlideIndex + 1),
			);
		}
		// left arrow: retreat slide
		else if (key == "ArrowLeft") {
			// currentSlideIndex.update((i) => i - 1);
			currentSlideIndex.set(max(0, $currentSlideIndex - 1));
		}
	}

	onMount(() => {
		lyricsBySlide.set(getLyricData());

		document.addEventListener("keydown", (event) => onKey(event.key));
	});
</script>

<div id="row">
	<div id="LeftColumn">
		<LeftColumn />
	</div>
	<div id="RightColumn">
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
