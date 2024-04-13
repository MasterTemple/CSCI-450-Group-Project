<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { min } from "../functions.js";
	import {
		currentSlideIndex,
		includeTitleSlide,
		lyricsBySlide,
	} from "../stores.js";
	import Slides from "./Slides.svelte";
	import TitleSlide from "./TitleSlide.svelte";

	//Need to fix slide preview

	const lyrics = writable([]);

	currentSlideIndex.subscribe((newIndex) => {
		if ($includeTitleSlide) newIndex--;
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
						class:current-slide={3 * i + j == $currentSlideIndex - baseIndex}
						class:next-slide={3 * i + j == $currentSlideIndex - baseIndex + 1}
						on:click={currentSlideIndex.set(
							min(
								baseIndex + 3 * i + j,
								$lyricsBySlide.length + $includeTitleSlide - 1,
							),
						)}
					>
						<div class="slide-zoom">
							<div class="slide-preview">
								{#if $includeTitleSlide}
									{#if i == 0 && j == 0 && $currentSlideIndex < 5}
										<TitleSlide fontSizeOverride={10} />
									{:else}
										<Slides
											lyrics={$lyricsBySlide?.[baseIndex + 3 * i + j - 1]}
											fontSizeOverride={10}
										/>
									{/if}
								{:else}
									<Slides
										lyrics={$lyricsBySlide?.[baseIndex + 3 * i + j]}
										fontSizeOverride={10}
									/>
								{/if}
							</div>
						</div>
					</button>
					<p class="song-index">{baseIndex + 3 * i + j + 1}</p>
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	* {
		font-family: var(--font-family);
	}
	.song-index {
		color: var(--text-color);
	}
	.slide-preview {
		/* height: 4rem; */
	}
	.slides-and-index {
		display: flex;
		flex-direction: column;
		margin: 0.25rem;
		padding: 0;
		flex: 1;
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
		background-color: var(--background-color);
		color: var(--text-color);
		border: 4px solid black;
		border-radius: 8%;
		margin: 0;
		padding: 0;
		align-items: center;
		justify-content: center;
		text-align: center;
		display: flex;
		font-size: x-small !important;
		width: 30ch;
		height: 8rem;
		/* height: 13ch; */
		overflow: hidden;
	}
	.slide-outline:hover {
		border-color: var(--secondary);
	}
	.current-slide {
		border-color: var(--primary);
	}
	.next-slide {
		border-color: var(--accent);
	}
</style>
