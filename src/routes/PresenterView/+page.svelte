<script>
	import { onMount } from "svelte";
	import { getLyricData, setWindowFullscreen } from "../functions";
	import { currentSlideIndex, lyricsBySlide } from "../stores";
	import LeftColumn from "./LeftColumn.svelte";
	import RightColumn from "./RightColumn.svelte";
	
	const bc = new BroadcastChannel("lyric_of_lyrics");

	bc.onmessage = (event) => {
		// console.log(event);
		if (event.data.msg == "goFullscreen") {
			setWindowFullscreen(document);
			currentSlideIndex.set(-1);
			currentSlideIndex.set(0);
		} else if (event.data.msg == "sendKey") {
			onKey(event.data.key);
		}
	};

	onMount(() => {
		//lyricsBySlide.set(getLyricData());

	});

</script>

<div id="row">
	<div id="LeftColumn">
		<LeftColumn />
	</div>
	<div id="RightColumn">
		<RightColumn />
	</div>
</div>

<style>
	#row {
		background-color: whitesmoke;
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	#LeftColumn {
		/*background-color: blue;*/
		height: 100%;
		width: 100vw;
		display: flex;
		align-items: center;
		vertical-align: top;
	}

	#RightColumn {
		/*background-color: beige;*/
		height: 100%;
		width: 50vw;
		position: relative;
		right: var(--loc);
		display: flex;
	}
</style>