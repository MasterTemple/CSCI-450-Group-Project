<script>
	import Slide from "./PresenterView/Slides.svelte";
	import { req } from "./db.js";
	import {
		allSongs,
		authToken,
		currentSong,
		currentSongId,
		deleteSongFromLocalList,
		setCurrrentSong,
		workIsUnsaved,
	} from "./stores";
	export let songTitle;
	export let songId;
	export let songAuthor;
	export let dateCreated;
	export let firstSlideLyrics;
	// const thisSong = $allSongs.find((s) => s.songId == songId);
	// let title = thisSong.title;
	// let date = new Date(parseInt(thisSong["songId"])).toDateString();

	async function deleteSong() {
		// delete locally for update and so we dont save it again on server
		deleteSongFromLocalList(songId);
		// delete from server
		let data = {};
		data["songId"] = songId;
		const res = await req("delete", data, $authToken);
	}

	async function loadSongFromId() {
		let newSong = $allSongs.find((s) => s["songId"] == songId);
		console.log({ newSong });
		// save current song
		if ($workIsUnsaved) {
			// save locally
			localStorage.setItem("currentSong", JSON.stringify($currentSong));
			allSongs.update((songs) => {
				const index = songs.findIndex((s) => s.songId == $currentSongId);
				songs[index] = $currentSong;
				localStorage.setItem("allSongs", JSON.stringify(songs));
				return songs;
			});
			// save to server
			req("save", $currentSong, $authToken);
			// const json = await req("save", $currentSong, $authToken);
			// console.log({ json });
		}
		//
		localStorage.setItem("currentSong", JSON.stringify(newSong));
		currentSongId.set(songId);
		setCurrrentSong(newSong);
	}
</script>

<div class="saved-song column">
	<button id="image" on:click={loadSongFromId}>
		<Slide lyrics={firstSlideLyrics} fontSizeOverride={12} />
	</button>
	<div class="song-info">
		<p id="songTitle">{songTitle}</p>
		<div class="row">
			<div class="column">
				<p class="small-info">
					Author: {songAuthor} <br />
					Date: {dateCreated.toLocaleDateString()}
				</p>
			</div>
			<button class="delete-icon" on:click={deleteSong}>
				<img src="./trash.svg" alt="" srcset="" />
			</button>
		</div>
	</div>
</div>

<style>
	.song-info {
		width: 100%;
		margin-top: 20px;
		background-color: var(--dark1);
		border-radius: var(--border-radius);
	}
	.delete-icon {
		/* height: 4ch; */
		/* width: 4ch; */
		padding: 0.25rem;
		margin: 0.25rem;
		display: flex;
		justify-content: center;
		background-color: red;
		border: none;
		border-radius: 5px;
	}
	p {
		margin: 0.25rem;
		padding: 0;
	}
	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 220px;
		height: fit-content;
		min-height: 70px;
	}
	.saved-song {
		display: flex;
		font-family: var(--font-family);
		justify-content: center;
		align-items: center;
		width: 100%;
		/* max-height: 100px; */
	}
	#image {
		background-color: var(--background-color);
		width: 100%;
		position: relative;
		/* left: 3%; */
		top: 20px;
		border: none;
		border-radius: 10px;
		overflow: hidden;
	}

	#songTitle {
		font-size: medium;
		position: relative;
		left: 3%;
		top: 10px;
	}

	.small-info {
		font-size: smaller;
		/* position: relative; */
		width: 21ch;
		text-overflow: ellipsis;
		/* left: 3%;
		top: 0px; */
	}
</style>
