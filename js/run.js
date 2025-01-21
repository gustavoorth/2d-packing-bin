import { drawBin } from "./binDrawer.js";
import { getBlocks } from "./blocks.js";

const runBtn = document.querySelector('.btn-run');
const binSize = document.querySelector('#binSize').value;
const bin = document.querySelector('#bin');

runBtn.addEventListener('click', () => {
    let width, height;
    if (binSize) {
        [width, height] = binSize.split('x').map(x => parseInt(x, 10));
    } else {
        const block = getBlocks()[0];
        width = block.width;
        height = block.height;
    }

    bin.innerHTML = '';
    bin.style.width = `${width}px`;
    bin.style.height = `${height}px`;
    drawBin();
});