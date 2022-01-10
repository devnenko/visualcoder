import { EConstraintsX, EConstraintsY } from "./types/constraints.js";
export class InvisRect {
    constructor(parent) {
        this.discriminator1 = 'IObject';
        this.children = [];
        //constraints for calculating absEdges in resize event
        this.constX = EConstraintsX.left;
        this.constY = EConstraintsY.top;
        this.fixedSize = { w: 100, h: 100 };
        this.fixedPos = { x: 0, y: 0 };
        this.snapOffset = { left: 0, right: 0, top: 0, bottom: 0 };
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = { left: 0, right: 0, top: 0, bottom: 0 };
        this.parentSize = parent.absEdges;
        parent.children.push(this); //set this as a child of parent to create an object tree
    }
    //public checkOverlapp(pos:IPos):Button[] {
    //    let all:Button[]=[];
    //    for (const child of this.children){
    //        all=all.concat(child.checkOverlapp(pos) as Button[])
    //    }
    //    all=all.slice().reverse();
    //    return all;
    //}
    setConstraints(constX, constY) {
        this.constX = constX;
        this.constY = constY;
    }
    setConstraintsInfo(fixedPos, fixedSize, snapOffset) {
        if (fixedPos) {
            this.fixedPos = fixedPos;
        }
        if (fixedSize) {
            this.fixedSize = fixedSize;
        }
        if (snapOffset) {
            this.snapOffset = snapOffset;
        }
    }
    resize(parentSize) {
        this.parentSize = parentSize;
        if (this.constX == EConstraintsX.left) {
            this.absEdges.left = parentSize.left + this.snapOffset.left + this.fixedPos.x;
            this.absEdges.right = this.absEdges.left + this.fixedSize.w;
        }
        else if (this.constX == EConstraintsX.right) {
            this.absEdges.right = parentSize.right - this.snapOffset.right + this.fixedPos.x + this.fixedPos.x;
            this.absEdges.left = this.absEdges.right - this.fixedSize.w;
        }
        else if (this.constX == EConstraintsX.center) {
            this.absEdges.left = parentSize.left + (parentSize.right - parentSize.left) / 2 - this.fixedSize.w / 2 + this.fixedPos.x;
            this.absEdges.right = parentSize.left + (parentSize.right - parentSize.left) / 2 + this.fixedSize.w / 2 + this.fixedPos.x;
        }
        else if (this.constX == EConstraintsX.scale) {
            this.absEdges.left = parentSize.left + this.snapOffset.left;
            this.absEdges.right = parentSize.right - this.snapOffset.right;
        }
        if (this.constY == EConstraintsY.top) {
            this.absEdges.top = parentSize.top + this.snapOffset.top + this.fixedPos.y;
            this.absEdges.bottom = this.absEdges.top + this.fixedSize.h;
        }
        else if (this.constY == EConstraintsY.bottom) {
            this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom + this.fixedPos.y;
            this.absEdges.top = this.absEdges.bottom - this.fixedSize.h;
        }
        else if (this.constY == EConstraintsY.center) {
            this.absEdges.top = parentSize.top + (parentSize.bottom - parentSize.top) / 2 - this.fixedSize.h / 2 + this.fixedPos.y;
            this.absEdges.bottom = parentSize.top + (parentSize.bottom - parentSize.top) / 2 + this.fixedSize.h / 2 + this.fixedPos.y;
        }
        else if (this.constY == EConstraintsY.scale) {
            this.absEdges.top = parentSize.top + this.snapOffset.top;
            this.absEdges.bottom = parentSize.bottom - this.snapOffset.bottom;
        }
        //for (const child of this.children){
        //    child.resize(this.absEdges);
        //}
    }
}
/*

import { Canvas } from "./canvas.js";
import { IShape, ShapeUtils,IEdges,ResizeType, Anchor} from "./shape.js";


export class Rect implements IShape{
    public canvas:Canvas;
    public parent:Rect|BoundingRect;
    public children:Rect[]=[];
    public snapOffset={left:0,right:0,top:0,bottom:0};
    public fixedSize={w:0,h:0};
    public constraints={left:ResizeType.snap,right:ResizeType.snap,top:ResizeType.snap,bottom:ResizeType.snap};
    public anchor:Anchor=Anchor.topmid;
    public absEdges={left:0,right:0,top:0,bottom:0};
    public color="pink";

    constructor(parent:Rect|BoundingRect,canvas:Canvas){
        this.parent=parent;
        parent.children.push(this);
        this.canvas=canvas;
        canvas.rects.push(this);
    }

    public resize(){
        let absEdges={
            left: 0,
            right: 100,
            top: 0,
            bottom: 100
        };
        let parent=this.parent;

        if(this.constraints.left==ResizeType.snap){
            absEdges.left=parent.absEdges.left+this.snapOffset.left;
        }
        if(this.constraints.right==ResizeType.snap){
            absEdges.right=parent.absEdges.right-this.snapOffset.right;
        }
        if(this.constraints.top==ResizeType.snap){
            absEdges.top=parent.absEdges.top+this.snapOffset.top;
        }
        if(this.constraints.bottom==ResizeType.snap){
            absEdges.bottom=parent.absEdges.bottom-this.snapOffset.bottom;
        }

        if(this.constraints.left==ResizeType.fixed){
            absEdges.left=absEdges.right-this.fixedSize.w;
        }
        else if(this.constraints.right==ResizeType.fixed){
            absEdges.right=absEdges.left+this.fixedSize.w;
        }
        if(this.constraints.top==ResizeType.fixed){
            absEdges.top=absEdges.bottom-this.fixedSize.h;
        }
        else if(this.constraints.bottom==ResizeType.fixed){
            absEdges.bottom=absEdges.top+this.fixedSize.h;
        }


        this.absEdges=absEdges;

        for (const child of this.children){
            child.resize();
        }
    };

    draw(){
        const size =ShapeUtils.EdgesToDrawDimensions(this.absEdges)

        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(size.x, size.y, size.w, size.h);
        this.canvas.ctx.fillStyle=this.color;
        this.canvas.ctx.fill();

        for (const child of this.children){
            child.draw();
        }
    };

    erase(){
        const size =ShapeUtils.EdgesToDrawDimensions(this.absEdges)

        this.canvas.ctx.clearRect(size.x, size.y, size.w, size.h);

        for (const child of this.children){
            child.erase();
        }
    };

    checkOverlapp(x:number,y:number){
        let all:Rect[]=[];
        if(this.absEdges.left<x&&this.absEdges.right>x&&this.absEdges.top<y&&this.absEdges.bottom>y){
            all.push(this);
        }
        for (const child of this.children){
            if(child.checkOverlapp(x,y)!=null){
                all=all.concat(child.checkOverlapp(x,y) as Rect[])
            }
        }
        if(all!=[]){
            return all;
        }
        return null;
    }
}


export class BoundingRect implements IShape{

    public children:Rect[]=[];
    public absEdges={left:0,right:0,top:0,bottom:0};

    constructor(){
        this.resize();
        window.addEventListener('resize', this.resize.bind(this));
    }

    resize(){
        let absEdges={
            left: 0,
            right: 100,
            top: 0,
            bottom: 100
        };

        absEdges.left=0;
        absEdges.right=window.innerWidth;
        absEdges.top=0;
        absEdges.bottom=window.innerHeight;

        this.absEdges=absEdges;

        for (const child of this.children){
            child.resize();
        }
    };

    checkOverlapp(x:number,y:number){
        let all:Rect[]=[];
        for (const child of this.children){
            if(child.checkOverlapp(x,y)!=null){
                all=all.concat(child.checkOverlapp(x,y) as Rect[])
            }
        }
        all=all.slice().reverse();
        return all;
    }

    draw(){
        for (const child of this.children){
            child.draw();
        }
    }
    erase(){};

    update(){
        this.resize();
        this.draw();
    }
}

*/ 
