<script>
  import { savedSongsIsOpen } from "./stores";

    function toggleDrawer() {
        savedSongsIsOpen = !savedSongsIsOpen
        console.log("Toggle Drawer")
        if (arrowText == ">") {
            arrowText = "<"
        } else {
            arrowText = ">"
        }
    }
</script>


<div id="drawerDiv">
    <button id="drawerButton" on:click={toggleDrawer} ></button>
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
}

</style>