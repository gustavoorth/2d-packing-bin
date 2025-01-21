import { getBlocks, removeBlock } from './blocks.js';

const drawBlockList = () => {
    const blocks = getBlocks();
    const list = document.querySelector('#registered-blocks');
    list.innerHTML = '';
    blocks.forEach(block => {
        const li = document.createElement('li');
        li.dataset.block = block.name;
        li.innerHTML = `<i class='bx bx-package bx-xs'></i> ${block.name} - ${block.width}x${block.height} <i class='bx bx-trash bx-xs text-danger'></i>`;
        list.appendChild(li);
    });
}

document.addEventListener('click', e => {
    if (e.target.classList.contains('bx-trash')) {
        const block = e.target.parentElement.dataset.block;
        removeBlock(block);
        drawBlockList();
    }
})

export { drawBlockList };