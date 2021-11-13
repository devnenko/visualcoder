import { Canvas } from './canvas.js';

interface Pos {
    x:number;
    y:number;
}

interface Size {
    w:number;
    h:number;
}

interface EdgesOpt {
    top?:number;
    bottom?:number;
    left?:number;
    right?:number;
}

class EdgesNullable {
    top:number|null;
    bottom:number|null;
    left:number|null;
    right:number|null;

    constructor(obj: EdgesOpt){
        this.top=obj.top||null;
        this.bottom=obj.bottom||null;
        this.left=obj.left||null;
        this.right=obj.right||null;
        if(obj.left==0){
            this.left=0;
        }
        if(obj.right==0){
            this.right=0;
        }
        if(obj.top==0){
            this.top=0;
        }
        if(obj.bottom==0){
            this.bottom=0;
        }
    }

    getArrays() {
        let arrayNames=[]
        let arrayNumbers=[]
        if(this.left!=null){
            arrayNames.push("left");
            arrayNumbers.push(this.left);
        }
        if(this.right!=null){
            arrayNames.push("right");
            arrayNumbers.push(this.right);
        }
        if(this.top!=null){
            arrayNames.push("top");
            arrayNumbers.push(this.top);
        }
        if(this.bottom!=null){
            arrayNames.push("bottom");
            arrayNumbers.push(this.bottom);
        }
        return {nameArray:arrayNames,numberArray:arrayNumbers};
    }
}

export class Rect {
    //public parent:Rect;
    public canvas:Canvas|null=null;
    public absPos:Pos={x:0,y:0};
    public absSize:Size={w:100,h:100};

    public relPos={x:80,y:0};
    public relSize:Size={w:40,h:100};

    private margin:EdgesNullable=new EdgesNullable({});
    private fixedOffset:EdgesNullable=new EdgesNullable({});

    public color="pink";
    private layer=0;

    constructor() {

    }

    public setParent(){

    }

    public resizeContent(){
        this.updateMargin();
        this.updateFixedOffset();
    }

    public optToNullable(distanceTo:EdgesOpt){
        this.margin=new EdgesNullable(distanceTo);
        return this.margin.getArrays();
    }

    public setMargin(margin:EdgesOpt){
        this.margin=new EdgesNullable(margin);
        this.updateMargin();
    }

    
    public setFixedOffset(fixedOffset:EdgesOpt){
        //probably doesnt work for left  and top
        this.fixedOffset=new EdgesNullable(fixedOffset);
        this.updateFixedOffset();
    }

    public updateMargin(){
        let arrays=this.margin.getArrays();
        for(var i =0;i<arrays.nameArray.length;i++){
            let name=arrays.nameArray[i];
            let value=arrays.numberArray[i];
            switch (name){
                case 'left':
                    this.setEdgesWorld({left:value})
                    break;
                case 'right':
                    this.setEdgesWorld({right:(this.canvas as Canvas).canvas.width-value})
                    break;
                case 'top':
                    this.setEdgesWorld({top:value})
                    break;
                case 'bottom':
                    this.setEdgesWorld({bottom:(this.canvas as Canvas).canvas.height-value})
                    break;
            }
        }
    }

    public updateFixedOffset(){
        if(this.fixedOffset.left!=null){
            this.setEdgesWorld({left:this.fixedOffset.left})
        }
        if(this.fixedOffset.right!=null){
            this.setEdgesWorld({right:this.fixedOffset.right})
        }
        if(this.fixedOffset.top!=null){
            this.setEdgesWorld({top:this.fixedOffset.top})
        }
        if(this.fixedOffset.bottom!=null){
            this.setEdgesWorld({bottom:this.fixedOffset.bottom})
        }
    }

    public setEdgesWorld(edges:EdgesOpt){
        let arrays=new EdgesNullable(edges).getArrays();
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