import { getBlocks, organizeForPlacing } from "./blocks.js";
import { placeBlock, createBin, getBins } from "./bins.js";


const blockPlacer = () => {
    const blocks = organizeForPlacing(getBlocks());
    
    for (const block of blocks) {
        const bins = getBins();

        for (const bin of bins) {
            if (bin.width >= block.width && bin.height >= block.height) {
                const blockPlaced = tryToPlace(block, bin);

                if (blockPlaced) {
                    break;
                }
            }
        }

        if (block.x === undefined) {
            createBin();
            tryToPlace(block, bins[bins.length - 1]);
        }
    }
    console.log(getBins());
    
}

const tryToPlace = (block, bin) => {
    if (bin.blocks.length === 0) {
        block.x = 0;
        block.y = 0;
        placeBlock(block, bin);
        return true;
    } else {
        const remainingX = bin.width - bin.blocks.reduce((acc, binBlock) => acc + binBlock.width, 0);
    }
}

export { blockPlacer };