<script>
    import { numberOfColumnsToDisplay } from "./stores";
	import {
		textColor,
		backgroundColor,
		fontSize,
		fontFamily,
		titleSlide
	}from "./stores.js";

    


    function applySettings() {
        console.log({textColor, backgroundColor,  fontSize, fontFamily, titleSlide, numberOfColumns});
    }


</script>

<div>
    <label>Text Color <input name="editor-settings" type="color" id="textColor" bind:value={$textColor}></label>
    <br>
    <label> Background Color <input name="editor-settings" type="color" id="backgroundColor" bind:value={$backgroundColor}></label>
    <br>
    <label> Font Size <input name="editor-settings" type="number" min="12" max="36" id="fontSize" bind:value={$fontSize}></label>
    <br>
    <label for="Font Family"> Font Family</label>
    <select name = "editor-settings" id="fontFamily" bind:value={$fontFamily}>
        <option value=arial>Arial</option>
        <option value=timeNewRoman>Times New Roman</option>
        <option value=helvetica>Helvetica</option>
    </select>
    <br>
    <label> Title Slide <input name="editor-settings" type="checkbox" id="titleSlide" bind:value={$titleSlide}></label>
    <br>
    <label>Number of Columns <input name="editor-settings" type="number" min="1" max="6" id="numberOfColumns" bind:value={$numberOfColumnsToDisplay}></label>
    <br>
    
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


</style>


