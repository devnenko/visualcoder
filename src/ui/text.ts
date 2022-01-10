import { IMouseEvents, instanceOfIMouseEvents } from "./mouse_events.js";
import { Button } from "./button.js";
import { Canvas } from "./canvas.js";
import { HorizontalBox } from "./horizontal_box.js";
import {IShape, EObjectType} from "./shape.js";
import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";
import { ISize } from "./types/size.js";
import { ITransform } from "./types/transform.js";
import { instanceOfRectType, RectType } from "./rect.js";


export class Text implements IShape{

    discriminator1: 'IShape'='IShape';

    public canvas:Canvas;
    public children:never[]=[];

    //additional display options 
    public isVisible:boolean=true;
    public color:string="pink";
    public text:string="Empty Text"

    public size:number=25;

    public absEdges={left:0,right:0,top:0,bottom:0};

    public parentSize:IEdges={left:0,right:0,top:0,bottom:0};

    constructor(parent:RectType,canvas:Canvas){
        this.parentSize=parent.absEdges;

        parent.children.push(this); //set this as a child of parent to create an object tree
        this.canvas=canvas;
    }

    checkOverlapp(pos:IPos): Button[] {
        let all:Button[]=[];
        

        for (const child of this.children){
            all=all.concat((child as IShape).checkOverlapp(pos) as Button[])
        }
        return all;
    }

    //public checkOverlapp(pos:IPos):Button[] {
    //    let all:Button[]=[];
    //    for (const child of this.children){
    //        all=all.concat(child.checkOverlapp(pos) as Button[])
    //    }
    //    all=all.slice().reverse();
    //    return all;
    //}

    protected draw(){
        if(this.isVisible==true){
            const transform=this.edgesToDrawdimensions(this.absEdges);

            this.canvas.ctx.textAlign = "start";
            this.canvas.ctx.fillStyle=this.color;
            this.canvas.ctx.font = this.size+"px Arial";
            this.canvas.ctx.fillText(this.text, transform.pos.x, transform.pos.y+this.size);
        }
    }

    public drawHierarchy(parent:IShape){
        if(instanceOfRectType(parent)){
            this.resize(parent);
            this.draw();
        }
    }

    protected resize(parent:RectType){
        this.absEdges=parent.absEdges;




        //for (const child of this.children){
        //    child.resize(this.absEdges);
        //}
    }

    private edgesToDrawdimensions(edges:IEdges){
        //convert absolute edges to position and size
        let res:ITransform={pos:{x:0,y:0},size:{w:0,h:0}}
        res.pos.x=edges.left;
        res.pos.y=edges.top;
        res.size.w=edges.right-edges.left;
        res.size.h=edges.bottom-edges.top;
        return res;
    }


}