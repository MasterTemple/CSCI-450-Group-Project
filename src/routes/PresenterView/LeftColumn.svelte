<script>
	import {
		author,
		backgroundColor,
		color,
		currentSlideIndex,
		fontFamily,
		fontSize,
		lyricsBySlide,
		textColor,
		title,
	} from "../stores.js";
	import Slides from "./Slides.svelte";

	export let lyrics;

	$: elapsedTime = "00:00";

	const startTime = new Date();
	setInterval(() => {
		let currentTime = new Date();
		let totalSeconds = (currentTime - startTime) / 1000;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		//Format time to display as "MM:SS"
		let formattedMinutes = String(minutes).padStart(2, "0");
		let formattedSeconds = String(seconds).padStart(2, "0");
		elapsedTime = `${formattedMinutes}:${formattedSeconds}`;
	}, 1000);

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

	<div id="elapsedTime" style="--color: {color.black}">
		<p>{elapsedTime} Elapsed</p>
	</div>
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
			<p>{$currentSlideIndex + 1}/{$lyricsBySlide.length}</p>
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
