<script>
	import { color } from "../stores.js";

	//Send user back to editor page when ESC key is pressed
	//window.addEventListener("keyup", function(e){ if(e.keyCode == 27) this.window.location.assign("../");}, false);
</script>

<a href=".././">
	<button id="backButton" style="--color: {color.darkBlue}">Back</button>
</a>

<button id="switchSong" style="--color: {color.darkBlue}">Switch Song</button>

<div id="songSlideStack">
	<div id="songInfo">
		<div id="songTitle" style="--color: {color.darkBlue}">
			<p>Song Title</p>
		</div>
		<div id="songArtist" style="--color: {color.darkBlue}">
			<p>Song Artist</p>
		</div>
	</div>

	<div id="currentSlide"></div>
</div>

<style>
	#backButton {
		position: absolute;
		left: 0;
		top: 0;
		margin: 5px;
		border-radius: 10px;
		height: 50px;
		width: 150px;
		background-color: var(--color);
		color: white;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#switchSong {
		position: absolute;
		left: 0;
		bottom: 0;
		margin: 5px;
		border-radius: 10px;
		height: 50px;
		width: 150px;
		background-color: var(--color);
		color: white;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#songSlideStack {
		display: flex;
		flex-direction: column;
		margin: auto;
		text-align: center;
	}

	#songInfo {
		margin: auto;
		margin-top: -10vh;
		padding: 10px;
	}

	#songTitle {
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		height: 40px;
		width: 150px;
		text-wrap: balance;
		font-size: larger;
	}

	#songArtist {
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		height: 40px;
		width: 130px;
		text-wrap: balance;
		font-size: larger;
		margin: auto;
	}

	#currentSlide {
		border: 4px solid darkgreen;
		border-radius: 3%;
		height: 30vw;
		width: 50vw;
		padding: 10px;
		margin: auto;
		background-color: lightblue;
	}
</style>
