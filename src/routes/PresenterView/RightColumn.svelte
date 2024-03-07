<script>
    import SlidePreview from "./SlidePreview.svelte";
    import { backgroundColor } from "../stores";
</script>

<div id="previewStack">
    <div id="nextSlidePreview" style="background-color: {$backgroundColor}">

    </div>
    <div id="allSlides">
        <SlidePreview/>
    </div>
</div>

<style>
    #previewStack {
        display: flex;
        flex-direction: column;
        margin-top: 5vh;
    }

    #nextSlidePreview {
        border: 4px solid darkgoldenrod;
        border-radius: 3%;
        height: 30vh;
        width: 30vw;
        background-color: lightblue;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
</style>