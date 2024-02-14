<script>
    import { settingsIsOpen } from "./stores";

    let icons = ["<", ">"]
    var icon = 1;
    function toggleDrawer() {
        console.log("Toggle Drawer:" + $settingsIsOpen)
        settingsIsOpen.set(!$settingsIsOpen)        
    }
</script>


<div id="drawerDiv">
    <button id="drawerButton" on:click={toggleDrawer} >{icons[$settingsIsOpen ? 1 : 0]}</button>
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

</style>