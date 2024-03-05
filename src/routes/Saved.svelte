<script>
    import SavedSong from "./SavedSong.svelte";
    import { savedSongsIsOpen } from "./stores";
    import { color } from "./stores";

    let icons = [">", "<"]
    var icon = 1;
    function toggleDrawer() {
        console.log("Toggle Drawer:" + $savedSongsIsOpen)
        savedSongsIsOpen.set(!$savedSongsIsOpen)        
    }

    function searchSongs() {
        let input = document.getElementById('searchBar').value
        input = input.toLowerCase();
        console.log("Input: " + input)
        let x = document.getElementsByClassName(SavedSong);
        for (var k in x) {
            console.log("i: " + k)
        }

        for (var i = 0; i < x.length; i++) {
            if (!x[i].innerHTML.toLowerCase().includes(input)) {
                x[i].style.display = "none";
            }
            else {
                x[i].style.display = "list-item";
            }
        }
        
    }
</script>


<div id="drawerDiv">
    <button id="drawerButton" style="--color: {color.brown}" on:click={toggleDrawer} >{icons[$savedSongsIsOpen ? 1 : 0]}</button>

    
</div>

<div id = "songs">
    <input type="text" placeholder="Search.." id="searchBar" on:keyup={searchSongs}>
    
    <ul>
        <SavedSong/>
        <SavedSong/>
        <SavedSong/>
        <SavedSong/>
    </ul>
    

</div>



<style>
#drawerDiv {
    position: absolute;
    bottom: 50%;
    left: 100%;
}

#drawerButton {
  background-color: var(--color); /* Green */
  border: none;
  text-align: center;
  font-size: 16px;  
  width: 25px;
  height: 75px;
  border-top-right-radius: 10px; 
  border-bottom-right-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

#searchBar {
    border-radius: 10px;
    border: none;
    width: 150px;
    left: 20px;
    position: relative;
    top: 10px;
}

#songs {
    height: 720px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    gap: 10px;
   
}

</style>