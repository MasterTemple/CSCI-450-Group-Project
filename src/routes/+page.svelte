<script>
	import { onMount } from "svelte";
	import AudienceView from "./AudienceView/+page.svelte";
	import LyricEditor from "./LyricEditor.svelte";
	import NavBar from "./NavBar.svelte";
	import PresenterView from "./PresenterView/+page.svelte";
	import SavedSongList from "./SavedSongList.svelte";
	import Settings from "./Settings.svelte";
	import { EMPTY_SONG_CONTENTS } from "./constants.js";
	import { req } from "./db";
	import { convertLyricLinesToSlides } from "./functions";
	import {
		allSongs,
		authToken,
		backgroundColor,
		currentSong,
		currentSongId,
		displayPresenterView,
		displaySingleAudienceView,
		emailAddress,
		fontFamily,
		fontSize,
		lines,
		lyricsBySlide,
		rawClipboardContents,
		savedSongsIsOpen,
		setCurrrentSong,
		settingsIsOpen,
		textColor,
		workIsUnsaved,
	} from "./stores";

	onMount(async () => {
		// load cloud storage and sync with local storage
		emailAddress.set(localStorage.getItem("emailAddress") || "");
		authToken.set(localStorage.getItem("authToken") || "");
		currentSongId.set(localStorage.getItem("currentSongId"));
		currentSongId.subscribe((v) => {
			localStorage.setItem("currentSongId", v);
		});
		const allCloudSongs = await req("load", {}, $authToken);
		if (allCloudSongs.length > 0) {
			allCloudSongs.sort((a, b) => b.songId - a.songId);
			localStorage.setItem("allSongs", JSON.stringify(allCloudSongs));
			let thisSong = allCloudSongs.find(
				(s) => s.songId == $currentSongId,
			);
			if (!thisSong) thisSong = allCloudSongs[0];
			localStorage.setItem("currentSong", JSON.stringify(thisSong));
		}
		// load local storage
		let savedCurrentSong = JSON.parse(localStorage.getItem("currentSong"));
		allSongs.set(JSON.parse(localStorage.getItem("allSongs")) || []);
		console.log({ $allSongs });

		console.log({ savedCurrentSong });
		if (savedCurrentSong) {
			setCurrrentSong(savedCurrentSong);
		} else {
			rawClipboardContents.set(EMPTY_SONG_CONTENTS);
		}

		// keep track if work needs to be saved
		currentSong.subscribe((v) => workIsUnsaved.set(true));

		// save work if edited every n seconds
		const N = 1;
		setInterval(async () => {
			if ($workIsUnsaved) {
				workIsUnsaved.set(false);
				const data = JSON.stringify($currentSong);
				if (
					$lines?.length == 0 ||
					$rawClipboardContents == EMPTY_SONG_CONTENTS
				)
					return;

				// update current local storage
				localStorage.setItem("currentSong", data);

				// update all songs locally (memory and storage)
				allSongs.update((songs) => {
					const index = songs.findIndex(
						(s) => s.songId == $currentSongId,
					);
					songs[index] = $currentSong;
					localStorage.setItem("allSongs", JSON.stringify(songs));
					return songs;
				});

				// save to server
				const json = await req("save", $currentSong, $authToken);
				console.log({ json });

				workIsUnsaved.set(false);
			}
		}, N * 1000);

		// setInterval(async () => {
		// 	const allCloudSongs = await req("load", {}, $authToken);
		// 	if (allCloudSongs.length > 0) {
		// 		allCloudSongs.sort((a, b) => b.songId - a.songId);
		// 		localStorage.setItem("allSongs", JSON.stringify(allCloudSongs));
		// 		allSongs.set(allCloudSongs);
		// 	}
		// }, 1000);

		// YOU MUST WAIT UNTIL IT IS SET
		lines.subscribe((value) => {
			lyricsBySlide.set(convertLyricLinesToSlides(value));
			// setTimeout(() => console.log($lyricsBySlide), 100);
		});
	});
</script>

<div
	id="root-style"
	style="--background-color: {$backgroundColor};--text-color:{$textColor};--font-family:{$fontFamily};--font-size:{$fontSize}"
>
	{#if $displaySingleAudienceView}
		<AudienceView />
	{:else if $displayPresenterView}
		<PresenterView />
	{:else}
		<div id="everything">
			<nav id="navbar">
				<NavBar />
			</nav>
			<div id="content">
				<div
					id="saved"
				>
					<SavedSongList />
				</div>
				<div id="editor">
					{#key (displaySingleAudienceView, displayPresenterView)}
						<LyricEditor />
					{/key}
				</div>
				<div
					id="settings"
				>
					<Settings />
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	@import "./style.css";

	#everything {
		max-width: 100vw;
		max-height: 100vh;
		overflow-x: hidden;
		overflow-y: hidden;
	}
	/* :root {
    display: flex;
    flex-direction: row;
} */

	#navbar {
		/* position: fixed; */
		width: 100vw;
		height: 15vh;
		position: relative;
		display: flex;
		background-color: var(--dark1);
		/* background-color: pink;      <-- Uncomment to see outline */
	}

	#content {
		display: flex;
		flex-direction: row;
		height: 88vh;
		width: 100vw;
		background-color: var(--dark1);
		color: var(--white);
		/* background-color: orange; <-- Uncomment to see outline */
		overflow: hidden;
	}

	#saved {
		height: 80vh;
		width: 20vw;
		background-color: var(--dark0);
		color: var(--white);
		position: relative;
		left: var(--loc);
		transition: left 1s;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#editor {
		background-color: var(--dark1);
		height: 100%;
		width: 100vw;
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	#settings {
		background-color: var(--dark0);
		height: 80vh;
		width: 20vw;
		position: relative;
		right: var(--loc);
		transition: right 1s;
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
</style>
