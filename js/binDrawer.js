const drawBin = () => {
    const bin = document.querySelector('#bin');
    bin.innerHTML =
        `<div id="block1" style="background-color: lightblue; width: 50px; height: 70px; position: absolute; top: 0px; left: 0px;"></div>
        <div id="block2" style="background-color: lightgreen; width: 80px; height: 60px; position: absolute; top: 0px; left: 50px;"></div>`;
}

export { drawBin };
