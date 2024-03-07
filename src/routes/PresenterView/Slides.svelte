<script>
    import { color,
             lyricsBySlide,
             backgroundColor } from '../stores.js';
</script>

<button id="slide" style = "background-color: {$backgroundColor};"></button>

<style>
    #slide {
        background-color: lightblue;
        height: 13vh;
        width: 8vw;
        border: 3px solid black;
        border-radius: 5%;
        margin: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>