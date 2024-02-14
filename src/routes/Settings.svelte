<script>
    import EditorSettings from "./EditorSettings.svelte";
  import PresentationSettings from "./PresentationSettings.svelte";
import { settingsIsOpen, settingsToggleOption, settingsSelection } from "./stores";

    let icons = ["<", ">"];
    var icon = 1;

    let selectedColor = '#ff0000';
    let nonSelectedColor = '#810000';

    let editorColor = selectedColor;
    let presentationColor = nonSelectedColor;

    
    function toggleDrawer() {
        settingsIsOpen.set(!$settingsIsOpen); 
    }

    function editorToggled() {
        settingsSelection.set(settingsToggleOption.editor)
        editorColor = selectedColor
        presentationColor = nonSelectedColor
    }

    function presentationToggled() {
        settingsSelection.set(settingsToggleOption.presentation)
        editorColor = nonSelectedColor
        presentationColor = selectedColor
    }

</script>


<div id="drawerDiv">
    <button id="drawerButton" on:click={toggleDrawer} >{icons[$settingsIsOpen ? 1 : 0]}</button>
</div>

<div id="editorOrPresentationToggle">
    <button id="editorToggle" on:click={editorToggled} style="--color: {editorColor}">Editor</button>
    <button id="presentationToggle" on:click={presentationToggled} style="--color: {presentationColor}">Presentation</button>
</div>

<div id="editorSettings" style="--visibility: {$settingsSelection == settingsToggleOption.editor ? "visible" : "hidden"}">
<EditorSettings/>
</div>

<div id="presentationSettings" style="--visibility: {$settingsSelection == settingsToggleOption.presentation ? "visible" : "hidden"}">
<PresentationSettings/>
</div>


<style>
#drawerDiv {
    position: absolute;
    bottom: 50%;
    left: -25px;
}

#drawerButton {
  background-color: orange; /* Green */
  border: none;
  text-align: center;
  font-size: 16px;  
  width: 25px;
  height: 75px;
  border-top-left-radius: 10px; 
  border-bottom-left-radius: 10px;
}

#editorOrPresentationToggle {
    display: flex;
}

#editorToggle {
    flex: 1;
    width: 50%;
    position: relative;
    background-color: var(--color);
    border: none;
    height: 50px;
    border-top-left-radius: 19px;
}

#presentationToggle {
    flex: 1;
    position: relative;
    width: 50%;
    background-color: var(--color);
    border: none;
    height: 50px;
}

#editorSettings {
    visibility: var(--visibility);
    position: absolute;
    left: 0;
    top: 100;
}

#presentationSettings {
    visibility: var(--visibility);
    position: absolute;
    left: 0;
    top: 100;
}


</style>