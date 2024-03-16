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
				<div
					class="slide-outline"
					class:current-slide={3 * i + j ==
						$currentSlideIndex - baseIndex}
					class:next-slide={3 * i + j ==
						$currentSlideIndex - baseIndex + 1}
				>
					<Slides lyrics={$lyricsBySlide?.[baseIndex + 3 * i + j]} />
				</div>
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
	.slide-outline {
		border: 4px solid black;
		border-radius: 8%;
		align-items: center;
		justify-content: center;
		text-align: center;
		display: flex;
		font-size: x-small !important;
	}
	.current-slide {
		border-color: green;
	}
	.next-slide {
		border-color: orange;
	}
</style>
