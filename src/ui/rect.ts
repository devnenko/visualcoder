import { isIMouseHandler, MouseHandler } from "./event_handlers/event_handlers.js";
import { IShape, boundingShape,EObjectType,IShapeOpts,BoundingShape} from "./ui.js";
import { ITransform ,EConstraintsX, EConstraintsY,IEdges,IPos} from "./types/types.js"; 
import { Shape } from "./shape.js";
import { TopBarButton } from "../editor/topbar.js";


//export function instanceOfRectType(object: any): object is RectType {
//    return object.hasOwnProperty('absEdges');
//}

export interface IRectOpts extends IShapeOpts{
    constraintX?:EConstraintsX,
    constraintY?:EConstraintsY,
    snapOffset?:IEdges,
    snapMargin?:number,
    fixedOffsetX?:number,
    fixedOffsetY?:number,
    fixedSizeW?:number,
    fixedSizeH?:number,
    isVisible?:boolean,
    color?:string,
    boxProportion?:IPos
}

export class Rect<Opts extends IRectOpts = IRectOpts> extends Shape{

    //additional display options 
    protected isVisible:boolean=true;
    protected color:string="pink";

    //constraints for calculating absEdges in resize event
    protected constraintX=EConstraintsX.left;
    protected constraintY=EConstraintsY.top;
    protected fixedSizeW:number=100;
    protected fixedSizeH:number=100;
    protected fixedOffsetX:number=0;
    protected fixedOffsetY:number=0;
    protected snapOffset:IEdges={left:0,right:0,top:0,bottom:0};
    protected snapMargin:number=0;
    protected boxProportion:IPos={x:100,y:100};//number between 0 and 100 for fixed proportions

    public absEdges:IEdges={left:0,right:0,top:0,bottom:0};
    public type:EObjectType=EObjectType.Normal;

    //private parentSize:IEdges={left:0,right:0,top:0,bottom:0};

    constructor(){
        super()
    }
    public createConfig(opts: IRectOpts){
        this.addConfig(opts)
    }


    public draw(parent:IShape){
        if(parent instanceof Rect||parent instanceof BoundingShape){
            this.resizeRect(parent);
            this.drawRect();
    
            for (const child of this.children){
                child.draw(this);
            }
        }
        else{
            console.warn("a rect is a child of a shape and doesnt know what to do");
            for (const child of this.children){
                child.draw(this);
            }
        }
    }

    public resizeRect(parent:Rect|BoundingShape){
        if(parent.type==EObjectType.Normal){
            const parentSize=parent.absEdges;
            if(this.constraintX==EConstraintsX.left){
                this.absEdges.left=parentSize.left+this.snapOffset.left+this.fixedOffsetX;
                this.absEdges.right=this.absEdges.left+this.fixedSizeW;
            }
            else if(this.constraintX==EConstraintsX.right){
                this.absEdges.right=parentSize.right-this.snapOffset.right+this.fixedOffsetX+this.fixedOffsetX;
                this.absEdges.left=this.absEdges.right-this.fixedSizeW;
            }
            else if(this.constraintX==EConstraintsX.center){
                this.absEdges.left=parentSize.left+(parentSize.right-parentSize.left)/2-this.fixedSizeW/2+this.fixedOffsetX;
                this.absEdges.right=parentSize.left+(parentSize.right-parentSize.left)/2+this.fixedSizeW/2+this.fixedOffsetX;
            }
            else if(this.constraintX==EConstraintsX.scale){
                this.absEdges.left=parentSize.left+this.snapOffset.left;
                this.absEdges.right=parentSize.right-this.snapOffset.right;
            }

            if(this.constraintY==EConstraintsY.top){
                this.absEdges.top=parentSize.top+this.snapOffset.top+this.fixedOffsetY;
                this.absEdges.bottom=this.absEdges.top+this.fixedSizeH;
            }
            else if(this.constraintY==EConstraintsY.bottom){
                this.absEdges.bottom=parentSize.bottom-this.snapOffset.bottom+this.fixedOffsetY;
                this.absEdges.top=this.absEdges.bottom-this.fixedSizeH;
            }
            else if(this.constraintY==EConstraintsY.center){
                this.absEdges.top=parentSize.top+(parentSize.bottom-parentSize.top)/2-this.fixedSizeH/2+this.fixedOffsetY;
                this.absEdges.bottom=parentSize.top+(parentSize.bottom-parentSize.top)/2+this.fixedSizeH/2+this.fixedOffsetY;
            }
            else if(this.constraintY==EConstraintsY.scale){
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

            if(parent.children[indexInParent-1])//is not first element
            {
                this.absEdges.left=(parent.children[indexInParent-1] as Rect).absEdges.right;
            }
            else//is first element
            {
                this.absEdges.left=parent.absEdges.left;
            }

            if(this.constraintX==EConstraintsX.scale&&parent.children[indexInParent+1]==null){
                this.absEdges.right=parent.absEdges.right;
            }
            else if(this.constraintX==EConstraintsX.scale){
                this.absEdges.right=this.absEdges.left+(parent.getAbsSize().w)*this.boxProportion.x/100;
            }
            else{
                this.absEdges.right=this.absEdges.left+this.fixedSizeW;
            }

        }
        else if(parent.type==EObjectType.VtBox){
            const indexInParent=parent.children.indexOf(this);
            //console.log(indexInParent)
            this.absEdges.left=parent.absEdges.left;
            this.absEdges.right=parent.absEdges.right;
            
            if(parent.children[indexInParent-1])//is not first element
            {
                this.absEdges.top=(parent.children[indexInParent-1] as Rect).absEdges.bottom;
            }
            else//is first element
            {
                this.absEdges.top=parent.absEdges.top;
            }

            if(this.constraintY==EConstraintsY.scale&&parent.children[indexInParent+1]==null){
                this.absEdges.bottom=parent.absEdges.bottom;
            }
            else if(this.constraintY==EConstraintsY.scale){
                this.absEdges.bottom=this.absEdges.top+(parent.getAbsSize().h)*this.boxProportion.y/100;
            }
            else{
                this.absEdges.bottom=this.absEdges.top+this.fixedSizeH;
            }
        }
        this.absEdges.left+=this.snapMargin;
        this.absEdges.right-=this.snapMargin;
        this.absEdges.top+=this.snapMargin;
        this.absEdges.bottom-=this.snapMargin;
    }

    public drawRect(){
        if(this.isVisible==true){
            const transform=this.edgesToDrawdimensions(this.absEdges);

            this.canvas.ctx.beginPath();
            this.canvas.ctx.rect(Math.floor(transform.pos.x), Math.floor(transform.pos.y),Math.floor(transform.size.w),Math.floor(transform.size.h));
            this.canvas.ctx.fillStyle=this.color;
            this.canvas.ctx.fill();
        }
    }
    
    protected edgesToDrawdimensions(edges:IEdges){
        //convert absolute edges to position and size
        let res:ITransform={pos:{x:0,y:0},size:{w:0,h:0}}
        res.pos.x=edges.left;
        res.pos.y=edges.top;
        res.size.w=edges.right-edges.left;
        res.size.h=edges.bottom-edges.top;
        return res;
    }

    public getAbsSize(){
        return {w:this.absEdges.right-this.absEdges.left,h:this.absEdges.bottom-this.absEdges.top};
    }
}