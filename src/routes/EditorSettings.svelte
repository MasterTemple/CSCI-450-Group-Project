<script>
	// let textColor;
	// let backgroundColor;
	// let fontSize = 12;
	// let fontFamily = "Arial";
	// let titleSlide = false;
	// let numberOfColumns = 1;
	import {
		backgroundColor,
		fontFamily,
		fontSize,
		includeTitleSlide,
		numberOfColumns,
		textColor,
	} from "./stores";

</script>

<div id="editor-settings-style">
    <div class="editor-settings-items">
        <label>Font Size<input  name="editor-settings" type="number" min="12" max="36" id="fontSize" bind:value={$fontSize}></label>
    </div>
    <div class="editor-settings-items" >
        <!-- <label>hello</label> -->
        <label>Text<input name="editor-settings" type="color" id="textColor" bind:value={$textColor}></label>
    </div>
    
    <div  class="editor-settings-items">
        <label>Background<input name="editor-settings" type="color" id="backgroundColor" bind:value={$backgroundColor}></label>
    </div>
    

    
    <div class="editor-settings-items" >
        <label for="Font Family">Font</label>
        <select name = "editor-settings" id="fontFamily" bind:value={$fontFamily}>
            <option value=arial selected>Arial</option>
            <option value=timeNewRoman>Times New Roman</option>
            <option value=helvetica>Helvetica</option>
        </select>
    </div>
    
    <div class="editor-settings-items" >
        <label>Title Slide<input name="editor-settings" type="checkbox" id="titleSlide" bind:value={$includeTitleSlide}></label>
    </div>

    
    <div class="editor-settings-items" >
        <label>Columns <input name="editor-settings" type="number" min="1" max="6" id="numberOfColumns" bind:value={$numberOfColumns}></label>
    </div>
    
    
</div>
<style>

#editor-settings-style{

    display: flex;
    flex-direction: column;
}
#textColor{
    margin-right: 5px;
    float: right;
}
#backgroundColor{
    margin-right: 5px;
    float: right;
}

#fontSize{
    margin-right: 15px;
    float: right;

}

.editor-settings-items{
    padding-bottom: 15px;
    padding-top: 15px;
    margin-left: 30px;
    font-size: 20px;
}



</style>
