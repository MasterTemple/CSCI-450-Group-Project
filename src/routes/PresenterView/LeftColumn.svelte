<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { max, min } from "../functions.js";
	import {
		author,
		color,
		currentSlideIndex,
		lyricsBySlide,
		title,
		inputReserved,
	} from "../stores.js";
	import Slides from "./Slides.svelte";
	import SwitchSong from "./SwitchSong.svelte";

	export let lyrics;
	const searchValue = writable("");

	$: elapsedTime = "00:00";

	const startTime = new Date();
	setInterval(() => {
		const currentTime = new Date();
		const totalSeconds = (currentTime - startTime) / 1000;
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = Math.floor(totalSeconds % 60);
		//Format time to display as "MM:SS"
		const formattedMinutes = String(minutes).padStart(2, "0");
		const formattedSeconds = String(seconds).padStart(2, "0");
		elapsedTime = `${formattedMinutes}:${formattedSeconds}`;
	}, 1000);

	function advanceSlides() {
		currentSlideIndex.set(
			min($lyricsBySlide.length - 1, $currentSlideIndex + 1),
		);
	}

	function retreatSlides() {
		currentSlideIndex.set(max(0, $currentSlideIndex - 1));
	}

	function exit() {
		document.exitFullscreen();
		window.location.href = "/";
		bc.postMessage({
			msg: "close",
		});
	}

	let switchSongDialog;
	onMount(() => {
		switchSongDialog = document.getElementById("switch-song-dialog");
	})

	function openSwitchSongDialog() {
		switchSongDialog.style.display = "block";
		inputReserved.set(true);
		searchValue.set("")
		document.querySelector("#search-input").focus()
		document.querySelector("#search-input").value = ""
	}
	function closeSwitchSongDialog() {
		switchSongDialog.style.display = "none";
		inputReserved.set(false);
		searchValue.set("")
		document.querySelector("#search-input").value = ""
	}
</script>

<div id="button-stack">
	<!-- <a href="/"> -->
	<button id="backButton" on:click={exit} 
		>Back</button
	>
	<!-- </a> -->

	<div id="elapsedTime">
		<p>{elapsedTime} Elapsed</p>
	</div>
</div>
<button
	id="switch-song-button"
	on:click={openSwitchSongDialog}
>Switch Song</button>

<div id="songSlideStack"
	style="--title-ch-width: {max($title.length, 20)}ch;--author-ch-width: {max($author.length, 20)}ch;"
>
	<div id="songInfo">
		<div id="songTitle">
			<p>{$title}</p>
		</div>
		<div id="songArtist">
			<p>{$author || "No Author"}</p>
		</div>
	</div>

	<!-- style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize} " -->
	<div id="currentSlide">
		<Slides {lyrics} fontSizeOverride={32} />
	</div>

	<div id="slideControlStack">
		<button
			id="slideLeft"
			disabled={$currentSlideIndex == 0}
			on:click={retreatSlides}>
			←
		</button
		>

		<p id="slideCounter">
			{$currentSlideIndex + 1}/{$lyricsBySlide.length}
		</p>

		<button
			id="slideRight"
			disabled={$currentSlideIndex == $lyricsBySlide.length - 1}
			on:click={advanceSlides}>→</button
		>
	</div>
</div>

<div id="switch-song-dialog" class="modal">
	<div class="modal-content">
		<SwitchSong closeModal={closeSwitchSongDialog} searchValue={searchValue}/>
	</div>
</div>

<style>
	#switch-song-dialog {
		/* display: flex; */
		/* justify-content: center; */
		/* align-items: center; */
		/* max-width: 30vw; */
	}
	#switch-song-dialog > div {
		background: var(--dark0);
	}
	* {
		font-family: var(--font-family);
	}
	#button-stack {
		position: absolute;
		left: 0;
		top: 0;
		margin: auto;
		text-align: center;
	}
	#backButton {
		all: unset;
		font-family: var(--font-family);
		text-align: center;
		margin-left: 1rem;
		margin-top: 1rem;
		border-radius: 10px;
		border: 2px solid var(--dark2);
		height: 50px;
		width: 150px;
		background-color: var(--secondary);
		color: var(--white);
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#elapsedTime {
		color: var(--white);
		margin-top: 5px;
	}

	#switch-song-button {
		all: unset;
		font-family: var(--font-family);
		text-align: center;
		position: absolute;
		left: 1rem;
		bottom: 1rem;
		margin: 5px;
		border-radius: 10px;
		border: 2px solid var(--dark2);
		height: 50px;
		width: 150px;
		background-color: var(--secondary);
		color: var(--white);
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
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: auto;
		margin-top: -10vh;
		padding: 10px;
	}

	#songTitle {
		border: none;
		background-color: var(--info);
		color: white;
		border-radius: 5px;
		height: 3rem;
		width: 20ch;
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		font-size: x-large;
		margin: 1rem;
	}

	#songArtist {
		border: none;
		background-color: var(--info);
		color: white;
		border-radius: 5px;
		height: 2rem;
		width: 20ch;
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: center;
		font-size: medium;
	}

	#currentSlide {
		border: 4px solid var(--primary);
		border-radius: 3%;
		height: 30vw;
		width: 50vw;
		padding: 10px;
		background-color: var(--background-color);
		color: var(--text-color);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#slideControlStack {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: auto;
		/* padding: 10px; */
		/* background: var(--black); */
		border-radius: 16px;
	}

	#slideLeft,
	#slideRight 
	{
		all: unset;
		text-align: center;
		color: var(--white);
		font-size: 3rem;
		margin: 1rem;
		border-radius: 16px;
	}
	#slideLeft:hover,
	#slideRight:hover {
		color: var(--primary);
	}

	#slideCounter {
		font-size: 1.5rem;
		color: var(--white);
	}

	#songTitle {
		text-align: center;
		border: none;
		background-color: var(--background-color);
		color: var(--white);
		border-radius: 5px;
		font-size: xx-large;
		width: var(--title-ch-width);
		padding: 0.25rem 0.5rem;
	}

	#songArtist {
		text-align: center;
		border: none;
		background-color: var(--background-color);
		color: var(--white);
		border-radius: 5px;
		font-size: large;
		padding: 0.25rem 0.5rem;
		width: var(--author-ch-width);
	}

	.modal {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: hidden; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}
	.modal-content {
		text-align: center;
		background-color: var(--dark1);
		color: var(--white);
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid var(--dark1);
		width: 60%; /* Could be more or less, depending on screen size */
	}
</style>
