<script>
    import { color } from "./stores";

    export let songName;
    export let songDate;
</script>

<button id="savedSongButton">
    <button id="image" style="--color: {color.lightPurple}"> </button>
    <div id="subText">
        <p id="songTitle">{songName}</p>
        <p id="dateCreated">{songDate}</p>
    </div>
    
</button>

<style>

#savedSongButton {
    border: none;
    background-color: transparent;
}

#image {
    background-color: var(--color);
    width: 200px;
    height: 120px;
    position: relative;
    top: 20px;
    border: none;
    border-radius: 10px;
}

#songTitle {
    font-size: medium;
    position: relative;
    top: 10px;
}

#dateCreated {
    font-size: smaller;
    position: relative;
    top: -10px;
}

#subText {
    display: flex;
    flex-direction: column;
    align-items: start;
}

</style>