<script>



</script>

<div>
    <input type="checkbox" id="divideEveryCheck"><label>Divide every <input type="text" id="divideEveryLines" name="divideEveryLines" placeholder="n"> lines</label>
    <br>
    <input type="checkbox" id="autodetectCheck"><label>Autodetect from spacing</label>
    <br>
    <input type="checkbox" id="divideAtMatchCheck"><label>Divide at match: <input type="text" id="divideAtMatch" name="divideAtMatch" placeholder="text"></label>
</div>

<button id="applyChangesButton">Apply Changes</button>

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