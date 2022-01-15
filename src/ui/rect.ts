import { IMouseEvents, instanceOfIMouseEvents } from "./mouse_events.js";
import { Button } from "./button.js";
import { Canvas } from "./canvas.js";
import { BoundingRect } from "./bounding_rect.js";
import { HorizontalBox } from "./horizontal_box.js";
import { IShape, EObjectType} from "./shape.js";
import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
import { IEdges } from "./types/edges.js";
import { IPos } from "./types/pos.js";
import { ISize } from "./types/size.js";
import { ITransform } from "./types/transform.js";

export type RectType=Rect|typeof BoundingRect;

export function instanceOfRectType(object: any): object is RectType {
    return object.hasOwnProperty('absEdges');
}


export class Rect implements IShape{

    discriminator1: 'IShape'='IShape';
    type:EObjectType=EObjectType.Normal;

    public canvas:Canvas;
    public children:IShape[]=[];

    //additional display options 
    public isVisible:boolean=true;
    public color:string="pink";

    //constraints for calculating absEdges in resize event
    public constX=EConstraintsX.left;
    public constY=EConstraintsY.top;
    public fixedSize:ISize={w:100,h:100};
    public fixedPos:IPos={x:0,y:0};
    public snapOffset:IEdges={left:0,right:0,top:0,bottom:0};
    public margin:number=0;

    public absEdges={left:0,right:0,top:0,bottom:0};

    public parentSize:IEdges={left:0,right:0,top:0,bottom:0};
    public parent:IShape;

    constructor(parent:RectType,canvas:Canvas){
        this.parentSize=parent.absEdges;

        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent=parent;
        this.canvas=canvas;
    }

    checkOverlapp(pos:IPos): Button[] {
        let all:Button[]=[];
        

        for (const child of this.children){
            all=all.concat((child as IShape).checkOverlapp(pos) as Button[])
        }
        return all;
    }

    destroy(){
        this.parent.children.splice(this.parent.children.indexOf(this),1);
        if(this.parent.children.indexOf(this)==-1){
            //console.log("error")
        }
    }

    public setConstraints(constX:EConstraintsX,constY:EConstraintsY){
        this.constX=constX;
        this.constY=constY;
    }

    public setConstraintsInfo(fixedPos?:IPos,fixedSize?:ISize,snapOffset?:IEdges){
        if(fixedPos){
            this.fixedPos=fixedPos;
        }
        if(fixedSize){
            this.fixedSize=fixedSize;
        }
        if(snapOffset){
            this.snapOffset=snapOffset;
        }
    }

    protected draw(){
        if(this.isVisible==true){
            const transform=this.edgesToDrawdimensions(this.absEdges);
    
            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(transform.pos.x, transform.pos.y,transform.size.w,transform.size.h);
            this.canvas.ctx.fillStyle=this.color;
            this.canvas.ctx.fill();
        }
    }

    public drawHierarchy(parent:IShape){
        if(instanceOfRectType(parent)){
            this.resize(parent);
            this.draw();
    
            for (const child of this.children){
                child.drawHierarchy(this);
            }
        }
        else{
            throw new Error('Shape cannot be parent of Rect.');
        }
    }

    protected resize(parent:RectType){
        if(parent.type==EObjectType.Normal){
            const parentSize=parent.absEdges;
            if(this.constX==EConstraintsX.left){
                this.absEdges.left=parentSize.left+this.snapOffset.left+this.fixedPos.x;
                this.absEdges.right=this.absEdges.left+this.fixedSize.w;
            }
            else if(this.constX==EConstraintsX.right){
                this.absEdges.right=parentSize.right-this.snapOffset.right+this.fixedPos.x+this.fixedPos.x;
                this.absEdges.left=this.absEdges.right-this.fixedSize.w;
            }
            else if(this.constX==EConstraintsX.center){
                this.absEdges.left=parentSize.left+(parentSize.right-parentSize.left)/2-this.fixedSize.w/2+this.fixedPos.x;
                this.absEdges.right=parentSize.left+(parentSize.right-parentSize.left)/2+this.fixedSize.w/2+this.fixedPos.x;
            }
            else if(this.constX==EConstraintsX.scale){
                this.absEdges.left=parentSize.left+this.snapOffset.left;
                this.absEdges.right=parentSize.right-this.snapOffset.right;
            }

            if(this.constY==EConstraintsY.top){
                this.absEdges.top=parentSize.top+this.snapOffset.top+this.fixedPos.y;
                this.absEdges.bottom=this.absEdges.top+this.fixedSize.h;
            }
            else if(this.constY==EConstraintsY.bottom){
                this.absEdges.bottom=parentSize.bottom-this.snapOffset.bottom+this.fixedPos.y;
                this.absEdges.top=this.absEdges.bottom-this.fixedSize.h;
            }
            else if(this.constY==EConstraintsY.center){
                this.absEdges.top=parentSize.top+(parentSize.bottom-parentSize.top)/2-this.fixedSize.h/2+this.fixedPos.y;
                this.absEdges.bottom=parentSize.top+(parentSize.bottom-parentSize.top)/2+this.fixedSize.h/2+this.fixedPos.y;
            }
            else if(this.constY==EConstraintsY.scale){
                this.absEdges.top=parentSize.top+this.snapOffset.top;
                this.absEdges.bottom=parentSize.bottom-this.snapOffset.bottom;
            }

            if(this.absEdges.left<parent.absEdges.left){
                this.absEdges.left=parent.absEdges.left;
            }
            if(this.absEdges.right>parent.absEdges.right){
                this.absEdges.right=parent.absEdges.right;
            }
            if(this.absEdges.top<parent.absEdges.top){
                this.absEdges.top=parent.absEdges.top;
            }
            if(this.absEdges.bottom>parent.absEdges.bottom){
                this.absEdges.bottom=parent.absEdges.bottom;
            }
        }
        else if(parent.type==EObjectType.HzBox){
            const indexInParent=parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.top=parent.absEdges.top;
            this.absEdges.bottom=parent.absEdges.bottom;
            if(parent.children[indexInParent-1]){
                this.absEdges.left=(parent.children[indexInParent-1] as Rect).absEdges.right;
            }
            else{
                this.absEdges.left=parent.absEdges.left;
            }
            if(parent.children[indexInParent+1]==null&&this.constX==EConstraintsX.scale){
                this.absEdges.right=parent.absEdges.right;
            }
            else{
                this.absEdges.right=this.absEdges.left+this.fixedSize.w;
            }
        }
        else if(parent.type==EObjectType.VtBox){
            const indexInParent=parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.left=parent.absEdges.left;
            this.absEdges.right=parent.absEdges.right;
            if(parent.children[indexInParent-1]){
                this.absEdges.top=(parent.children[indexInParent-1] as Rect).absEdges.bottom;
            }
            else{
                this.absEdges.top=parent.absEdges.top;
            }
            if(parent.children[indexInParent+1]==null&&this.constY==EConstraintsY.scale){
                this.absEdges.bottom=parent.absEdges.bottom;
            }
            else{
                this.absEdges.bottom=this.absEdges.top+this.fixedSize.h;
            }
        }
        this.absEdges.left+=this.margin;
        this.absEdges.right-=this.margin;
        this.absEdges.top+=this.margin;
        this.absEdges.bottom-=this.margin;
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