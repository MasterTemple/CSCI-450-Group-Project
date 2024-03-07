<script>
    import SlidePreview from "./SlidePreview.svelte";
</script>

<div id="previewStack">
    <div id="nextSlidePreview">

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
    }
</style>