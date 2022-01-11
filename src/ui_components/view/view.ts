import { Block, blockHandlers, blocks } from "../../block.js";
import { components } from "../../main.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { RectType } from "../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { ContextMenu } from "../context_menu/context_menu.js";
import { PinType, ViewBlock } from "./view_block.js";


export class View extends Button{
    public children: ViewBlock[]=[];
    public loadedBlock: Block;
    public actifContextMenu:ContextMenu|null=null;
    public inBlock;
    public outBlock;
    constructor(parent:RectType,canvas:Canvas,firstLoadBlock:Block){
        super(parent,canvas);
        this.color="lightgrey"
        this.loadedBlock=firstLoadBlock;
        this.outBlock=new Block("cyan","out");
        this.outBlock.isHidden=true;
        this.outBlock.pins.push(PinType.out);
        this.inBlock=new Block("green","in");
        this.inBlock.isHidden=true;
        this.inBlock.pins.push(PinType.in);
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        this.load(firstLoadBlock);
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
        
        let hasOutBlock=false;
        for (const child of this.children){
            if(child.block.name=="out"){
                hasOutBlock=true;
            }
        }
        if(hasOutBlock==false){
            const viewBlock=new ViewBlock(this,{x:200,y:200},this.outBlock); //causes an error when loading right after initialization at this line
        }

        let hasInBlock=false;
        for (const child of this.children){
            if(child.block.name=="in"){
                hasInBlock=true;
            }
        }
        if(hasInBlock==false){
            const viewBlock=new ViewBlock(this,{x:600,y:200},this.inBlock); //causes an error when loading right after initialization at this line
        }

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
        this.actifContextMenu?.destroy();
        this.actifContextMenu=null;
        if(type==EMouseType.left||type==EMouseType.touch){
            this.actifContextMenu=new ContextMenu(BoundingRect,this.canvas);
        }
        BoundingRect.drawHierarchy();
    }
}