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
	} from "./stores";

	const loginCode = writable("");
	const loginCodeValue = writable("");
	loginCodeValue.subscribe((v) => {
		let str = v?.toString();
		if (str?.length > 6) {
			loginCodeValue.set(parseInt(str.slice(0, 6)));
		}
		if(str?.match(/^\d+$/g)) {
			loginCode.set(str)
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
		document.getElementById("email-submit-button").disabled = true;
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
				style="font-variation-settings: 'FILL' 1; font-size: 35px">download</span
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
		<div class="column">
			<h1>Login/Signup</h1>
			<label for="">
				<p>Enter email address:</p>
				<input
					type="email"
					name=""
					id="email-address"
					bind:value={$emailAddress}
				/>
			</label>
			<button id="email-submit-button" on:click={sendEmail}>Continue</button>
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
			<button
				on:click={verifyLogin}
				disabled={$loginCode.length != 6}>Continue</button
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
	.column {
		/* display: flex;
		flex-direction: column; */
		/* float:left; */
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
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}
	.modal-content {
		text-align: left;
		background-color: var(--dark1);
		color: var(--white);
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 40%; /* Could be more or less, depending on screen size */
	}
	#logout {
		border: none;
	}
	#logout:hover {
		background-color: #cdcccc;
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
		color: #cdcccc;
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
</style>
