import { createBin, setBinMaxSize } from "./bins.js";
import { getBlocks } from "./blocks.js";
import { blockPlacer } from "./blockPlacer.js";

const runBtn = document.querySelector('.btn-run');

runBtn.addEventListener('click', () => {
    const bin = document.querySelector('#bin');
    const binSize = document.querySelector('#binSize').value;

    const [width, height] = binSize ? binSize.split('x').map(Number) : [getBlocks()[0].width, getBlocks()[0].height];

    bin.style.width = `${width}px`;
    bin.style.height = `${height}px`;

    createBin();
    setBinMaxSize(width, height);
    blockPlacer();
});