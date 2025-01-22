import { getBlocks } from "./blocks.js";
import { placeBlock, createBin, getBins } from "./bins.js";


const blockPlacer = () => {
    const blocks = getBlocks();
    for (const block of blocks) {
        const bins = getBins();

        for (const bin of bins) {
            if (bin.width >= block.width && bin.height >= block.height) {
                const blockPlaced = tryToPlace(block, bin);

                if (blockPlaced) return true;
            }
        }
        console.log(block);
        

        if (block.x === undefined) {
            createBin();
            tryToPlace(block, bins[bins.length - 1]);
        }
    }
}

const tryToPlace = (block, bin) => {
    if (bin.blocks.length === 0) {
        block.x = 0;
        block.y = 0;
        placeBlock(block, bin);
        return true;
    } else {
        /*
        for (const b of bin.blocks) {
            if (block.x + block.width > b.x + b.width || block.x < b.x || block.y + block.height > b.y + b.height || block.y < b.y) {
                block.x = 0;
                block.y = 0;
                placeBlock(block, bin);
                return true;
            }
        }
        return false;
        */
    }
}

export { blockPlacer };