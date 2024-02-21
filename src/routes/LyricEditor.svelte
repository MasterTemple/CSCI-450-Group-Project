<script>
    import { writable } from 'svelte/store';
    import { EXAMPLE_CONTENTS } from "./constants.js"
    import { rawClipboardContents, lines } from "./stores.js"
    import { color } from './stores.js';

    async function readClipboard() {
        // save the clipboard contents
        rawClipboardContents.set(EXAMPLE_CONTENTS)
        // rawClipboardContents = await navigator.clipboard.readText()

        // split at single newlines
        lines.set($rawClipboardContents.split(/\n/)
            // remove leading and trailing whitespace
            .map((line) => line.trim()));

        console.log({$lines})
    }

</script>
    
<div id="songInformation">
    <input type="text" placeholder="Song Title" id="songTitle" style="--color: {color.darkBlue}"/>
    <input type="text" placeholder="Artist" id="songArtist" style="--color: {color.darkBlue}"/>
</div>

<div id="lyric-region" style="--color: {color.darkBlue}">
    <button on:click={readClipboard}>Paste from Clipboard</button>
    <!-- {#each $lines as line} -->
        <div class="lyric-column">
        {#each $lines as line}
            <p>{line}</p>
        {/each}
        </div>
    <!-- {/each} -->
</div>

<style>
#lyric-region {
    align-items: center;
    display: flex;
    flex-direction: column;
    color: white;
    width: 60rem;
    height: 40rem;
    background-color: var(--color);
    margin: 0 auto;
    border-radius: 10px;
}

p {
    text-align: center;
}

#songInformation {
    align-items: center;
    display: flex;
    gap: 10px;
    flex-direction: column;
}

#songTitle {
    text-align: center;
    border: none;
    background-color: var(--color);
    color: white;
    border-radius: 5px;
    font-size: larger;
}

#songArtist {
    text-align: center;
    border: none;
    background-color: var(--color);
    color: white;
    border-radius: 5px;
    font-size: small;
}

::placeholder {
    color: white;
}
</style>