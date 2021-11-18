import { Canvas } from '../canvas.js';

interface EdgesBool {
    top:boolean;
    bottom:boolean;
    left:boolean;
    right:boolean;
}



class EdgesNumber {
    top:number=0;
    bottom:number=0;
    left:number=0;
    right:number=0;

    static getArrays(obj: EdgesNumber) {
        let arrayNames=[]
        let arrayNumbers=[]
        if(obj.left!=null){
            arrayNames.push("left");
            arrayNumbers.push(obj.left);
        }
        if(obj.right!=null){
            arrayNames.push("right");
            arrayNumbers.push(obj.right);
        }
        if(obj.top!=null){
            arrayNames.push("top");
            arrayNumbers.push(obj.top);
        }
        if(obj.bottom!=null){
            arrayNames.push("bottom");
            arrayNumbers.push(obj.bottom);
        }
        return {nameArray:arrayNames,numberArray:arrayNumbers};
    }

    static screenEdges(canvas:Canvas){
        return {
            left:0,
            right:canvas.canvas.width,
            top:0,
            bottom:canvas.canvas.height,
        };
    }
}

export class Rect {
    //needed data
    private canvas:Canvas;

    //final render data
    private absPos={x:0,y:0};
    private absSize={w:100,h:100};
    private color="pink";

    //for relative calculations
    private parent:Rect|null=null;
    private absEdges:EdgesNumber=new EdgesNumber(); //maybe needs to be read by child

    //addit data
    private stretchTo:EdgesBool={left:true,right:true,top:true,bottom:true};
    private fixedOffset:EdgesNumber=new EdgesNumber();

    constructor(parent:Rect|null,canvas:Canvas) {
        this.parent=parent;
        this.canvas=canvas;
    }

    public setParent(parent:Rect|null){
        this.parent=parent;
        this.resize();
    }

    public setCanvas(canvas:Canvas){
        this.canvas=canvas;
    }

    public setColor(color:string){
        this.color=color;
    }

    public setStretchTo(left:boolean,right:boolean,top:boolean,bottom:boolean){
        this.stretchTo={left:left,right:right,top:top,bottom:bottom};
        this.resize();
    }

    public setFixedOffset(left:number,right:number,top:number,bottom:number){
        this.fixedOffset={left:left,right:right,top:top,bottom:bottom};
        this.resize();
    }

    public resize(){
        //maybe make stretch define if they stretch to corner and else its just relative to fixed offset is just relative to othe side
        //would make more sense and less problems
        //should also resize children or we might get problems
        if(this.parent!=null){
            if(this.stretchTo.left==true){
                this.absEdges.left=this.parent.absEdges.left;
            }
            if(this.stretchTo.right==true){
                this.absEdges.right=this.parent.absEdges.right;
            }
            if(this.stretchTo.top==true){
                this.absEdges.top=this.parent.absEdges.top;
            }
            if(this.stretchTo.bottom==true){
                this.absEdges.bottom=this.parent.absEdges.bottom;
            }

            if(this.fixedOffset.left!=0){
                this.absEdges.left=this.parent.absEdges.left+this.fixedOffset.left;
            }
            if(this.fixedOffset.right!=0){
                this.absEdges.right=this.parent.absEdges.left+this.fixedOffset.right;
            }
            if(this.fixedOffset.top!=0){
                this.absEdges.top=this.parent.absEdges.top+this.fixedOffset.top;
            }
            if(this.fixedOffset.bottom!=0){
                this.absEdges.bottom=this.parent.absEdges.top+this.fixedOffset.bottom;
            }
        }
        else{
            this.absEdges=EdgesNumber.screenEdges(this.canvas);
        }

        //convert absolute edges to position and size
        let arrays=EdgesNumber.getArrays(this.absEdges);
        for(var i =0;i<arrays.nameArray.length;i++){
            let name=arrays.nameArray[i];
            let value=arrays.numberArray[i];
            switch (name){
                case 'left':
                    this.absSize.w=this.absSize.w-(value-this.absPos.x);
                    this.absPos.x=value;
                    break;
                case 'right':
                    this.absSize.w=value-this.absPos.x;
                    break;
                case 'top':
                    this.absSize.h=this.absSize.h-(value-this.absPos.y);
                    this.absPos.y=value;
                    break;
                case 'bottom':
                    this.absSize.h=value-this.absPos.y;
                    break;
            }
        }
    }

    public draw(){
        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(this.absPos.x, this.absPos.y, this.absSize.w, this.absSize.h);
        this.canvas.ctx.fillStyle=this.color;
        this.canvas.ctx.fill();
    }
}
