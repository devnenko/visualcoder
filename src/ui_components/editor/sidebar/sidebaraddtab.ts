import { Button } from "../../../ui/button.js";
import { Canvas } from "../../../ui/canvas.js";
import {  Rect } from "../../../ui/rect.js";
import {  Text } from "../../../ui/text.js";
import { VerticalBox } from "../../../ui/vertical_box.js";
import { ViewBlock, PinType } from "../view/view_block.js";
import { EConstraintsX,EConstraintsY } from '../../../ui/types/constraints.js';
import { BoundingRect} from "../../../ui/bounding_rect.js";
import { MouseHandler } from "../../../ui/event_handlers/mouse.js";
import { Block } from "../view/block.js";
import { EMouseType } from "../../../ui/types/mouse.js";
import { SideBarTab } from "./sidebartab.js";
import { SideBar } from "./sidebar.js";

export class SideBarAddTab extends Button{
    public origColor:string;
    public parent2:SideBar;
    constructor(parent:SideBar){
        super(parent,parent.canvas);
        this.parent2=parent;
        this.setConstraints(EConstraintsX.scale,EConstraintsY.top)
        this.setConstraintsInfo(undefined,{w:0,h:50});
        this.color="blue";
        this.origColor="blue";
        const text=new Text(this,this.canvas)
        text.color="black"
        text.text="add tab";
    }

    arraymove(arr:any[], fromIndex:number, toIndex:number) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }

    getRandomColor(){
        return Math.floor(Math.random()*16777215).toString(16);
    }

    onMouseDown(type:EMouseType){
        if(type==EMouseType.left){
            new Block(this.getRandomColor(),"test1");
        }
        BoundingRect.drawHierarchy();
    }
    onMouseMoveDown(type:EMouseType){
    }
    onMouseUp(type:EMouseType){

        BoundingRect.drawHierarchy();
    }
}