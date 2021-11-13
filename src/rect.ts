import { Canvas } from './canvas.js';

interface Pos {
    x:number;
    y:number;
}

interface NullablePos {
    x:number|null;
    y:number|null;
}

interface Size {
    w:number;
    h:number;
}

interface NullableSize {
    w:number|null;
    h:number|null;
}

interface DistanceTo {
    top?:number;
    bottom?:number;
    left?:number;
    right?:number;
}

export class Rect {
    //public parent:Rect;
    public canvas:Canvas|null=null;
    public absPos:Pos={x:0,y:0};
    public absSize:Size={w:40,h:20};

    public relPos={x:0,y:0};

    private margin:DistanceTo={};

    public color="pink";
    private layer=0;

    constructor() {

    }
    public setMargin(margin:DistanceTo){
        this.margin=margin;
        this.absSize.w=(this.canvas as Canvas).canvas.width;
        //this.canvas?.updateContent();
    }
}