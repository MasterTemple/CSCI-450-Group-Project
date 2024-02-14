<script>
    import { savedSongsIsOpen } from "./stores";

    let icons = [">", "<"]
    var icon = 1;
    function toggleDrawer() {
        console.log("Toggle Drawer:" + $savedSongsIsOpen)
        savedSongsIsOpen.set(!$savedSongsIsOpen)        
    }
</script>


<div id="drawerDiv">
    <button id="drawerButton" on:click={toggleDrawer} >{icons[$savedSongsIsOpen ? 1 : 0]}</button>
</div>


<style>
#drawerDiv {
    position: absolute;
    bottom: 50%;
    left: 100%;
}

#drawerButton {
  background-color: orange; /* Green */
  border: none;
  text-align: center;
  font-size: 16px;  
  width: 25px;
  height: 75px;
  border-top-right-radius: 10px; 
  border-bottom-right-radius: 10px;
}

</style>