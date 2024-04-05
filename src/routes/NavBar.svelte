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
	loginCode.subscribe((v) => {
		let str = $loginCode.toString();
		if (str.length > 6) {
			loginCode.set(parseInt(str.slice(0, 6)));
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
		<h1 id="profileText" style="--color: {color.white}">
			{$emailAddress.length ? $emailAddress[0].toUpperCase() : "?"}
		</h1>
	</button>
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
			<button id="email-submit-button" on:click={sendEmail}
				>Continue</button
			>
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
					bind:value={$loginCode}
				/>
			</label>
			<button
				on:click={verifyLogin}
				disabled={$loginCode.toString().length != 6}>Continue</button
			>
		</div>
	</div>
</div>

<div id="acount-info-popup" class="modal">
	<div class="modal-content">
		<button on:click={closeAccountInfoModal} class="close">&times;</button>
		<div class="column">
			<h1>Personal Information</h1>
			<label for="">
				<p>Email Address: {$emailAddress}</p>
				<p>Songs Created: {$allSongs.length}</p>
			</label>
			<button on:click={logout}>Log Out</button>
		</div>
	</div>
</div>

<style>
	.column {
		/* display: flex;
		flex-direction: column; */
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
		text-align: center;
		background-color: var(--dark1);
		color: var(--white);
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
		/* top: 15%; */
		min-width: 160px;

	}

	#presentButton {
		background-color: var(--action);
		border: none;
		display: flex;
		width: fit-content;
		min-width: 160px;
		
		height: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		/* align-content: left; */
		border-radius: 10px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#presentButton:hover {
  		background-color: skyblue; /* Change background color on hover */
  		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
	}

	#presentButtonContainer :active {
		background-color: #01AE35;
		box-shadow: 0 3px #666;
		transform: translateY(4px);
	}





	#presentButtonContainer {
		position: fixed;
		top: 3%;
		right: 260px;
		display: flex;
		align-content: center;
		align-content: right;
	}

	#exportButtonContainer {
		position: fixed;
		top: 3%;
		/* right: -56%; */
		right: 80px;
		display: flex;
		flex-direction: row;
		align-content: right;
		justify-content: center;

		
	}

	#exportButton {
		background-color: var(--action);
		border: none;
		min-width: 160px;
		
		width: fit-content;
		height: fit-content;
		display: flex;
		/* align-content: center; */
		justify-content: center;
		align-items: center;


		border-radius: 10px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);

	}

	#exportButton:hover {
  		background-color: skyblue; /* Change background color on hover */
  		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Add shadow on hover */
	}

	#exportButtonContainer :active {
		background-color: #01AE35;
		box-shadow: 0 3px #666;
		transform: translateY(4px);
	}



	#profileContainer {
		position: fixed;
		top: 3.5%;
		right: 15px
		/* right: 5%; */
		/* left: 56.5%; */
		/* align-content: right; */
	}

	#profileButton {
		border-radius: 100px;
		width: 50px;
		height: 50px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
		background-color: var(--primary);
		border: none;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#profileText {
		color: var(--color);
	}
	#email-address {
		width: 30ch;
	}

	/* https://stackoverflow.com/questions/41698357/how-to-partition-input-field-to-appear-as-separate-input-fields-on-screen */
	/* #verification-code {
		padding-left: 15px;
		letter-spacing: 42px;
		border: 0;
		background-image: linear-gradient(
			to left,
			black 70%,
			rgba(255, 255, 255, 0) 0%
		);
		background-position: bottom;
		background-size: 50px 1px;
		background-repeat: repeat-x;
		background-position-x: 35px;
		width: 220px;
		outline: none;
	} */

	@media (max-width: 700px) {
		#exportButtonContainer{
			width: fit-content;;
			min-width: 80px;
	
		}

		#exportButton{
			width: fit-content;;
			min-width: 80px;

		}

		#exportButtonText {
			font-size: 1em;
			padding-right: 8px;
		}

		#presentButtonContainer{
			width: fit-content;
			min-width: 80px;
			right: 180px
	
		}

		#presentButton{
			width: fit-content;
			min-width: 80px;
			height: 40px;
			
		}

		#presentButtonText {
			font-size: 1em;
			padding-right: 8px;
		}

		.material-symbols-rounded{
			font-size: 10px
		}


	}
</style>