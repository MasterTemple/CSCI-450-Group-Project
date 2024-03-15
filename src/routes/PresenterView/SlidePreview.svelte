<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { lyricsBySlide,
             currentSlideIndex } from '../stores.js';
    import Slides from './Slides.svelte';

    //Need to fix slide preview

    const lyrics = writable([]);

    currentSlideIndex.subscribe((newIndex) => {
		if ($currentSlideIndex < 0) return;
		if (!$lyricsBySlide[newIndex]) return;
		lyrics.set($lyricsBySlide[newIndex]);
	});

    onMount(() => {
        currentSlideIndex.set(-1);
		currentSlideIndex.set(0);
    });
</script>

<div id = "column">
    <div id="row">
        <Slides lyrics={lyrics}/>
        <Slides />
        <Slides />
    </div>
    <div id="row">
        <Slides />
        <Slides />
        <Slides />
    </div>
    <div id="row">
        <Slides/>
        <Slides/>
        <Slides/>
    </div>
</div>

<style>
    #column {
        display: flex;
        flex-direction: column;
        padding: 10% 0 0 0;
    }

    #row {
        display: flex;
        flex-direction: row;
        padding: 3% 0 3% 0;
    }
</style>