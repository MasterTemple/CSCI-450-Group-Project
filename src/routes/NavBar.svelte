<script>
	import { setWindowFullscreen } from "./functions";
	import { color, lyricsBySlide } from "./stores";
	import { onMount } from 'svelte';

	// let btn = document.getElementById("profileButton");
	// btn.onclick = function() {
  	// 	modal.style.display = "block";
	// }

	// onMount(() => {
	// 	document
	// 		.getElementById("presentButton")
	// 		.addEventListener("click", (e) => {
	// 			present();
	// 		});
	// });
	let popup;
	onMount(() => {
    	// const headingElement = document.querySelector('h1');
		popup = document.getElementById("loginPopUp");


  	});
	function openModal(){
		console.log("hello")

		popup.style.display = "block";
	}
	function close() {
  		popup.style.display = "none";
	}



	function present() {
		// if user has 1 screen, make the audience view their current screen
		if (!window.screen.isExtended) {
			// window.open("./AudienceView");
			setWindowFullscreen(document);
			window.location.href = "./AudienceView";
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
			localStorage.setItem(
				"lyricsBySlide",
				JSON.stringify($lyricsBySlide),
			);
			window.location.href = "/PresenterView";
		}
	}


	// window.onclick = function(event) {
  	// 	if (event.target == modal) {
    // 		modal.style.display = "none";
  	// 	}
	// }
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
	<button id="profileButton" on:click={openModal} style="--color: {color.darkBlue}">
		<h1 id="profileText" style="--color: {color.white}">E</h1>
	</button>
</div>
<div id="loginPopUp"  class="modal">
	  <div class="modal-content">
		<button on:click={close} class="close">&times;</button>
		<p>Some text in the Modal..</p>
	  </div>
</div>

<style>
	.modal {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0,0,0); /* Fallback color */
		background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	}
	.modal-content {
		background-color: #fefefe;
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Could be more or less, depending on screen size */
	}
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}
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
