<script>
    import SavedSong from "./SavedSong.svelte";
    import { savedSongsIsOpen } from "./stores";
    import { color } from "./stores";
    import { savedSongs } from "./stores";

    let icons = [">", "<"]
    var icon = 1;
    function toggleDrawer() {
        console.log("Toggle Drawer:" + $savedSongsIsOpen)
        savedSongsIsOpen.set(!$savedSongsIsOpen)        
    }


    // Function to define the element
    function DefineSavedSong() {
            
        } 

    function displaySongs() {

    }

    let tempSongs = ["All Glory be to Christ", "I Thank God", "O Come to the Altar", "Nothing but the Blood"]

    function searchSongs() {
        class SavedSongElement extends HTMLElement {
                constructor() {
                    super();
                    this.attachShadow({ mode: 'open' });
                    this.shadowRoot.innerHTML = `
                    <button id="savedSongButton">
    <button id="image" style="--color: {color.lightPurple}"> </button>
    <div id="subText">
        <p id="songTitle">{songName}</p>
        <p id="dateCreated">{songDate}</p>
    </div>
    
</button>
            `;
                }
            }
 
            // Use the define() method to define
            // a new element
            window.customElements.define(
                'saved-song-element', SavedSongElement);


        
        displaySongs();
        let input = document.getElementById('searchBar').value
        input = input.toLowerCase();
        console.log("Input: " + input)

        var temp = ""
        for (const item of tempSongs) {
            if (item.toLowerCase().includes(input)) {
                temp += item + ", "
            }
        }

        const ss = new SavedSongElement;
        document.getElementById('songsList').appendChild(ss)

        console.log("The ones included in the search for " + input + ": " + temp);
        
    }

    
</script>


<div id="drawerDiv">
    <button id="drawerButton" style="--color: {color.brown}" on:click={toggleDrawer} >{icons[$savedSongsIsOpen ? 1 : 0]}</button>

    
</div>

<div id = "songs">
    <input type="text" placeholder="Search.." id="searchBar" on:keyup={searchSongs}>
    
    <ul id="songsList">
        <SavedSong songName= "All Glory be to Christ" songDate="March 7, 2024"/>
        <SavedSong songName= "I Thank God" songDate="March 7, 2024"/>
        <SavedSong songName= "O Come to the Altar" songDate="March 7, 2024"/>
        <SavedSong songName= "Nothing but the Blood" songDate="March 7, 2024"/>

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

#songsList {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}



</style>