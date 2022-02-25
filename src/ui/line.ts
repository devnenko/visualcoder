
import { Canvas } from "./canvas.js";
import { Rect} from "./rect.js";
import { IShape } from "./shape.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";

export class Line implements IShape{

    discriminator1: 'IShape'='IShape';

    public canvas:Canvas;
    public children:IShape[]=[];

    public fixedPos1:IPos={x:0,y:0};
    public fixedPos2:IPos={x:0,y:0};

    public obj1:Rect|null=null;
    public obj2:Rect|null=null;

    //additional display options 
    public isVisible:boolean=true;
    public color:string="pink";

    public parent:IShape;

    constructor(drawParent:IShape,canvas:Canvas){

        drawParent.children.push(this); //set this as a child of parent to create an object tree
        this.parent=drawParent;
        this.canvas=canvas;
    }



    //overlappHierarchy(pos:IPos): Button[] {
    //    return [];
    //}

    public destroy(){
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
        //console.log("dest")

        const len=this.children.length

        for(let i=0;i<len;i++){
            this.children[0].destroy();
        }
        this.parent.children.splice(this.parent.children.indexOf(this),1);
        //this.parent.children.splice(this.parent.children.indexOf(this),1);
    }

    protected draw(){
        if(this.isVisible==true){

            this.canvas.ctx.beginPath();
            this.canvas.ctx.lineWidth = 10;
            this.canvas.ctx.strokeStyle = this.color;
            if(this.obj1==null){
                this.canvas.ctx.moveTo(this.fixedPos1.x, this.fixedPos1.y);
            }
            else{
                this.canvas.ctx.moveTo(this.obj1.absEdges.left+(this.obj1.absEdges.right-this.obj1.absEdges.left)/2,this.obj1.absEdges.top+(this.obj1.absEdges.bottom-this.obj1.absEdges.top)/2)
            }

            if(this.obj2==null){
                this.canvas.ctx.lineTo(this.fixedPos2.x, this.fixedPos2.y);
            }
            else{
                this.canvas.ctx.lineTo(this.obj2.absEdges.left+(this.obj2.absEdges.right-this.obj2.absEdges.left)/2,this.obj2.absEdges.top+(this.obj2.absEdges.bottom-this.obj2.absEdges.top)/2)
            }
    
            this.canvas.ctx.stroke();
        }
    }

    public drawHierarchy(parent:IShape){
        this.draw();
    }
}