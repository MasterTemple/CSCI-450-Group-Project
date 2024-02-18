<script>
  import { color } from "./stores";

color

</script>

<img src="logo.png" id= "logo" alt="Lyric of Lyrics Logo: A trebble cleffe surrounded by dots and dashes"/>
<h1 id="lolTitle" style="--color: {color.darkBlue}">Lyric of Lyrics</h1>
<button id="presentButton">Present</button>

<style>

#logo {
    width: 100px;
    height: 100px;
    
}

#lolTitle {
    position: relative;
    color: var(--color);
    left: 6vw;
    top: 90vh;
}

#presentButton {
    background-color: aquamarine;
    border: none;
}



</style>