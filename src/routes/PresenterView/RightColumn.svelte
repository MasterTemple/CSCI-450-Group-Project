<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import SlidePreview from "./SlidePreview.svelte";
    import { backgroundColor,
             lyricsBySlide,
             currentSlideIndex } from "../stores";
    import Slides from "./Slides.svelte";

    const lyrics = writable([]);
    let nextSlideIndex = writable(0);

    currentSlideIndex.subscribe((newIndex) => {
		if ($currentSlideIndex < 0) return;
		if (!$lyricsBySlide[newIndex]) return;
        nextSlideIndex = newIndex + 1;
        lyrics.set($lyricsBySlide[nextSlideIndex]);
	});

    onMount(() => {
		
    });


</script>

<div id="previewStack">
    <div id="nextSlidePreview" style="background-color: {$backgroundColor}">
        <Slides lyrics = {lyrics}/>
    </div>
    <div id="allSlides">
        <SlidePreview/>
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