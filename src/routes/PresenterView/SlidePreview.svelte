<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { currentSlideIndex, lyricsBySlide } from "../stores.js";
	import Slides from "./Slides.svelte";

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

	$: baseIndex = 0;
	currentSlideIndex.subscribe((idx) => {
		if (idx >= 4) {
			baseIndex = $currentSlideIndex - 4;
		} else {
			// baseIndex = -1 * idx;
			baseIndex = $currentSlideIndex - idx;
		}
	});
</script>

<div id="column">
	{#each { length: 3 } as _, i}
		<div class="row">
			{#each { length: 3 } as _, j}
				<p>{baseIndex + 3 * i + j}</p>
				<Slides lyrics={$lyricsBySlide?.[baseIndex + 3 * i + j]} />
			{/each}
		</div>
	{/each}
</div>

<style>
	#column {
		display: flex;
		flex-direction: column;
		padding: 10% 0 0 0;
	}

	.row {
		display: flex;
		flex-direction: row;
		padding: 3% 0 3% 0;
	}
</style>
