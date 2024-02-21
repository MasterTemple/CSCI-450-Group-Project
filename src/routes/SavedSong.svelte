<script>
    import { color } from "./stores";
</script>

<div>
    <button id="image" style="--color: {color.lightPurple}"> </button>
    <p id="songTitle">Song Title</p>
    <p id="dateCreated">Date Created</p>
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