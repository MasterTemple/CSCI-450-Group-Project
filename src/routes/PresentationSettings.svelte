<script>
    import {
		backgroundColor,
		breakIndexes,
		color,
		currentSong,
		dividerList,
		fontFamily,
		fontSize,
		lines,
		lyricsBySlide,
		numberOfColumns,
		rawClipboardContents,
		textColor,
	} from "./stores.js";

    
    let divideEveryNLinesCount = 4
    let divideAtMatchWord = ""

    function applySettings() {

        if (document.getElementById('divideEveryCheck').checked) {
            if (divideEveryNLinesCount > $lines.length || divideEveryNLinesCount < 1) {
                console.log("ERROR") // TODO: Implement error message
                return
            }

            var counter = 0
            $lyricsBySlide = [[]]

            for (var i = 0; i < $lines.length; i++) {
                $lines[i].divider=false
            }
            for (var i = 0; i < $lines.length; i++) {
                //console.log("HERE" + $lines[i].divider)
                console.log("i: " + i + ", divideEveryN: " + divideEveryNLinesCount+ "is it 0? " + ((i+1) % divideEveryNLinesCount));
                if (((i+1) % divideEveryNLinesCount == 0) && i+1 >= divideEveryNLinesCount) {
                    counter ++
                    $lines[i].divider = true
                    $lyricsBySlide[counter] = []
                } else {
                    $lines[i].divider=false
               }
                $lyricsBySlide[counter].push($lines[i].text)
            }
            
        }

        else if (document.getElementById('autodetectCheck').checked) {
            console.log("autodetect")
            var counter = 0;
            $lyricsBySlide = [[]]
            for (i = 0; i < $lines.length; i++) {
                if ($lines[i].divider) {
                    counter ++
                    $lyricsBySlide[counter] = []
                }
                else {
                    $lyricsBySlide[counter].push($lines[i].text)
                }
            }
            console.log($currentSong.PresentationSettings.lyricsBySlide)
        }

        else if(document.getElementById('divideAtMatchCheck').checked) {
            console.log("divide at match " + divideAtMatchWord)
            // TODO: Implement this

        }
    }

</script>

<div>
    <input name="presentation-settings" type="radio" id="divideEveryCheck"><label>Divide every <input type="number" id="divideEveryLines" name="divideEveryLines" placeholder="n" bind:value={divideEveryNLinesCount}> lines</label>
    <br>
    <label><input name="presentation-settings" type="radio" id="autodetectCheck">Autodetect from spacing</label>
    <br>
    <input name="presentation-settings" type="radio" id="divideAtMatchCheck"><label>Divide at match: <input type="text" id="divideAtMatch" name="divideAtMatch" placeholder="text" bind:value={divideAtMatchWord}></label>
</div>

<button id="applyChangesButton" on:click={applySettings}>Apply Changes</button>

<style>
    
#applyChangesButton {
    background-color: antiquewhite;
    border: none;
    border-radius: 10px;
    height: 3vh;
    width: 95%;
    
}

#divideEveryLines {
    width: 15px;
    text-align: center;
}

#divideAtMatch {
    position: relative;
    width: 50%;
    left: 25%;
}

/* https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>