<script>
    import LeftColumn from "./LeftColumn.svelte";
    import RightColumn from "./RightColumn.Svelte";
</script>

<div id="row">
    <div id="LeftColumn">
        <LeftColumn/>
    </div>
    <div id="RightColumn">
        <RightColumn/>
    </div>
</div>

<style>
    #row {
        display: flex;
        flex-direction: row;
        height: 100%;
    }
    #LeftColumn {
        background-color: silver;
        vertical-align: bottom;
        height:100%;
        width: 100vw;
        display:flex;
        align-items: center;
        }

    #RightColumn {
        background-color: beige;
        height:100%;
        width: 50vw;
        position: relative;
        right: var(--loc);
        display: flex;
    }

</style>