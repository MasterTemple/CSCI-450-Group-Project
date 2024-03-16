<script>
	import {
		backgroundColor,
		fontFamily,
		fontSize,
		textColor,
	} from "../stores.js";

	// export let lyrics = writable([]);
	export let lyrics = undefined;
	const EMPTY_SLIDE_CONTENTS = ["[EMPTY SLIDE]"];
	// onMount(() => {
	// 	if (lyrics == undefined) lyrics = EMPTY_SLIDE_CONTENTS;
	// });
	$: safeLyrics = lyrics || EMPTY_SLIDE_CONTENTS;
</script>

<div
	id="slide"
	style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size:{$fontSize}"
>
	<div id="lyrics">
		{#each safeLyrics as line}
			<p>{line}</p>
		{/each}
	</div>
</div>

<style>
	#slide {
		background-color: lightblue;
		height: 13vh;
		width: 8vw;
		border: 3px solid black;
		border-radius: 5%;
		margin: auto;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		cursor: pointer;
		align-items: center;
		justify-content: center;
		display: flex;
	}
</style>
