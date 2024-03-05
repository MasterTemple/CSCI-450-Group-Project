<script>
    import { color } from "./stores";
</script>

<!--button id="savedSongButton">
    <button id="image" style="--color: {color.lightPurple}"> </button>
    <p id="songTitle">Song Title</p>
    <p id="dateCreated">Date Created</p>
</button-->

<button><p>Sample</p></button>

<style>

#savedSongButton {
    border: none;
    background-color: transparent;
}

#image {
    background-color: var(--color);
    width: 90%;
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
    top: 0px;
}

</style>