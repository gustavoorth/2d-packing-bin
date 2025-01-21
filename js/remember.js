import { getBlocks } from "./blocks.js";

const rememberBtn = document.querySelector('.btn-remember');

rememberBtn.addEventListener('click', () => {
    const blocks = getBlocks();
    fetch('remember.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(blocks)
    })
})