import { Block, blockHandlers, blocks } from "./block.js";
import { BoundingRect } from "../../../ui/bounding_shape.js";
import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import { RectType } from "../../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/constraints.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { ContextMenu } from "../context_menu/context_menu.js";
import { BlockInstance } from "./blockinstance.js";
import { PinType, ViewBlock } from "./view_block.js";


export class View extends Button{
    public children: ViewBlock[]=[];
    public loadedBlock: Block|null=null;
    public actifContextMenu:ContextMenu|null=null;
    //public inBlock; //maybe in and out pin could be initialized in the block, when we decide on how many pins it has
    //would make more sense, because the in and out pins are basically reflections of the pins on the block theyre contained in and should update the block on start accordingly
    //public outBlock;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
        this.color="lightgrey"
        //this.outBlock=new Block("cyan","out");
        //this.outBlock.isMenuHidden=true;
        //this.outBlock.pins.push(PinType.out);
        //this.inBlock=new Block("green","in");
        //this.inBlock.isMenuHidden=true;
        //this.inBlock.pins.push(PinType.in);
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale)

    }

    public save(saveToBlock:Block){
        saveToBlock.source=[];
        for (const child of this.children){
            saveToBlock.source.push(new BlockInstance(child.fixedPos,child.block))
        }
        BoundingRect.drawHierarchy();
    }

    public load(loadFromBlock:Block){
        if(this.loadedBlock!=null){
            this.loadedBlock.isLoaded=false;
        }
        loadFromBlock.isLoaded=true;
        this.loadedBlock=loadFromBlock;
        for (const child of this.children){
            child.destroy();
        }
        console.log(this.children)
        this.children=[]
        for (const blockInstances of loadFromBlock.source){
            this.children.push(new ViewBlock(blockInstances.relPos,blockInstances.block))
        }

        //let hasOutBlock=false;
        //for (const child of this.children){
        //    if(child.block.name=="out"){
        //        hasOutBlock=true;
        //    }
        //}
        //if(hasOutBlock==false){
        //    const viewBlock=new ViewBlock(this,{x:200,y:200},this.outBlock); //causes an error when loading right after initialization at this line
        //}
//
        //let hasInBlock=false;
        //for (const child of this.children){
        //    if(child.block.name=="in"){
        //        hasInBlock=true;
        //    }
        //}
        //if(hasInBlock==false){
        //    const viewBlock=new ViewBlock(this,{x:600,y:200},this.inBlock); //causes an error when loading right after initialization at this line
        //}


        for (const BlockHandler of blockHandlers){
            BlockHandler.updateBlocks(blocks)
        }
        BoundingRect.drawHierarchy();
    }

    public changeActiveBlock(loadFromBlock:Block){
        if(this.loadedBlock!=null){
            this.save(this.loadedBlock);
        }
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