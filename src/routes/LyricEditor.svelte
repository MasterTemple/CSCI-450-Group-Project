<script>
    import { writable } from 'svelte/store';
    import { EXAMPLE_CONTENTS_2 } from "./constants.js"
    import { splitLine } from "./functions.js"
    import { rawClipboardContents, lines, numberOfColumnsToDisplay, dividerList, breakIndexes } from "./stores.js"
    import { onMount } from 'svelte';

    onMount(() => {
        document.addEventListener("scroll", (e) => console.log({e}))

        // rawClipboardContents.subscribe((value) => {
        //     if(value.length > 0)
        //         setLyricDataFromClipboard(value)
        // })
    })

    /**
     * @param {String} str - Check if a line should be split in half
     */
    function setLyricDataFromClipboard(contents) {
        // rawClipboardContents.set(EXAMPLE_CONTENTS_2)
        // console.log(contents)
        // split at single newlines
        lines.set(contents.trim().split(/\n/)
            // remove leading and trailing whitespace
            .map((line) => line.trim()));

        console.log($lines)

        // split lines in half as necessary
        lines.set($lines.map(splitLine).flat())
        
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
        breakIndexes.set(emptyIndexes)

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

    async function readClipboard() {
        // save the clipboard contents
        rawClipboardContents.set(EXAMPLE_CONTENTS_2)
        setLyricDataFromClipboard($rawClipboardContents)
        // rawClipboardContents = await navigator.clipboard.readText()

    }
    // numberOfColumns = Math.floor($lines.length /NUMBER_OF_LINES_PER_COLUMN + 0.99)
    // console.log({numberOfColumns})

    function divideLine(line) {

    }

    const NUMBER_OF_LINES_PER_COLUMN = 8;
    function max(a, b) {
        return a < b ? b : a;
    }
    function min(a, b) {
        return a > b ? b : a;
    }
    let leftMostDisplayColumn = writable(0);
</script>
    
<button on:click={readClipboard}>Paste from Clipboard</button>
<div id="songInformation">
    <input type="text" placeholder="Song Title" id="songTitle" style="--color: {color.darkBlue}"/>
    <input type="text" placeholder="Artist" id="songArtist" style="--color: {color.darkBlue}"/>
</div>
<div id="lyric-region" style="--color: {color.darkBlue}">
    {#each {length: NUMBER_OF_LINES_PER_COLUMN} as _, i}
        <div
            id="column-{i}"
            class="lyric-column"
            class:hide={i < $leftMostDisplayColumn || $leftMostDisplayColumn+$numberOfColumnsToDisplay <= i}
        >
            {#each $lines.slice(i*NUMBER_OF_LINES_PER_COLUMN, min((i+1)*NUMBER_OF_LINES_PER_COLUMN), $lines.length) as line, j}
                <p class="lyric-text">
                    <!-- {line} -->
                    {#each [...line.match(/\S+/g)] as word, i}
                        {word}
                        {#if i != [...line.match(/\S+/g)].length - 1}
                            <button class="vertical-separator"/>
                        {/if}
                    {/each}
                </p>
                <button class="divider"
                    on:click={() => $dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j] = !$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]}
                    class:selected={$dividerList[i*NUMBER_OF_LINES_PER_COLUMN+j]}
                />
            {/each}
        </div>
    {/each}
</div>

<div id="column-nagivation">
    <button disabled={$leftMostDisplayColumn == 0} on:click={leftMostDisplayColumn.set(max(0, $leftMostDisplayColumn - 1))}>Left</button>
    <button disabled={$leftMostDisplayColumn + $numberOfColumnsToDisplay == Math.floor($lines.length / NUMBER_OF_LINES_PER_COLUMN + 0.99)} on:click={leftMostDisplayColumn.set(min(Math.floor($lines.length / NUMBER_OF_LINES_PER_COLUMN + 0.99), $leftMostDisplayColumn + 1))}>Right</button>
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
    flex-wrap: nowrap;
    overflow-x: auto;
}

.lyric-column {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    /* flex: 0 0 auto; */
    align-items: center;
    width: 14vw;
    background-color: var(--color);
    margin: 0 auto;
    border-radius: 10px;
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

.vertical-separator {
    opacity: 0.05;
    background-color: blue;
    margin: 0;
    padding: 0;
    border: none;
    width: 0.25rem;
    height: 1rem;
}

.vertical-separator:hover {
    opacity: 0.8;
}

.hide {
    display: none;
}

.lyric-text {
    margin: 0;
    padding: 0;
}

#column-nagivation {
    display: flex;
    flex-direction: row;
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