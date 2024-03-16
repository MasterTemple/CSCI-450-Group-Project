<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { min } from "../functions.js";
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

<div class="column">
	{#each { length: 3 } as _, i}
		<div class="row">
			{#each { length: 3 } as _, j}
				<div class="slides-and-index">
					<button
						class="slide-outline"
						class:current-slide={3 * i + j ==
							$currentSlideIndex - baseIndex}
						class:next-slide={3 * i + j ==
							$currentSlideIndex - baseIndex + 1}
						on:click={currentSlideIndex.set(
							min(
								baseIndex + 3 * i + j,
								$lyricsBySlide.length - 1,
							),
						)}
					>
						<Slides
							lyrics={$lyricsBySlide?.[baseIndex + 3 * i + j]}
						/>
					</button>
					<p>{baseIndex + 3 * i + j + 1}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.slides-and-index {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}
	.slides-and-index > p {
		text-align: center;
		margin: 0;
		padding: 0;
		padding-top: 4%;
	}
	.column {
		display: flex;
		flex-direction: column;
		padding: 10% 0 0 0;
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 1% 0 1% 0;
	}
	.slide-outline {
		border: 4px solid black;
		border-radius: 8%;
		margin: 0;
		padding: 0;
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
