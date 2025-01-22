import { createBlock, getBlocks } from "./blocks.js";

const registerBtn = document.querySelector('.btn-register');

registerBtn.addEventListener('click', () => {
    const blocks = getBlocks();
    const name = document.querySelector('#name').value;
    
    const size = document.querySelector('#size').value || alert('Size is required');
    if (!size) return;

    const parts = size.split('x');
    if (parts.length !== 2 && parts.length !== 3) return alert('Invalid size format');
    const [width, height, quantity] = parts.map(x => parseInt(x, 10));

    if (isNaN(width) || isNaN(height)) return alert('Invalid size');

    createBlock(name || 'Block' + (blocks.length + 1), width, height, quantity || 1);
})