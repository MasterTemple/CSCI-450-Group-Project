<script>
    function escape() {

    }
</script>

<a href=".././">
    <button id="backButton" onkeydown="escape">Back</button>
</a>

<button id="switchSong">Switch Song</button>

<div id="currentSlide">

</div>

<style>
    #backButton {
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 10px;
        height: 50px;
        width: 150px;
        background-color: blue;
        color:white;
    }

    #switchSong {
        position: absolute;
        left:0;
        bottom: 0;
        margin: 5px;
        border-radius: 10px;
        height: 50px;
        width: 150px;
        background-color: blue;
        color:white;
    }

    #currentSlide {
        border: 2px solid black;
        border-radius: 3%;
        height: 50%;
        width: 60%;
        padding: 10px;
        margin: auto;
        background-color: white;
        }
</style>