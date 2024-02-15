<script>
    import { writable } from 'svelte/store';
    import { EXAMPLE_CONTENTS } from "./constants.js"
    import { rawClipboardContents, lines, numberOfColumns, dividerList } from "./stores.js"

    async function readClipboard() {
        // save the clipboard contents
        rawClipboardContents.set(EXAMPLE_CONTENTS)
        // rawClipboardContents = await navigator.clipboard.readText()

        // split at single newlines
        lines.set($rawClipboardContents.split(/\n/)
            // remove leading and trailing whitespace
            .map((line) => line.trim()));
        
        // TODO: find empty lines and place borders there

        console.log({$lines})
        dividerList.set(new Array($lines.length).fill(false));
    }

    const NUMBER_OF_LINES_PER_COLUMN = 12;
    function min(a, b) {
        return a > b ? b : a;
    }
</script>

<h2>Paste Lyrics Here</h2>
    
<button on:click={readClipboard}>Paste from Clipboard</button>

<div id="lyric-region">
    {#each {length: NUMBER_OF_LINES_PER_COLUMN} as _, i}
        <div id="column-{i}" class="lyric-column">
        {#each $lines.slice(i*NUMBER_OF_LINES_PER_COLUMN, min((i+1)*NUMBER_OF_LINES_PER_COLUMN), $lines.length) as line, j}
            <p>{line}</p>
        <button class="divider" on:click={() => $dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j] = !$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]} class:selected={$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]}/>
        {/each}
        </div>
    {/each}
</div>

<style>
#lyric-region {
    align-items: center;
    display: flex;
    flex-direction: row;
    color: white;
    width: 60rem;
    height: 40rem;
    background-color: black;
}

#lyric-column {
    align-items: center;
    display: flex;
    flex-direction: column;

}

p {
    text-align: center;
}

.divider {
    width: 90%;
    border-top-width: 0.5rem;
    border-color: red;
    opacity: 0.4;
    border-radius: 4px;
}

.divider:hover {
    opacity: 0.8;
}

.divider.selected {
    opacity: 1;
}

</style>