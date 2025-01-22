import './js/register.js';
import './js/remember.js';
import './js/reset.js';
import './js/run.js';
import { drawBlockList } from './js/blockList.js';
import { getBlocks, organizeBlocks } from './js/blocks.js';
import { setBinMaxSize } from './js/bins.js';

const blocks = getBlocks();
if (blocks.length) {
    organizeBlocks();
    setBinMaxSize(getBlocks()[0].width, getBlocks()[0].height);
}

drawBlockList();