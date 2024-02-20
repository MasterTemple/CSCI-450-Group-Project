<script>
    import { writable } from 'svelte/store';
    import { EXAMPLE_CONTENTS } from "./constants.js"
    import { rawClipboardContents, lines, numberOfColumns, dividerList } from "./stores.js"

    async function readClipboard() {
        // save the clipboard contents
        rawClipboardContents.set(EXAMPLE_CONTENTS)
        // rawClipboardContents = await navigator.clipboard.readText()

        // split at single newlines
        lines.set($rawClipboardContents.trim().split(/\n/)
            // remove leading and trailing whitespace
            .map((line) => line.trim()));
        
        // get indexes of lines where spaces are after
        // doing this before filtering them out
        let offset = 1;
        let emptyIndexes = [];

        for(let i in $lines) {
            let line = $lines[i];
            if(line.length == 0) {
                emptyIndexes.push(Number(i)-offset);
                offset++;
            }
        }

        // remove empty lines
        lines.set($lines.filter((line) => line.length > 0))

        // initialize divider list with false values
        dividerList.set(
            new Array($lines.length)
            // default value is false
            .fill(false)
            // true when empty index
            .map((value, i) => emptyIndexes.includes(i))
        );
    }

    const NUMBER_OF_LINES_PER_COLUMN = 8;
    function min(a, b) {
        return a > b ? b : a;
    }
    let leftMostDisplayColumn = 0;
</script>

<h2>Paste Lyrics Here</h2>
    
<button on:click={readClipboard}>Paste from Clipboard</button>

<div id="lyric-region">
    {#each {length: NUMBER_OF_LINES_PER_COLUMN} as _, i}
        <div
            id="column-{i}"
            class="lyric-column"
            class:hide={i < leftMostDisplayColumn || leftMostDisplayColumn+$numberOfColumns <= i}
        >
            <!-- class:hide={leftMostDisplayColumn > i || i > leftMostDisplayColumn+$numberOfColumns} -->
            {#each $lines.slice(i*NUMBER_OF_LINES_PER_COLUMN, min((i+1)*NUMBER_OF_LINES_PER_COLUMN), $lines.length) as line, j}
                <p>{line}</p>
                <button class="divider"
                    on:click={() => $dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j] = !$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]}
                    class:selected={$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]}
                />
            {/each}
        </div>
    {/each}
</div>

<style>
#lyric-region {
    display: flex;
    flex-direction: row;
    color: white;
    width: 60rem;
    height: 40rem;
    background-color: black;
    justify-content: center;
    align-items: center;
}

#lyric-column {
    align-items: center;
    display: flex;
    flex-direction: column;
    align-items: center;

}

p {
    text-align: center;
}

.divider {
    background-color: red;
    border: none;
    height: 0.5rem;
    width: 70%;
    opacity: 0.4;
    border-radius: 4px;
}

.divider:hover {
    opacity: 0.8;
}

.divider.selected {
    opacity: 1;
}

.hide {
    display: none;
}

</style>