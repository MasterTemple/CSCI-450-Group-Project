<script>

    let divideEveryNLines = false;
    let divideEveryNLinesCount = 4;
    let divideFromSpacing = false;
    let divideAtMatch = false;

    function applySettings() {
        console.log({divideEveryNLines, divideEveryNLinesCount, divideFromSpacing, divideAtMatch});
        
    }

</script>

<div>
    <input name="presentation-settings" type="radio" id="divideEveryCheck" bind:value={divideEveryNLines}><label>Divide every <input type="number" id="divideEveryLines" name="divideEveryLines" placeholder="n" bind:value={divideEveryNLinesCount}> lines</label>
    <br>
    <label><input name="presentation-settings" type="radio" id="autodetectCheck" bind:value={divideFromSpacing}>Autodetect from spacing</label>
    <br>
    <input name="presentation-settings" type="radio" id="divideAtMatchCheck" bind:value={divideAtMatch}><label>Divide at match: <input type="text" id="divideAtMatch" name="divideAtMatch" placeholder="text"></label>
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