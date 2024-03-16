<script>
	import {
		author,
		backgroundColor,
		color,
		currentSlideIndex,
		fontFamily,
		fontSize,
		textColor,
		title,
	} from "../stores.js";
	import Slides from "./Slides.svelte";

	// const bc = new BroadcastChannel("lyric_of_lyrics");
	// const lyrics = writable([]);
	export let lyrics;

	//Need to fix bug. Works when you change this value after page loads
	let slideCounter = 0;

	function getElapsedTime() {
		var startTime = new Date();

		//setInterval calls this function every second to update timer
		var updateTimer = setInterval(function () {
			var currentTime = new Date();

			var timeDifference = currentTime - startTime;

			var totalSeconds = Math.floor(timeDifference / 1000);

			var minutes = Math.floor(totalSeconds / 60);
			var seconds = Math.floor(totalSeconds % 60);

			//Format time to display as "MM:SS"
			let formattedMinutes = String(minutes).padStart(2, "0");
			let formattedSeconds = String(seconds).padStart(2, "0");

			var elapsedTimeElement = document.getElementById("elapsedTime");
			elapsedTimeElement.textContent =
				"" + formattedMinutes + ":" + formattedSeconds + " Elapsed";
		}, 1000);

		return updateTimer;
	}

	// currentSlideIndex.subscribe((newIndex) => {
	// 	if ($currentSlideIndex < 0) return;
	// 	if (!$lyricsBySlide[newIndex]) return;
	// 	lyrics.set($lyricsBySlide[newIndex]);
	// 	console.log({ lyrics: $lyricsBySlide[newIndex], newIndex });
	// 	bc.postMessage({
	// 		msg: "setLyrics",
	// 		lyrics: $lyricsBySlide[newIndex],
	// 	});
	// });

	// bc.onmessage = (event) => {
	// 	if (event.data.msg == "setLyrics") {
	// 		console.log({ data: event.data });
	// 		lyrics.set([...event.data.lyrics]);
	// 	}
	// };

	// //Also need to fix interaction with arrow keys
	// function onKey(key) {
	// 	// right arrow: advance slide
	// 	if (key == "ArrowRight") {
	// 		// currentSlideIndex.update((i) => i + 1);
	// 		currentSlideIndex.set(
	// 			min(lyricsBySlide.length, $currentSlideIndex + 1),
	// 		);
	// 	}
	// 	// left arrow: retreat slide
	// 	else if (key == "ArrowLeft") {
	// 		// currentSlideIndex.update((i) => i - 1);
	// 		currentSlideIndex.set(max(0, $currentSlideIndex - 1));
	// 	}
	// }

	// function slideRight() {
	// 	currentSlideIndex.set(
	// 		min($lyricsBySlide.length, $currentSlideIndex + 1),
	// 	);
	// }

	// function slideLeft() {
	// 	currentSlideIndex.set(max(0, $currentSlideIndex - 1));
	// }

	// const RESERVED_KEYS = ["ArrowRight", "ArrowLeft", "Escape"];

	// onMount(() => {
	// 	slideCounter = 0;
	// 	slideCounter = $lyricsBySlide.length;

	// 	//Send user back to editor page when ESC key is pressed
	// 	window.addEventListener(
	// 		"keyup",
	// 		function (e) {
	// 			if (e.key === "Escape" || e.keyCode == 27)
	// 				this.window.location.assign("../");
	// 		},
	// 		false,
	// 	);
	// 	document.addEventListener("keydown", (event) => {
	// 		if (RESERVED_KEYS.includes(event.key)) {
	// 			event.preventDefault();
	// 			// bc.postMessage({ msg: "sendKey", key: event.key });
	// 			onKey(event.key);
	// 		}
	// 	});

	// 	const rightBtn = document.getElementById("slideRight");
	// 	rightBtn.addEventListener("click", slideRight);
	// 	const leftBtn = document.getElementById("slideLeft");
	// 	leftBtn.addEventListener("click", slideLeft);

	// 	//Start timer
	// 	var updateDisplay = getElapsedTime();

	// 	// load data
	// 	const savedCurrentSong = JSON.parse(
	// 		localStorage.getItem("currentSong"),
	// 	);

	// 	if (savedCurrentSong) {
	// 		rawClipboardContents.set(savedCurrentSong["rawClipboardContents"]);
	// 		lines.set(savedCurrentSong["lines"]);
	// 		breakIndexes.set(savedCurrentSong["breakIndexes"]);
	// 		dividerList.set(savedCurrentSong["dividerList"]);
	// 		lyricsBySlide.set(savedCurrentSong["lyricsBySlide"]);
	// 	}
	// 	// setTimeout(() => currentSlideIndex.set(0), 500);
	// 	// currentSlideIndex.set(0);
	// });
	function exit() {
		document.exitFullscreen();
		window.location.href = "/";
		bc.postMessage({
			msg: "close",
		});
	}
</script>

<div id="button-stack">
	<!-- <a href="/"> -->
	<button id="backButton" on:click={exit} style="--color: {color.darkBlue}"
		>Back</button
	>
	<!-- </a> -->

	<div id="elapsedTime" style="--color: {color.black}" />
</div>
<button id="switchSong" style="--color: {color.darkBlue}">Switch Song</button>

<div id="songSlideStack">
	<div id="songInfo">
		<div id="songTitle" style="--color: {color.darkBlue}">
			<p>{$title}</p>
		</div>
		<div id="songArtist" style="--color: {color.darkBlue}">
			<p>{$author || "No Author"}</p>
		</div>
	</div>

	<div
		id="currentSlide"
		style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize} "
	>
		<Slides {lyrics} />
	</div>

	<div id="slideControlStack">
		<button id="slideLeft">Left</button>

		<div id="slideCounter" style="--color: {color.black}">
			<p>{$currentSlideIndex + 1}/{slideCounter}</p>
		</div>

		<button id="slideRight">Right</button>
	</div>
</div>

<style>
	#button-stack {
		position: absolute;
		left: 0;
		top: 0;
		margin: auto;
		text-align: center;
	}
	#backButton {
		margin: 5px;
		border-radius: 10px;
		height: 50px;
		width: 150px;
		background-color: var(--color);
		color: white;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#elapsedTime {
		color: var(--color);
		margin-top: 5px;
	}

	#switchSong {
		position: absolute;
		left: 0;
		bottom: 0;
		margin: 5px;
		border-radius: 10px;
		height: 50px;
		width: 150px;
		background-color: var(--color);
		color: white;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#songSlideStack {
		display: flex;
		flex-direction: column;
		margin: auto;
		text-align: center;
	}

	#songInfo {
		margin: auto;
		margin-top: -10vh;
		padding: 10px;
	}

	#songTitle {
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		height: 40px;
		width: 150px;
		text-wrap: balance;
		font-size: larger;
		content: "test";
	}

	#songArtist {
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		height: 40px;
		width: 130px;
		text-wrap: balance;
		font-size: larger;
		margin: auto;
	}

	#currentSlide {
		border: 4px solid darkgreen;
		border-radius: 3%;
		height: 30vw;
		width: 50vw;
		padding: 10px;
		background-color: lightblue;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#slideControlStack {
		display: flex;
		flex-direction: row;
		margin: auto;
		padding: 10px;
	}

	#slideLeft {
		padding: 10px;
		cursor: pointer;
	}

	#slideRight {
		padding: 10px;
		cursor: pointer;
	}

	#slideCounter {
		font-size: larger;
	}
</style>
