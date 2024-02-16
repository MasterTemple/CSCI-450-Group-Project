<script>
    import { writable } from 'svelte/store';
    import { EXAMPLE_CONTENTS } from "./constants.js"
    import { rawClipboardContents, lines, numberOfColumns, dividerList } from "./stores.js"

    // TODO: we should let the user set this
    const MAX_LINE_LENGTH = 12;

    /**
     * @param {String} str - Check if a line should be split in half
     * @returns {Boolean}
     */
    function shouldSplitLine(str) {
        return str.length > MAX_LINE_LENGTH;
    }

    /**
     * @param {String} str - Split a string into 2 strings as equally as possible
     * @returns {Array<String>}
     */
    function splitLine(str) {
        const middle = Math.floor(str.length / 2);
        let offset = 0;
        while(offset < str.length - middle) {
            if(str.charAt(middle + offset) == " ") {
                    return [str.slice(0, middle + offset), str.slice(middle + offset + 1)];
            }
            else if(str.charAt(middle - offset) == " ") {
                    return [str.slice(0, middle + offset), str.slice(middle + offset + 1)];
            }
            offset++;
        }
        return [str];
    }

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

    const NUMBER_OF_LINES_PER_COLUMN = 8;
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

</style>