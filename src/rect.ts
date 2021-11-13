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

    static getArrays(obj: EdgesNullable) {
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

    static add(obj1:EdgesNullable,obj2:EdgesNullable){
        //works only when obj1 doesnt have any null values
        
        let res:EdgesNullable=new EdgesNullable({});
        let arrays=EdgesNullable.getArrays(obj1);
        if(obj2.left!=null){
            res.left=(obj1.left as number)+obj2.left;
        }
        else{
            res.left=obj1.left;
        }

        if(obj2.right!=null){
            res.right=(obj1.right as number)+obj2.right;
        }
        else{
            res.right=obj1.right;
        }

        if(obj2.top!=null){
            res.top=(obj1.right as number)+obj2.top;
        }
        else{
            res.top=obj1.top;
        }

        if(obj2.bottom!=null){
            res.bottom=(obj1.bottom as number)+obj2.bottom;
        }
        else{
            res.bottom=obj1.bottom;
        }
        return res;
    }
}

export class Rect {
    public parent:Rect|null=null;
    public canvas:Canvas|null=null;
    public absPos:Pos={x:0,y:0};
    public absSize:Size={w:100,h:100};

    public relPos={x:80,y:0};
    public relSize:Size={w:40,h:100};

    absEdges:EdgesNullable=new EdgesNullable({});
    relEdges:EdgesNullable=new EdgesNullable({});

    private margin:EdgesNullable=new EdgesNullable({});
    private fixedOffset:EdgesNullable=new EdgesNullable({});

    public color="pink";
    private layer=0;

    constructor() {
    }

    public resize(){
        if(this.parent!=null){
            if(this.margin.left!=null&&this.fixedOffset.left!=null){
                console.log("Error: left of object defined 2 times:")
                console.log(this)
            }
            else if(this.margin.left!=null){
                this.absEdges.left=(this.parent.absEdges.left as number)+this.margin.left;
            }
            else if(this.fixedOffset.left!=null){
                this.absEdges.left=(this.parent.absEdges.left as number)+this.fixedOffset.left;
            }
            else{
                console.log("Error: left of object not defined:")
                console.log(this)
            }

            
            this.absEdges=EdgesNullable.add(this.parent.absEdges,this.relEdges)
        }
        else{
            this.absEdges=new EdgesNullable({left:0,right:(this.canvas as Canvas).canvas.width,top:0,bottom:(this.canvas as Canvas).canvas.height});
        }
        this.setEdgesWorld(this.absEdges);
    }

    public zawardo(edges:EdgesOpt){

    }

    public setEdgesWorld(edges:EdgesNullable){
        let arrays=EdgesNullable.getArrays(edges);
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

    public setParent(parent:Rect){
        this.parent=parent;
    }

    public setMargin(margin:EdgesOpt){
        this.margin=new EdgesNullable(margin);
        let arrays=EdgesNullable.getArrays(this.margin);
        for(var i =0;i<arrays.nameArray.length;i++){
            let name=arrays.nameArray[i];
            let value=arrays.numberArray[i];
            switch (name){
                case 'left':
                    this.relEdges.left=value;
                    break;
                case 'right':
                    this.relEdges.right=-value;
                    //this.setEdgesWorld({right:(this.canvas as Canvas).canvas.width-value})
                    break;
                case 'top':
                    this.relEdges.top=value;
                    //this.setEdgesWorld({top:value})
                    break;
                case 'bottom':
                    this.relEdges.bottom=-value;
                    //this.setEdgesWorld({bottom:(this.canvas as Canvas).canvas.height-value})
                    break;
                }
            }
        this.resize();
        //this.updateMargin();
    }
/* JavaScript
  code  
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
    }

    
    public setFixedOffset(fixedOffset:EdgesOpt){
        //probably doesnt work for left  and top
        this.fixedOffset=new EdgesNullable(fixedOffset);
        this.updateFixedOffset();
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
    */
}
