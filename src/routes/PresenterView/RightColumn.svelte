<script>
	import { onMount } from "svelte";
	import {
		backgroundColor,
		currentSlideIndex,
		lyricsBySlide,
	} from "../stores";
	import SlidePreview from "./SlidePreview.svelte";
	import Slides from "./Slides.svelte";

	// let nextLyrics = [];
	// currentSlideIndex.subscribe((idx) => {
	// 	if ($currentSlideIndex + 1 < $lyricsBySlide.length)
	// 		nextLyrics = $lyricsBySlide[$currentSlideIndex + 1];
	// 	else nextLyrics = [EMPTY_SLIDE_CONTENTS];
	// });

	onMount(() => {});
</script>

<div id="previewStack">
	<div id="nextSlidePreview" style="background-color: {$backgroundColor}">
		<Slides lyrics={$lyricsBySlide?.[$currentSlideIndex + 1]} />
	</div>
	<div id="allSlides">
		<SlidePreview />
	</div>
</div>

<style>
	#previewStack {
		display: flex;
		flex-direction: column;
		margin-top: 5vh;
	}

	#nextSlidePreview {
		border: 4px solid darkgoldenrod;
		border-radius: 3%;
		height: 30vh;
		width: 30vw;
		background-color: lightblue;
		text-align: center;
	}
</style>
