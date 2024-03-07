<script>
    import { onMount } from 'svelte';
    import { color, 
             lyricsBySlide, 
             titleSlide,
             textColor,
             backgroundColor,
             fontSize,
             fontFamily 
            } from '../stores.js';

    function displaySlide(){
        var lyrics = document.createElement('p');
        
        for(let i = 0; i < lyricsBySlide.size(); i++){
            for(let j = 0; j < lyricsBySlide[i].size(); j++){
                var lyricsByLine = document.createTextNode(lyricsBySlide[i][j]);
                lyrics.appendChild(lyricsByLine);
                document.LeftColumn.appendChild(lyrics);
            }
        }
        console.log(lyrics);
    }

    function formatTime(minutes, seconds){
        let formattedMinutes = String(minutes).padStart(2, '0');
        let formattedSeconds = String(seconds).padStart(2, '0');
        let formattedTime = "${formattedMinutes}:${formattedSeconds}";
        return formattedTime;
    }
    
    function getElapsedTime(){
        var startTime = new Date();

        var updateDisplay = setInterval(function () {
            var currentTime = new Date();

            var timeDifference = currentTime - startTime;

            var totalSeconds = Math.floor(timeDifference / 1000);

            var minutes = Math.floor(totalSeconds / 60);
            var seconds = Math.floor(totalSeconds % 60);

            var elapsedTimeElement = document.getElementById("elapsedTime");
            elapsedTimeElement.textContent = "" + formatTime(minutes, seconds) + " Elapsed";
            console.log("" + formatTime(minutes, seconds) + " Elapsed")
        }, 1000)

        return updateDisplay;
    }



    onMount(() => {
        //Send user back to editor page when ESC key is pressed 
        window.addEventListener("keyup", function(e){ if(e.key=== 'Escape' || e.keyCode == 27) this.window.location.assign("../");}, false);
        var updateDisplay = getElapsedTime();
    });
    setTimeout(() => {
        
    }, 10000);
    
</script>

<div id="button-stack">
    <a href=".././">
        <button id="backButton" style="--color: {color.darkBlue}">Back</button>
    </a>

    <div id="elapsedTime"/>
</div>
<button id="switchSong" style="--color: {color.darkBlue}">Switch Song</button>

<div id="songSlideStack">
	<div id="songInfo">
		<div id="songTitle" style="--color: {color.darkBlue}">
			<p>Song Title</p>
		</div>
		<div id="songArtist" style="--color: {color.darkBlue}">
			<p>Song Artist</p>
		</div>
	</div>


    <div id="currentSlide" onload="displaySlide()" style="background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size: {$fontSize} ">
        
    </div>
</div>

<style>
    #button-stack {
        position: absolute;
        left: 0;
        top: 0;
        margin: auto;
        text-align: center;
    }
    #backButton {
        
        margin: 5px;
        border-radius: 10px;
        height: 50px;
        width: 150px;
        background-color: var(--color);
        color: white;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    #elapsedTime {
        color: black;
        margin-top: 5px;
    }


	#switchSong {
		position: absolute;
		left: 0;
		bottom: 0;
		margin: 5px;
		border-radius: 10px;
		height: 50px;
		width: 150px;
		background-color: var(--color);
		color: white;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}

	#songSlideStack {
		display: flex;
		flex-direction: column;
		margin: auto;
		text-align: center;
	}

	#songInfo {
		margin: auto;
		margin-top: -10vh;
		padding: 10px;
	}

    #songTitle {
        border: none;
        background-color: var(--color);
        color: white;
        border-radius: 5px;
        height: 40px;
        width: 150px;
        text-wrap:balance;
        font-size: larger;
        content: "test";
    }


	#songArtist {
		border: none;
		background-color: var(--color);
		color: white;
		border-radius: 5px;
		height: 40px;
		width: 130px;
		text-wrap: balance;
		font-size: larger;
		margin: auto;
	}

    #currentSlide {
        border: 4px solid darkgreen;
        border-radius: 3%;
        height: 30vw;
        width: 50vw;
        padding: 10px;
        margin: auto;
        background-color: lightblue;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        }
</style>
