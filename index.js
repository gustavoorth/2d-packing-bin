const nodeMaxWidth = 2104;
const nodeMaxHeight = 420;

GrowingPacker = function (maxW, maxH) {
    this.maxW = maxW;
    this.maxH = maxH;
};

GrowingPacker.prototype = {
    fit: function (blocks) {
        if (!blocks.length) return;
        var n, node, block, len = blocks.length;
        this.root = { x: 0, y: 0, w: blocks[0].w, h: blocks[0].h };

        for (n = 0; n < len; n++) {
            block = blocks[n];
            node = this.findNode(this.root, block.w, block.h);
            block.fit = node ? this.splitNode(node, block.w, block.h) : this.growNode(block.w, block.h);
        }
    },

    findNode: function (root, w, h) {
        if (root.used) {
            return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
        } else if (w <= root.w && h <= root.h && w <= this.maxW) {
            this.binWidth = Math.min(this.root.w, this.maxW);
            this.binHeight = Math.min(this.root.h, this.maxH);
            return root;
        }
        return null;
    },

    splitNode: function (node, w, h) {
        node.used = true;
        node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
        return node;
    },

    growNode: function (w, h) {
        return this.root.w + w <= nodeMaxWidth ? this.growRight(w, h) :
            this.root.h + h <= nodeMaxHeight ? this.growDown(w, h) : null;
    },

    growRight: function (w, h) {
        this.root = {
            used: true, x: 0, y: 0, w: this.root.w + w, h: this.root.h,
            down: this.root, right: { x: this.root.w, y: 0, w: w, h: this.root.h }
        };
        var node = this.findNode(this.root, w, h);
        return node ? this.splitNode(node, w, h) : null;
    },

    growDown: function (w, h) {
        this.root = {
            used: true, x: 0, y: 0, w: this.root.w, h: this.root.h + h,
            down: { x: 0, y: this.root.h, w: this.root.w, h: h }, right: this.root
        };
        var node = this.findNode(this.root, w, h);
        return node ? this.splitNode(node, w, h) : null;
    }
}

Packagizer = function (sheetWidth, sheetHeight) {
    this.sheetWidth = sheetWidth;
    this.sheetHeight = sheetHeight;
    this.sheets = [];
    this.nofit = [];

    this.run = function (blocks) {
        const validBlocks = [];
        blocks.forEach(block => {
            if (block.w <= sheetWidth && block.h <= sheetHeight) {
                validBlocks.push(block);
            } else {
                this.nofit.push(block);
            }
        });

        while (validBlocks.length) {
            const packer = new GrowingPacker(nodeMaxWidth, nodeMaxHeight);
            packer.fit(validBlocks);

            const sheet = [];
            for (let i = validBlocks.length - 1; i >= 0; i--) {
                const block = validBlocks[i];
                if (block.fit) {
                    sheet.push(block);
                    validBlocks.splice(i, 1);
                }
            }

            sheet.sheetWidth = packer.maxW;
            sheet.sheetHeight = packer.maxH;
            this.sheets.push(sheet);
        }
    }
}

function drawSheet(sh) {
    const canvas = document.createElement('canvas');
    canvas.width = sh.sheetWidth;
    canvas.height = sh.sheetHeight;
    document.getElementById('preview').appendChild(canvas);
    const context = canvas.getContext('2d');

    context.fillStyle = 'cyan';
    context.strokeStyle = 'grey';

    sh.forEach(block => {
        context.fillStyle = 'cyan';
        context.fillRect(block.fit.x, block.fit.y, block.w, block.h);
        context.strokeStyle = 'grey';
        context.strokeRect(block.fit.x, block.fit.y, block.w, block.h);
        context.font = '12px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.fillText(`NOME: ${block.nome}`, block.fit.x + block.w / 2, block.fit.y + block.h / 2);
    });
}

function demoRun(blocks) {
    const nofit = document.getElementById('nofit');
    const preview = document.getElementById('preview');

    const pack = new Packagizer(nodeMaxWidth, nodeMaxHeight);
    pack.run(blocks);

    nofit.innerHTML = pack.nofit.length ? `The following wont fit. They exceed the maximum sheet size.</br>
        ${pack.nofit.map(b => `BLOCK - W: ${b.w} H: ${b.h}`).join('</br>')}` : '';
    preview.innerHTML = '';
    pack.sheets.forEach(drawSheet);
    console.log(JSON.stringify(pack.sheets));
}

const blocks = [
    { w: 2104, h: 420, nome: 'tampo' },
    { w: 2104, h: 420, nome: 'base' },
    { w: 1200, h: 150, nome: 'rodape' },
    { w: 432, h: 375, nome: 'prateleira' },
    { w: 432, h: 375, nome: 'prateleira' },
    { w: 608, h: 257, nome: 'costas' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 385, h: 375, nome: 'eucaplac' },
    { w: 460, h: 296, nome: 'frente gav maior' },
    { w: 460, h: 296, nome: 'frente gav maior' },
    { w: 375, h: 257, nome: 'prateleira menor' },
    { w: 460, h: 147, nome: 'frente gav' },
    { w: 460, h: 147, nome: 'frente gav' },
    { w: 460, h: 147, nome: 'frente gav' },
    { w: 460, h: 147, nome: 'frente gav' },
    { w: 320, h: 150, nome: 'rodape lateral' },
    { w: 320, h: 150, nome: 'rodape lateral' },
]
const finalBlocks = [];
for (const block of blocks) {
    const canFitNormally = block.w <= nodeMaxWidth && block.h <= nodeMaxHeight;
    const canFitVertically = block.h <= nodeMaxWidth && block.w <= nodeMaxHeight;
    if (canFitNormally && canFitVertically) {
        const normalFit = { w: nodeMaxWidth - block.w, h: nodeMaxHeight - block.h };
        const verticalFit = { w: nodeMaxWidth - block.h, h: nodeMaxHeight - block.w };
        const numberCloserToZero = closestToZero([normalFit.w, normalFit.h, verticalFit.w, verticalFit.h]);
        if (numberCloserToZero === normalFit.w || numberCloserToZero === normalFit.h) {
            finalBlocks.push(block);
        } else {
            const temp = block.w;
            block.w = block.h;
            block.h = temp;
            finalBlocks.push(block);
        }
    }
    else if (canFitNormally) {
        finalBlocks.push(block);
    } else if (canFitVertically) {
        const temp = block.w;
        block.w = block.h;
        block.h = temp;
        finalBlocks.push(block);
    }
    if (!canFitVertically && !canFitNormally) {
        finalBlocks.push(block);
    }
}
console.log(finalBlocks);

demoRun(finalBlocks);

/**
 * From a collection of numbers inside an array, returns the closest value to zero.
 */
function closestToZero(numbers) {
    if(!numbers.length){
        return 0;
    }
    
    let closest = 0;
    
    for (let i = 0; i < numbers.length ; i++) {
        if (closest === 0) {
            closest = numbers[i];
        } else if (numbers[i] > 0 && numbers[i] <= Math.abs(closest)) {
            closest = numbers[i];
        } else if (numbers[i] < 0 && - numbers[i] < Math.abs(closest)) {
            closest = numbers[i];
        }
    }
    
    return closest;
}
