<script>
    let textColor;
    let backgroundColor;
    let fontSize = 12;
    let fontFamily = "Arial";
    let titleSlide = false;
    let numberOfColumns = 1;

    //determine if color input is RBG, HEX, HSL
    //currently only works if user sets input to HEX manually

    function applySettings() {
        console.log({textColor, backgroundColor,  fontSize, fontFamily, titleSlide, numberOfColumns});
    }


</script>

<div>
    <label>Text Color <input name="editor-settings" type="color" id="textColor" bind:value={textColor}></label>
    <br>
    <label> Background Color <input name="editor-settings" type="color" id="backgroundColor" bind:value={backgroundColor}></label>
    <br>
    <label> Font Size <input name="editor-settings" type="number" min="12" max="36" id="fontSize" bind:value={fontSize}></label>
    <br>
    <label for="Font Family"> Font Family</label>
    <select name = "editor-settings" id="fontFamily" bind:value={fontFamily}>
        <option value=arial>Arial</option>
        <option value=timeNewRoman>Times New Roman</option>
        <option value=helvetica>Helvetica</option>
    </select>
    <!-- <label> Font Family <input name="editor-settings" type="text" id="fontFamily" bind:value={fontFamily}></label> -->
    <br>
    <label> Title Slide <input name="editor-settings" type="radio" id="titleSlide" bind:value={titleSlide}></label>
    <br>
    <label>Number of Columns <input name="editor-settings" type="number" min="1" max="6" id="numberOfColumns" bind:value={numberOfColumns}></label>
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
