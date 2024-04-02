<script>
	import {
		backgroundColor,
		fontFamily,
		fontSize,
		textColor,
	} from "../stores.js";

	// export let lyrics = writable([]);
	export let lyrics = undefined;
	export let fontSizeOverride;
	const EMPTY_SLIDE_CONTENTS = ["[EMPTY SLIDE]"];
	// onMount(() => {
	// 	if (lyrics == undefined) lyrics = EMPTY_SLIDE_CONTENTS;
	// });
	$: safeLyrics = lyrics || EMPTY_SLIDE_CONTENTS;
</script>

<!-- style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size:{$fontSize}" -->
<div id="slide">
	<div id="lyrics">
		{#each safeLyrics as line}
			<p
				style="color: {$textColor}; font-family: {$fontFamily}; font-size: {fontSizeOverride
					? fontSizeOverride
					: $fontSize * 2}px;"
			>
				{line}
			</p>
		{/each}
	</div>
</div>

<style>
	p {
		text-align: center;
		min-width: max-content;
	}
	#slide {
		background-color: var(--background-color);
		color: var(--text-color);
		font-size: var(--font-size);
		font-family: var(--font-family);
		/* height: 13vh; */
		/* width: 8vw; */
		/* width: 40ch; */
		border: 3px solid var(--background-color);
		border-radius: 5%;
		margin: auto;
		/* box-shadow: */
		/* 	0 4px 8px 0 rgba(0, 0, 0, 0.2), */
		/* 	0 6px 20px 0 rgba(0, 0, 0, 0.19); */
		cursor: pointer;
		align-items: center;
		justify-content: center;
		display: flex;
		overflow: hidden;
	}
	#lyrics,
	p {
		overflow: visible;
	}
</style>
