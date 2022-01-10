import { components } from "./main.js";
import { ViewBlock, PinType } from "./ui_components/view/view_block.js";
import { IPos } from "./ui/types/pos.js";



export let blocks:Block[]=[];

export function removeBlocks(){
    blocks.splice(0,blocks.length)
}

export class Block{
    public name:string;
    public color:string;
    public pins:PinType[]=[];
    public isLoaded:boolean=false;
    public source:ViewBlock[]=[]; //source node setup
    constructor(color:string,name:string){
        this.color=color;
        this.name=name;
        blocks.push(this);
        for (const BlockHandler of blockHandlers){
            BlockHandler.updateBlocks(blocks)
        }
    }
}

//make in out pin block which are autoadded to block (maybe use block interface to apply to both or class inheritance)


export interface IBlockHandler{
    updateBlocks(allBlocks:Block[]):void
}

export let blockHandlers:IBlockHandler[]=[];
