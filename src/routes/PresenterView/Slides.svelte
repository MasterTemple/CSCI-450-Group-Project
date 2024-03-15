<script>
    import { writable } from 'svelte/store';
    import { backgroundColor,
             textColor,
             fontFamily,
             fontSize } from '../stores.js';

    export let lyrics = writable([]);
</script>

<button id="slide" style = "background-color: {$backgroundColor}; color: {$textColor}; font-family: {$fontFamily}; font-size:{fontSize}">
    <p id="lyrics">
        {#each $lyrics as line}
            <p>{line}</p>
        {/each}
    </p>
</button>

<style>
    #slide {
        background-color: lightblue;
        height: 13vh;
        width: 8vw;
        border: 3px solid black;
        border-radius: 5%;
        margin: auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        cursor: pointer;
    }
</style>