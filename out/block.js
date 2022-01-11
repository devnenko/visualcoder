export let blocks = [];
export function removeBlocks() {
    blocks.splice(0, blocks.length);
}
export class Block {
    constructor(color, name) {
        this.pins = [];
        this.isLoaded = false;
        this.isHidden = false;
        this.source = []; //source node setup
        this.color = color;
        this.name = name;
        blocks.push(this);
        for (const BlockHandler of blockHandlers) {
            BlockHandler.updateBlocks(blocks);
        }
    }
}
export let blockHandlers = [];
