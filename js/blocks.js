import { drawBlockList } from "./blockList.js";

let blocks = await fetch('saved.json').then(response => response.json());

const addBlock = (name, width, height, quantity) => {
    const originalName = name;
    for (let i = 0; i < quantity; i++) {
        name = originalName;
        if (blocks.some(block => block.name === name)) return alert(`${name} already exists`);
        if (quantity > 1) name = `${name} ${i + 1}`;
        blocks.push({ name, width, height });
    }

    organizeBlocks();

    drawBlockList();
};

const resetBlocks = () => {
    blocks = [];
    drawBlockList();
};

const removeBlock = (name) => {
    blocks = blocks.filter(block => block.name !== name);
    organizeBlocks();
    drawBlockList();
};

const getBlocks = () => blocks;

const organizeBlocks = () => {
    blocks.sort((a, b) => {
        const aArea = a.width * a.height;
        const bArea = b.width * b.height;
        const areaComparison = bArea - aArea;
        if (areaComparison === 0) {
            return a.name.localeCompare(b.name);
        }
        return areaComparison;
    });
};

organizeBlocks();

drawBlockList();

export { addBlock, getBlocks, resetBlocks };
