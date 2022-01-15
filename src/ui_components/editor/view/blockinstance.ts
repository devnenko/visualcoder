
import { components } from "../../main.js";
import { IMouseEvents } from "../../ui/mouse_events.js";
import { BoundingRect } from "../../ui/bounding_rect.js";
import { Button } from "../../ui/button.js";
import { Canvas } from "../../ui/canvas.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
//import { Line } from "../ui/line.js";
import { Rect} from "../../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EMouseType } from "../../ui/types/mouse.js";
import { IPos } from "../../ui/types/pos.js";
import { View } from "./view.js";
import {  Text } from "../../ui/text.js";
import { Block, blocks, BlockType, PrimitiveBlock} from "../../block.js";
import { Line } from "../../ui/line.js";

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