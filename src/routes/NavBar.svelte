<script>
	import { saveLyricData } from "./functions";
	import { color, lyricsBySlide } from "./stores";

	// onMount(() => {
	// 	document
	// 		.getElementById("presentButton")
	// 		.addEventListener("click", (e) => {
	// 			present();
	// 		});
	// });

	function present() {
		// if user has 1 screen, make the audience view their current screen
		if (!window.screen.isExtended) {
			// window.open("./AudienceView");
			window.location.href = "./ChildAudienceView";
		}
		// otherwise make the current screen the presenter view & the child window is the audience view
		else {
			// open a new window
			const child = window.open(
				"ChildAudienceView",
				"",
				"width=720,height=480",
			);
			child.focus();
			// set current window
			// window.open("PresenterView");
			// window.location.href += "PresenterView";
			// document.getElementById("presenterViewLink").click();
			saveLyricData($lyricsBySlide);
			window.location.href = "/PresenterView";
		}
	}
</script>

<link
	href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20,100,1,200"
	rel="stylesheet"
/>

<div id="logoContainer">
	<img
		src="logo.png"
		id="logo"
		alt="Lyric of Lyrics Logo: A trebble cleffe surrounded by dots and dashes"
	/>
	<h1 id="lolTitle" style="--color: {color.darkBlue}">Lyric of Lyrics</h1>
</div>

<div id="presentButtonContainer">
	<button
		id="presentButton"
		href="/PresenterView"
		style="--color: {color.darkPurple}"
		on:click={present}
	>
		<span
			class="material-symbols-rounded"
			style="font-variation-settings: 'FILL' 1; font-size: 50px"
			>play_arrow</span
		>
		<h1 id="presentButtonText">Present</h1>
	</button>
</div>

<div id="exportButtonContainer">
	<button id="exportButton" style="--color: {color.darkPurple}">
		<span
			class="material-symbols-rounded"
			style="font-variation-settings: 'FILL' 1; font-size: 30px"
			>download</span
		>
		<h1 id="exportButtonText">Export</h1>
	</button>
</div>

<div id="profileContainer">
	<button id="profileButton" style="--color: {color.darkBlue}">
		<h1 id="profileText" style="--color: {color.white}">E</h1>
	</button>
</div>

<style>
	#logoContainer {
		position: relative;
		display: flex;
		top: 0%;
		left: 80 vw;
	}

	#logo {
		width: 100px;
		height: 100px;
	}

	#lolTitle {
		color: var(--color);
		left: 0%;
		position: relative;
		top: 15%;
	}

	#presentButton {
		background-color: var(--color);
		border: none;
		display: flex;
		width: fit-content;
		height: fit-content;
		align-content: center;
		border-radius: 10px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#presentButtonContainer {
		position: relative;
		top: 20%;
		left: 55%;
		display: flex;
		align-content: center;
	}

	#exportButtonContainer {
		position: relative;
		top: 20%;
		left: 56%;
		display: flex;
		align-content: center;
	}

	#exportButton {
		background-color: var(--color);
		border: none;
		display: flex;
		width: fit-content;
		height: fit-content;
		align-content: center;
		border-radius: 10px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#profileContainer {
		position: relative;
		top: 20%;
		left: 62%;
		align-content: center;
	}

	#profileButton {
		border-radius: 100px;
		width: 50px;
		height: 50px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		background-color: var(--color);
		border: none;
	}

	#profileText {
		color: var(--color);
	}
</style>
