<script>
	import Slide from "./PresenterView/Slides.svelte";
    import { EMPTY_SONG_AUTHOR, EMPTY_SONG_TITLE } from "./constants";
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
		<p id="song-title" class="textborder">{songTitle || EMPTY_SONG_TITLE}</p>
		<div class="row">
			<div class="column">
				<p class="small-info textborder">
					<!-- Author: {songAuthor} <br /> -->
					<!-- Date: {dateCreated.toLocaleDateString()} -->
					<span class="author">{songAuthor || EMPTY_SONG_AUTHOR}</span> <br />
					{dateCreated.toLocaleDateString()}
				</p>
			</div>
			<button class="delete-icon" on:click={deleteSong}>
				<!-- putting svg here lets me use css on it -->
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#626569" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
			</button>
		</div>
	</div>

</div>

<style>
	.song-info {
		width: 95%;
		padding: 0.2rem;
		/* margin-top: 20px; */
		background-color: var(--dark1);
		border-radius: calc(var(--border-radius) * 2);
		border: 2px solid var(--dark2);
		margin-bottom: 1rem;
	}

	#song-title {
		font-size: medium;
		position: relative;
		text-align: center;
		margin: 0;
	}

	.small-info {
		font-size: smaller;
		/* position: relative; */
		min-width: 20ch;
		min-height: 100%;
		/* overflow-x: hidden; */
		/* text-overflow: ellipsis; */
		text-align: start;
		/* min-width: 80%; */
		align-items: start;
		margin: 0;
		margin-left: 0.5rem;
	}

	.delete-icon {
		/* height: 4ch; */
		/* min-width: 100%; */
		padding: 0.25rem;
		margin: 0.25rem;
		margin-right: 0.5rem;
		display: flex;
		justify-content: center;
		background-color: var(--dark0);
		border: none;
		border-radius: 5px;
		border: 2px solid var(--dark3);
	}
	.delete-icon > svg {
		/* stroke: var(--dark5); */
		stroke: color-mix(in srgb, var(--dark5) 70%, var(--warning));
	}
	.delete-icon:hover {
		border-color: var(--warning);
	}
	.delete-icon:hover > svg {
		stroke: var(--warning);
	}
	p {
		/* margin: 0.25rem; */
		padding: 0;
	}
	.column {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: start;
		text-align: start;
		width: 100%;
	}
	.row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: fit-content;
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
		/* top: 1rem; */
		border: none;
		border-radius: 10px;
		overflow: hidden;
	}

	div.row > div > p {
		width: 70%;
	}

	.row > button {
		width: 30%;
	}

	span.author {
		font-style: italic;
	}

	.textborder {
		padding: 0;
		background-color: var(--dark0);
		padding: 0.25rem;
		border-radius: 10px;
		border: 2px solid var(--dark3);
	}
</style>
