<script>
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import { req } from "./db";
	import { setWindowFullscreen } from "./functions";
	import {
		allSongs,
		authToken,
		author,
		color,
		currentSong,
		currentSongId,
		displayPresenterView,
		displaySingleAudienceView,
		emailAddress,
		lyricsBySlide,
		title,
		fontFamily,
	} from "./stores";

	const loginCode = writable("");
	const loginCodeValue = writable("");
	loginCodeValue.subscribe((v) => {
		let str = v?.toString();
		if (str?.length > 6) {
			loginCodeValue.set(parseInt(str.slice(0, 6)));
		}
		if (str?.match(/^\d+$/g)) {
			loginCode.set(str);
		}
	});

	async function exportPowerpoint() {
		const res = await req("export", $currentSong, $authToken, true);
		const blob = await res.blob();
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		let filename = "";
		if ($title.length > 0) filename = $title;
		else filename = $lyricsBySlide[0][0];
		if ($author.length > 0) filename = `${filename} - ${$author}`;

		console.log({ $title, $author, filename });
		a.download = filename + ".pptx";
		document.body.appendChild(a);
		a.click();
		a.remove();
	}

	async function sendEmail() {
		closeEmailModal();
		openVerificationModal();
		const res = await req(
			"send_verification_code",
			{ emailAddress: $emailAddress },
			$authToken,
		);
		console.log({ res });
		localStorage.setItem("emailAddress", $emailAddress);
		// document.getElementById("email-submit-button").disabled = true;
	}

	async function verifyLogin() {
		const res = await req(
			"verify_login",
			{ loginCode: $loginCode, emailAddress: $emailAddress },
			$authToken,
		);
		console.log({ res });
		authToken.set(res["authToken"]);
		localStorage.setItem("authToken", $authToken);
		// reload
		window.location.href = "/";
	}

	let enter_email_popup;
	let verification_input_popup;
	let account_info_popup;
	onMount(() => {
		// const headingElement = document.querySelector('h1');
		enter_email_popup = document.getElementById("enter-email-popup");
		verification_input_popup = document.getElementById(
			"enter-verification-code-popup",
		);
		account_info_popup = document.getElementById("acount-info-popup");
	});

	function openEmailModal() {
		enter_email_popup.style.display = "block";
	}
	function closeEmailModal() {
		enter_email_popup.style.display = "none";
	}

	function openVerificationModal() {
		verification_input_popup.style.display = "block";
	}
	function closeVerificationModal() {
		verification_input_popup.style.display = "none";
	}

	function logout() {
		localStorage.clear();
		window.location.href = "/";
	}

	function openAccountInfoModal() {
		account_info_popup.style.display = "block";
	}
	function closeAccountInfoModal() {
		account_info_popup.style.display = "none";
	}

	function present() {
		// save changes before presenting
		localStorage.setItem("currentSong", JSON.stringify($currentSong));
		allSongs.update((songs) => {
			const index = songs.findIndex((s) => s.songId == $currentSongId);
			songs[index] = $currentSong;
			localStorage.setItem("allSongs", JSON.stringify(songs));
			return songs;
		});

		// if user has 1 screen, make the audience view their current screen
		if (!window.screen.isExtended) {
			// window.open("./AudienceView");
			setWindowFullscreen(document);
			displaySingleAudienceView.set(true);
			// window.location.href = "./AudienceView";
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
			setWindowFullscreen(document);
			displayPresenterView.set(true);
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
	<h1 id="lolTitle">Lyric of Lyrics</h1>
</div>

<div id="top-left-button-container">
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
		<button
			id="exportButton"
			style="--color: {color.darkPurple}"
			on:click={exportPowerpoint}
		>
			<span
				class="material-symbols-rounded"
				style="font-variation-settings: 'FILL' 1; font-size: 35px"
				>download</span
			>
			<h1 id="exportButtonText">Export</h1>
		</button>
	</div>

	<div id="profileContainer">
		<button
			id="profileButton"
			on:click={$authToken.length ? openAccountInfoModal : openEmailModal}
		>
			<h1 id="profileText">
				{$emailAddress.length ? $emailAddress[0].toUpperCase() : "?"}
			</h1>
		</button>
	</div>
</div>

<div id="enter-email-popup" class="modal">
	<div class="modal-content">
		<button on:click={closeEmailModal} class="close">&times;</button>
		<!-- <div class="modal-center"> -->
		<div class="column">
			<h1>Login/Signup</h1>
			<div class="row">
				<p>Enter email address:</p>
				<input
					type="email"
					name=""
					id="email-address"
					bind:value={$emailAddress}
				/>
			</div>
			<button id="email-submit-button" on:click={sendEmail}>Continue</button>
			<!-- </div> -->
		</div>
	</div>
</div>

<div id="enter-verification-code-popup" class="modal">
	<div class="modal-content">
		<button on:click={closeVerificationModal} class="close">&times;</button>
		<div class="column">
			<h1>Login/Signup</h1>
			<label for="">
				<p>Enter verification code:</p>
				<input
					type="number"
					name=""
					maxlength="6"
					id="verification-code"
					bind:value={$loginCodeValue}
				/>
			</label>
			<button on:click={verifyLogin} disabled={$loginCode.length != 6}
				>Continue</button
			>
		</div>
	</div>
</div>

<div id="acount-info-popup" class="modal">
	<div class="modal-content">
		<button on:click={closeAccountInfoModal} class="close">&times;</button>
		<div class="column">
			<h1 id="personal">Personal Information</h1>
			<label for="">
				<p>Email Address: {$emailAddress}</p>
				<p>Songs Created: {$allSongs.length}</p>
			</label>
			<button id="logout" on:click={logout}>Log Out</button>
		</div>
	</div>
</div>

<style>
	.row {
		display: flex;
		flex-direction: row;
	}
	.column {
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.modal {
		display: none; /* Hidden by default */
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.6); /* Black w/ opacity */
		font-family: var(--font-family);
		text-align: center;
		justify-content: center;
		align-items: center;
	}
	.modal-content {
		background-color: var(--dark0);
		color: var(--white);
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 2px solid var(--dark0);
		width: 40vw; /* Could be more or less, depending on screen size */
		height: 40vh;
		border-radius: 1rem;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.modal-content > div > h1 {
		margin-top: 8rem;
		font-size: xx-large;
	}


	.modal-content input {
		all: unset;
		color: var(--white);
		background-color: var(--black);
		border-radius: calc(2 * var(--border-radius));
		border: 2px solid var(--dark2);
		margin: 0.5rem;
		padding: 0.5rem;
		margin-left: 0.5rem;
		min-width: 20ch;
	}


	.modal-content div button {
		border: none;
		border-radius: 10px;
		height: 3vh;
		width: 18ch;
		color: var(--white);
		background-color: var(--dark1);
		border: 2px solid var(--dark5);
		border-radius: calc(2 * var(--border-radius));
		margin: 1rem;
		padding: 1rem;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
	}

	.modal-content div button:hover {
		border-color: var(--primary);
		background-color: var(--black);
	}

	.modal-content div button:active {
		background-color: var(--primary);
	}

	.modal-content div button:disabled {
		color: var(--dark4)
	}

	.modal-center {
		width: 100%;
		height: 100%;
		align-content: center;
	}

	.close {
		color: var(--white);
		float: right;
		font-size: 28px;
		font-weight: bold;
		background-color: transparent;
		border: none;
	}
	.close:hover {
		color: var(--primary);
	}
	#logoContainer {
		position: fixed;
		display: flex;
		top: 2.5%;
		/* left: 80 vw; */
		left: 1.5%;
	}

	#logo {
		width: 60px;
		height: 60px;
	}

	#lolTitle {
		color: var(--white);
		left: 8%;
		position: fixed;
		top: 2%;
		font-family: var(--font-family);
		width: 15ch;
	}

	#top-left-button-container {
		position: fixed;
		top: 3%;
		right: 3%;
		display: flex;
		flex-direction: row;
	}
	#top-left-button-container > div {
		margin-left: 1rem;
	}

	#profileButton,
	#presentButton,
	#exportButton {
		width: fit-content;
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		color: var(--white);
		text-align: center;
		border: 1.5px solid var(--tertiary);
		background-color: var(--dark0);
		border-radius: 10px;
		padding: 0 1.5rem;
	}

	#profileButton:hover,
	#presentButton:hover,
	#exportButton:hover {
		color: var(--primary); /* Change background color on hover */
		background-color: var(--black);
		border-color: var(--secondary);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
	}

	#profileButton {
		border-radius: 100rem;
	}

	#profileText {
		color: var(--color);
	}
	#email-address {
		width: 30ch;
	}

	@media (max-width: 700px) {
		#exportButtonContainer {
			width: fit-content;
			min-width: 80px;
		}

		#exportButton {
			width: fit-content;
			min-width: 80px;
		}

		#exportButtonText {
			font-size: 1em;
			padding-right: 8px;
		}

		/* #presentButtonContainer { */
		/* 	width: fit-content; */
		/* 	min-width: 80px; */
		/* 	right: 180px; */
		/* } */

		/* #presentButton { */
		/* 	width: fit-content; */
		/* 	min-width: 80px; */
		/* 	height: 40px; */
		/* } */

		/* #presentButtonText { */
		/* 	font-size: 1em; */
		/* 	padding-right: 8px; */
		/* } */

		.material-symbols-rounded {
			font-size: 10px;
		}
	}

	/* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type="number"] {
		-moz-appearance: textfield;
	}

</style>
