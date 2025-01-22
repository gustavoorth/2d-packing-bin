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

const list = document.querySelector('#registered-blocks');
list.addEventListener('click', ({ target }) => {
    if (target.classList.contains('bx-trash')) {
        removeBlock(target.closest('li').dataset.block);
        drawBlockList();
    }
}, { capture: true });


export { drawBlockList };