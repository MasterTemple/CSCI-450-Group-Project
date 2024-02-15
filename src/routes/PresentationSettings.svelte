<script>

    let checked = [false, false, false]

    const checkBoxCliked = function(input) {
        for (let i = 0; i < checked.length; i++) {
            i == input ? checked[i] = true : checked[i] = false
        }
        console.log(checked)
    }

    function applyChanges() {
    
    }


</script>

<div>
    <input type="checkbox" id="divideEveryCheck" on:click={() => checkBoxCliked(0)} checked={checked[0]}><label>Divide every <input type="text" id="divideEveryLines" name="divideEveryLines" placeholder="n"> lines</label>
    <br>
    <label><input type="checkbox" id="autodetectCheck" on:click={() => checkBoxCliked(1)} checked ={checked[1]}>Autodetect from spacing</label>
    <br>
    <input type="checkbox" id="divideAtMatchCheck" on:click={() => checkBoxCliked(2)} checked = {checked[2]}><label>Divide at match: <input type="text" id="divideAtMatch" name="divideAtMatch" placeholder="text"></label>
</div>

<button id="applyChangesButton" on:click={applyChanges}>Apply Changes</button>

<style>


#applyChangesButton {
    background-color: antiquewhite;
    border: none;
    border-radius: 10px;
    height: 3vw;
    width: 95%;
    
}

#divideEveryLines {
    width: 15px;
    text-align: center;
}

#divideAtMatch {
    position: relative;
    width: 50%;
    left: 25%;
}

</style>