import { getBins } from "./bins.js";

const drawBin = (bin) => {
    const binDiv = document.querySelector('#bin');
    binDiv.innerHTML = '';
    for (const block of getBins()[bin].blocks) {
        const blockDiv = document.createElement('div');
        blockDiv.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        blockDiv.style.width = `${block.width}px`;
        blockDiv.style.height = `${block.height}px`;
        blockDiv.style.position = 'absolute';
        blockDiv.style.top = block.y;
        blockDiv.style.left = block.x;
        binDiv.appendChild(blockDiv);
    }
}

const resizeBinContainer = (width, height) => {
    const binDiv = document.querySelector('#bin');
    binDiv.style.width = `${width}px`;
    binDiv.style.height = `${height}px`;
}

export { drawBin, resizeBinContainer };
