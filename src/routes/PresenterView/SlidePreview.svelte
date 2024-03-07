<script>
    import { color,
             lyricsBySlide,
             backgroundColor } from '../stores.js';
    import Slides from './Slides.svelte';
</script>

<div id = "column">
    <div id="row">
        <Slides/>
        <Slides/>
        <Slides/>
    </div>
    <div id="row">
        <Slides/>
        <Slides/>
        <Slides/>
    </div>
    <div id="row">
        <Slides/>
        <Slides/>
        <Slides/>
    </div>
</div>

<style>
    #column {
        display: flex;
        flex-direction: column;
        padding: 10% 0 0 0;
    }

    #row {
        display: flex;
        flex-direction: row;
        padding: 3% 0 3% 0;
    }
</style>