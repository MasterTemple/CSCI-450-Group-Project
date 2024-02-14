<script>
    import LyricEditor from "./LyricEditor.svelte"
    import Saved from "./Saved.svelte"
    import { savedSongsIsOpen } from "./stores";
</script>

<nav id="navbar">
</nav>
<div id="content">
    <div id="saved" style="--loc: {$savedSongsIsOpen ? 0 : -14.5}vw">
        <Saved/>
    </div>
    <div id="editor">
        <LyricEditor/>
    </div>
    <div id="settings"></div>
</div>

<style>

/* :root {
    display: flex;
    flex-direction: row;
} */

#navbar {
    /* position: fixed; */
    width: 100vw;
    height: 12vh;
    background-color: pink;
}

#content {
    display: flex;
    flex-direction: row;
    height: 88vh;
    width: 100vw;
}

#saved {
    height: 100%;
    width: 20vw;
    background-color: green;
    position: relative;
    left: var(--loc);
    transition: left 1s;
}

#editor {
    background-color: grey;
    height: 100%;
    width: 100vw;
}

#settings {
    background-color: blue;
    height: 100%;
    width: 20vw;
}

</style>