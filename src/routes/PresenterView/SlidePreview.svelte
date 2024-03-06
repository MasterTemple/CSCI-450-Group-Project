<script>
    import { color } from '../stores.js';
</script>

<div id = "column">
    <div id="row">
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
    </div>
    <div id="row">
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
    </div>
    <div id="row">
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
        <button id="slide" style="--color: {color.lightBlue}"></button>
    </div>
</div>

<style>
    #column {
        display: flex;
        flex-direction: column;
        padding: 1% 0 1% 0;
    }

    #row {
        display: flex;
        flex-direction: row;
        padding: auto;
    }

    #slide {
        background-color: var(--color);
        height: 16vh;
        width: 10vw;
        border: 3px solid black;
        border-radius: 3%;
        padding: auto;
        margin:auto;
    }
</style>