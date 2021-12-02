import { Canvas } from '../canvas.js';
import { Rect } from './rect.js';

export class HorizBox extends Rect{
    constructor(parent:Rect|null,canvas:Canvas){
        super(parent,canvas);
    }

    public resize(){
        super.resize();
        var children=this.children;
        var previousChild:Rect|null=null;
        for(var currentchild of children){
            if(previousChild!=null){
                currentchild.absEdges.left=previousChild.absEdges.right;
            }

            previousChild=currentchild;
        }
    }

    public res(){
        super.resize();
        var previousChild:Rect|null=null;
        for(var currentchild of this.children){
            if(previousChild!=null){
                currentchild.absEdges.left=previousChild.absEdges.right;
            }
            else{
                currentchild.absEdges.left=this.absEdges.left;
            }
            currentchild.absEdges.top=this.absEdges.top;
            currentchild.absEdges.bottom=this.absEdges.bottom;
            if(currentchild.stretchTo.right==true){
                currentchild.absEdges.right=this.absEdges.right;
            }else{
                currentchild.absEdges.right=currentchild.fixedOffset.right;
            }

            currentchild.applyAbsPos();

            previousChild=currentchild;
        }
    }
}