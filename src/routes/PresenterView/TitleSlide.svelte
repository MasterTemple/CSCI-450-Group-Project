<script>
	import {
		backgroundColor,
		fontFamily,
		fontSize,
		includeTitleSlide,
		textColor,
        title,
		author
	} from "../stores.js";

	export let fontSizeOverride;

</script>

<!-- style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size:{$fontSize}" -->
<div id="slide">
	<div id="lyrics">
			<p
				style="color: {$textColor}; font-family: {$fontFamily}; font-size: {fontSizeOverride
					? fontSizeOverride * 1.25
					: $fontSize * 2}px;"
			>
				{$title}
			</p>
			<p
				style="color: {$textColor}; font-family: {$fontFamily}; font-size: {fontSizeOverride
					? fontSizeOverride
					: $fontSize}px;"
			>
				{$author}
			</p>
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
		height: 97%; 
		max-height: 100px;
		min-height: 140px;
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
		overflow: visible;
	}
	#lyrics,
	p {
		overflow: visible;
	}
</style>
