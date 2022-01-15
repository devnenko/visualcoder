import { PinType } from "./view_block.js";
import { BlockInstance } from "./blockinstance.js";
export let blocks = [];
export function removeBlocks() {
    blocks.splice(0, blocks.length);
}
export class PrimitiveBlock {
    constructor(color, name) {
        this.isLoaded = false;
        this.isMenuHidden = false;
        this.pins = [];
        this.color = color;
        this.name = name;
        blocks.push(this);
        for (const BlockHandler of blockHandlers) {
            BlockHandler.updateBlocks(blocks);
        }
    }
}
export class Block {
    constructor(color, name) {
        this.isLoaded = false;
        this.isMenuHidden = false;
        this.source = []; //source node setup
        this.color = color;
        this.name = name;
        blocks.push(this);
        this.outBlock = new PrimitiveBlock("blue", "out");
        this.outBlock.pins.push(PinType.out);
        this.outBlock.isMenuHidden = true;
        this.source.push(new BlockInstance({ x: 100, y: 100 }, this.outBlock));
        this.inBlock = new PrimitiveBlock("orange", "in");
        this.inBlock.pins.push(PinType.in);
        this.inBlock.isMenuHidden = true;
        this.source.push(new BlockInstance({ x: 400, y: 100 }, this.inBlock));
        for (const BlockHandler of blockHandlers) {
            BlockHandler.updateBlocks(blocks);
        }
    }
}
export let blockHandlers = [];
