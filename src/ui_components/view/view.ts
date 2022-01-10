import { Block, blockHandlers, blocks } from "../../block.js";
import { components } from "../../main.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { RectType } from "../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { ViewBlock } from "./view_block.js";


export class View extends Button{
    public children: ViewBlock[]=[];
    public loadedBlock: Block;
    constructor(parent:RectType,canvas:Canvas,firstLoadBlock:Block){
        super(parent,canvas);
        this.color="lightgrey"
        this.loadedBlock=firstLoadBlock;
        this.load(firstLoadBlock);
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        console.log(this)
    }

    public save(saveToBlock:Block){
        saveToBlock.source=this.children.slice();
        BoundingRect.drawHierarchy();
        console.log("save");
    }

    public load(loadFromBlock:Block){
        this.loadedBlock.isLoaded=false;
        loadFromBlock.isLoaded=true;
        this.loadedBlock=loadFromBlock;
        this.children=loadFromBlock.source;
        console.log("load");
        //console.log(blocks)
        //console.log(loadFromBlock)
        //console.log(blocks[0])
        for (const BlockHandler of blockHandlers){
            BlockHandler.updateBlocks(blocks)
        }
        BoundingRect.drawHierarchy();
    }

    public changeActiveBlock(loadFromBlock:Block){
        this.save(this.loadedBlock);
        this.load(loadFromBlock);
    }

    onMouseDown(type:EMouseType): void {
    }

    onMouseMoveDown(type:EMouseType): void {
    }

    onMouseUp(type:EMouseType): void {
    }
}