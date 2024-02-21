<script>
    //window.addEventListener("keyup", function(e){ if(e.keyCode == 27) history.back();}, false);
</script>


<a href=".././">
    <button id="backButton">Back</button>
</a>


<button id="switchSong">Switch Song</button>

<div id = "songSlideStack">
    <div id="songInfo">
        <div id="songTitle">
            <p>Song Title</p>
        </div>
        <div id="songArtist">
            <p>Song Artist</p>
        </div>
    </div>


    <div id="currentSlide">


    </div>
</div>

<style>
    #backButton {
        position: absolute;
        left: 0;
        top: 0;
        margin: 5px;
        border-radius: 10px;
        height: 50px;
        width: 150px;
        background-color: darkgray;
    }


    #switchSong {
        position: absolute;
        left:0;
        bottom: 0;
        margin: 5px;
        border-radius: 10px;
        height: 50px;
        width: 150px;
        background-color: darkgray;
    }


    #songSlideStack {
        display:flex;
        flex-direction: column;
        margin:auto;
        text-align: center;
    }


    #songInfo {
        margin: auto;
        margin-top: -10vh;
        padding: 10px;
    }


    #songTitle {
        border: 2px solid black;
        background-color: lightgray;
        border-radius: 5px;
        height: 40px;
        width: 150px;
        text-wrap:balance;
        margin: 5px;
    }


    #songArtist {
        border: 2px solid black;
        background-color: lightgray;
        border-radius: 5px;
        height: 40px;
        width: 100px;
        text-wrap: balance;
        margin: auto;
    }


    #currentSlide {
        border: 4px solid black;
        border-radius: 3%;
        border-color: green;
        height: 30vw;
        width: 50vw;
        padding: 10px;
        margin: auto;
        background-color: lightblue;
        }
</style>
