
import { ViewBlock, PinType } from "./view_block.js";
import { IPos } from "../../../ui/types/pos.js";
import { BlockInstance } from "./blockinstance.js";

export type BlockType=IBlock;

export let blocks:BlockType[]=[];

export function removeBlocks(){
    blocks.splice(0,blocks.length)
}

interface IBlock{
    name:string,
    color:string,
    isLoaded:boolean,
    isMenuHidden:boolean

}

export class PrimitiveBlock implements IBlock{
    public name:string;
    public color:string;
    public isLoaded:boolean=false;
    public isMenuHidden:boolean=false;
    public pins:PinType[]=[];
    constructor(color:string,name:string){
        this.color=color;
        this.name=name;
        blocks.push(this);
        for (const BlockHandler of blockHandlers){
            BlockHandler.updateBlocks(blocks)
        }
    }
}


export class Block implements IBlock{
    public name:string;
    public color:string;
    public isLoaded:boolean=false;
    public isMenuHidden:boolean=false;
    public source:BlockInstance[]=[]; //source node setup
    public inBlock:PrimitiveBlock;
    public outBlock:PrimitiveBlock;
    constructor(color:string,name:string){
        this.color=color;
        this.name=name;
        blocks.push(this);

        this.outBlock=new PrimitiveBlock("blue","out");
        this.outBlock.pins.push(PinType.out);
        this.outBlock.isMenuHidden=true;
        this.source.push(new BlockInstance({x:100,y:100},this.outBlock))

        this.inBlock=new PrimitiveBlock("orange","in");
        this.inBlock.pins.push(PinType.in);
        this.inBlock.isMenuHidden=true;
        this.source.push(new BlockInstance({x:400,y:100},this.inBlock))

        for (const BlockHandler of blockHandlers){
            BlockHandler.updateBlocks(blocks)
        }
    }
}

//make in out pin block which are autoadded to block (maybe use block interface to apply to both or class inheritance)


export interface IBlockHandler{
    updateBlocks(allBlocks:BlockType[]):void
}

export let blockHandlers:IBlockHandler[]=[];
