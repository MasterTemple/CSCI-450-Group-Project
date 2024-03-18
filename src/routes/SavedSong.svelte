<script>
	import { req } from "./db.js";
	import {
		allSongs,
		authToken,
		color,
		currentSong,
		currentSongId,
		deleteSongFromLocalList,
		setCurrrentSong,
		workIsUnsaved,
	} from "./stores";
	export let songTitle;
	export let songId;
	export let dateCreated;
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
				const index = songs.findIndex(
					(s) => s.songId == $currentSongId,
				);
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

<div>
	<button
		id="image"
		style="--color: {color.lightPurple}"
		on:click={loadSongFromId}
	>
	</button>
	<p id="songTitle">{songTitle}</p>
	<p id="dateCreated">{dateCreated.toDateString()}</p>
	<button on:click={deleteSong}>Delete</button>
</div>

<style>
	#image {
		background-color: var(--color);
		width: 90%;
		height: 120px;
		position: relative;
		left: 3%;
		top: 20px;
		border: none;
		border-radius: 10px;
	}

	#songTitle {
		font-size: medium;
		position: relative;
		left: 3%;
		top: 10px;
	}

	#dateCreated {
		font-size: smaller;
		position: relative;
		left: 3%;
		top: 0px;
	}
</style>
