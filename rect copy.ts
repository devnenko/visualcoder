import { Canvas } from '../canvas.js';

interface EdgesOpt {
    top?:number;
    bottom?:number;
    left?:number;
    right?:number;
}

interface EdgesBoolOpt {
    top?:true;
    bottom?:true;
    left?:true;
    right?:true;
}

class EdgesBool {
    top:boolean;
    bottom:boolean;
    left:boolean;
    right:boolean;

    constructor(obj: EdgesBoolOpt){
        this.top=obj.top||false;
        this.bottom=obj.bottom||false;
        this.left=obj.left||false;
        this.right=obj.right||false;
    }
}

class Other{
    shouldResize:boolean;
    inOffsetAmount:number;
    constructor(shouldResize:boolean,inOffsetAmount:number){
        this.shouldResize=shouldResize;
        this.inOffsetAmount=inOffsetAmount;
    }
}

class Test {
    left:Other;
    right:Other;
    top:Other;
    bottom:Other;

    constructor(left:Other,right:Other,top:Other,bottom:Other){
        this.left=left;
        this.right=right;
        this.top=top;
        this.bottom=bottom;
    }
}



class Edges {
    top:number;
    bottom:number;
    left:number;
    right:number;

    constructor(obj: EdgesOpt){
        this.top=obj.top||0;
        this.bottom=obj.bottom||0;
        this.left=obj.left||0;
        this.right=obj.right||0;
    }

    static getArrays(obj: Edges) {
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

    static add(obj1:Edges,obj2:Edges){
        return new Edges({
            left:obj1.left+obj2.left,
            right:obj1.right+obj2.right,
            top:obj1.top+obj2.top,
            bottom:obj1.bottom+obj2.bottom,
        });
    }

    static screenEdges(canvas:Canvas){
        return new Edges({
            left:0,
            right:canvas.canvas.width,
            top:0,
            bottom:canvas.canvas.height,
        });
    }
}

export class Rect {
    //needed data
    public canvas:Canvas|null=null;

    //final render data
    public absPos={x:0,y:0};
    public absSize={w:100,h:100};
    public color="pink";

    //for relative calculations
    private parent:Rect|null=null;
    public absEdges:Edges=new Edges({});
    public relEdges:Edges=new Edges({});

    //addit data
    public stretchTo:EdgesBool=new EdgesBool({});
    public fixedOffset:Edges=new Edges({});

    constructor(parent:Rect|null,edges:Test) {
        this.parent=parent;
    }

    public setStretchTo(obj:EdgesBoolOpt){
        this.stretchTo=new EdgesBool(obj);
        this.resize();
    }

    public setFixedOffset(obj:EdgesOpt){
        this.fixedOffset=new Edges(obj);
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
            this.absEdges=Edges.screenEdges(this.canvas as Canvas);
        }

        //convert absolute edges to position and size
        let arrays=Edges.getArrays(this.absEdges);
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
}
