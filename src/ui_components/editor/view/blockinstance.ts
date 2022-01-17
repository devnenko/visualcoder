import { IPos } from "../../../ui/types/pos";
import { BlockType } from "./block";

export enum PinType{
    in=0,
    out=1
}

export class BlockInstance{
    public relPos:IPos;
    public block:BlockType;
    constructor(pos:IPos,block:BlockType){
        this.relPos=pos;
        this.block=block;
    }
}