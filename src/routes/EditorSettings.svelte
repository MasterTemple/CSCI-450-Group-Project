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

<div id="editor-settings-style">
    <div>
        <label>Text<input name="editor-settings" type="color" id="textColor" bind:value={$textColor}></label>
    </div>
    
    <div>
        <label>Background<input name="editor-settings" type="color" id="backgroundColor" bind:value={$backgroundColor}></label>
    </div>
    
    <div>
        <label>Font Size<input name="editor-settings" type="number" min="12" max="36" id="fontSize" bind:value={$fontSize}></label>
    </div>
    
    <div>
        <label for="Font Family">Font Family</label>
        <select name = "editor-settings" id="fontFamily" bind:value={$fontFamily}>
            <option value=arial selected>Arial</option>
            <option value=timeNewRoman>Times New Roman</option>
            <option value=helvetica>Helvetica</option>
        </select>
    </div>
    
    <div>
        <label>Title Slide<input name="editor-settings" type="checkbox" id="titleSlide" bind:value={$titleSlide}></label>
    </div>
    
    <div>
        <label>Columns <input name="editor-settings" type="number" min="1" max="6" id="numberOfColumns" bind:value={$numberOfColumnsToDisplay}></label>
    </div>
    
    
    
</div>




<style>



#applyChangesButton {
    background-color: antiquewhite;
    border: none;
    border-radius: 10px;
    height: 3vh;
    width: 95%;
    
}
#editor-settings-style{
    padding-left: 15px;
    padding-top: 15px;
    display: flex;
    flex-direction: column;
}
#textColor{
    /* margin-left: 15px; */
    float: right;
    /* padding-right:15px; */
}


</style>


