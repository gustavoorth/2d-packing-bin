import { resizeBinContainer } from "./binDrawer.js";

let bins = [];
let binMaxWidth = 0;
let binMaxHeight = 0;

const placeBlock = (block, bin) => {
    const binIndex = bins.indexOf(bin);
    if (binIndex !== -1) bins[binIndex].blocks.push(block);
};

const getBins = () => bins;

const setBinMaxSize = (width, height) => {
    binMaxWidth = width;
    binMaxHeight = height;
    resizeBinContainer(width, height);
}

const createBin = () => bins.push({ blocks: [], width: binMaxWidth, height: binMaxHeight });

export { placeBlock, getBins, setBinMaxSize, createBin };