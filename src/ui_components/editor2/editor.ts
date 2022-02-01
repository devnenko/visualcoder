import { editor } from "../../main.js";
import { Canvas } from "../../ui/canvas.js";
import { MouseHandler } from "../../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { boundingShape, instanceOfShape, IShape, Shape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { IPos } from "../../ui/types/pos.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { CBButton, ContentBrowser } from "./content_browser.js";
import { ResizeBar } from "./resize_bar.js";
import { View } from "./view.js";

export class Editor extends HorizontalBox{
    public contentBrowser;
    public views:View[]=[];
    public selectedView;
    public resizeBar;
    public previewRect:Rect|null=null;
    public overlappPos:boolean=true;
    constructor(parent:IShape,canvas:Canvas){
        super(parent,canvas)
        this.setConstraints(EConstraintsX.scale,EConstraintsY.scale);
        this.isVisible=false;
        

        this.contentBrowser=new ContentBrowser(this,canvas);

        this.views.push(new View(this,canvas))
        this.selectedView=this.views[0];
        this.selectedView.load(this.contentBrowser.children[0] as CBButton);

        this.resizeBar=new ResizeBar(boundingShape,canvas,this.contentBrowser,this.views[0])
    }
    public destroy(): void {
        this.resizeBar.destroy();
        super.destroy();
    }
    public updateViewPreview(pos:IPos){
        const overlapping=MouseHandler.getOverlapping(pos)[0];
        if(overlapping instanceof View){
            if(this.previewRect==null){
                this.previewRect=new Rect(boundingShape,this.canvas);
                this.previewRect.color="rgba(0,0,255,0.2)"
            }
            else{
                const posOnView=MouseHandler.posOnRects(overlapping);//code for multiwindow stuff
                const overlappingSize={w:overlapping.absEdges.right-overlapping.absEdges.left,h:overlapping.absEdges.bottom-overlapping.absEdges.top}
                const relViewPos={x:posOnView.x/overlappingSize.w*100,y:posOnView.y/overlappingSize.h*100}
                if(relViewPos.x>80){
                    this.previewRect.fixedPos={x:overlappingSize.w/2+overlapping.absEdges.left,y:overlapping.absEdges.top};
                    this.previewRect.fixedSize={w:overlappingSize.w/2,h:overlappingSize.h}
                    this.overlappPos=false;
                }
                else if(relViewPos.x<20){
                    this.previewRect.fixedPos={x:overlapping.absEdges.left,y:overlapping.absEdges.top};
                    this.previewRect.fixedSize={w:overlappingSize.w/2,h:overlappingSize.h}
                    this.overlappPos=false;
                }
                else if(relViewPos.y>80){
                    this.previewRect.fixedPos={x:overlapping.absEdges.left,y:overlapping.absEdges.top+overlappingSize.h/2};
                    this.previewRect.fixedSize={w:overlappingSize.w,h:overlappingSize.h/2}
                    this.overlappPos=false;
                }
                else{
                    this.previewRect.fixedPos={x:overlapping.absEdges.left,y:overlapping.absEdges.top};
                    this.previewRect.fixedSize=overlappingSize;
                    this.overlappPos=true;
                }
            }
        }
        else{
            if(this.previewRect!=null){
                this.previewRect.destroy();
                this.previewRect=null;
            }
        }
    }
    public convertToView(pos:IPos,button:CBButton){
        if(this.previewRect!=null){
            this.previewRect.destroy();
            this.previewRect=null;
        }

        const overlapping=MouseHandler.getOverlapping(pos)[0];
        const posOnView=MouseHandler.posOnRects(overlapping);//code for multiwindow stuff
        const overlappingSize={w:overlapping.absEdges.right-overlapping.absEdges.left,h:overlapping.absEdges.bottom-overlapping.absEdges.top}
        const relViewPos={x:posOnView.x/overlappingSize.w*100,y:posOnView.y/overlappingSize.h*100}
        console.log(relViewPos)
        if(overlapping instanceof View){
            if(relViewPos.x>80){
                if(overlapping.parent== editor||overlapping.parent instanceof HorizontalBox==false)//parent is hzbox
                {
                    const hzBox=new HorizontalBox(overlapping.parent,this.canvas);
                    hzBox.isVisible=false;
                    hzBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
                    overlapping.setParent(hzBox);
                    //new ResizeBar(boundingShape,this.canvas,overlapping,newView)
                }
                const newView=new View(overlapping.parent,this.canvas)
                newView.setParent(overlapping.parent,overlapping.parent.children.indexOf(overlapping)+1)
                const prop2=overlapping.fixedProportion.x/2;
                overlapping.fixedProportion.x=prop2;
                newView.fixedProportion.x=prop2;
                this.views.push(newView)
                newView.load(button)
                this.selectedView=newView;
                //this.views[0].fixedSize.w=overlappingSize.w/2;
                //this.views.push(new View(this,this.canvas))
                //this.views[1].load(button);
                //this.selectedView=this.views[1]
            }
            else if(relViewPos.x<20){
                if(overlapping.parent== editor|| overlapping.parent instanceof HorizontalBox==false)//parent is hzbox
                {
                    const hzBox=new HorizontalBox(overlapping.parent,this.canvas);
                    hzBox.isVisible=false;
                    hzBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
                    overlapping.setParent(hzBox);
                    //new ResizeBar(boundingShape,this.canvas,overlapping,newView)
                }
                const newView=new View(overlapping.parent,this.canvas)
                newView.setParent(overlapping.parent,overlapping.parent.children.indexOf(overlapping)-1)
                const prop2=overlapping.fixedProportion.x/2;
                overlapping.fixedProportion.x=prop2;
                newView.fixedProportion.x=prop2;
                this.views.push(newView)
                newView.load(button)
                this.selectedView=newView;
                //this.views[0].fixedSize.w=overlappingSize.w/2;
                //this.views.push(new View(this,this.canvas))
                //this.views[1].load(button);
                //this.selectedView=this.views[1]
            }
            else if(relViewPos.y>80){
                if(overlapping.parent== editor|| overlapping.parent instanceof VerticalBox==false)//parent is hzbox
                {
                    const vtBox=new VerticalBox(overlapping.parent,this.canvas);
                    vtBox.isVisible=false;
                    vtBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
                    overlapping.setParent(vtBox);
                    //new ResizeBar(boundingShape,this.canvas,overlapping,newView)
                }
                const newView=new View(overlapping.parent,this.canvas)
                newView.setParent(overlapping.parent,overlapping.parent.children.indexOf(overlapping)+1)
                const prop2=overlapping.fixedProportion.y/2;
                overlapping.fixedProportion.y=prop2;
                newView.fixedProportion.y=prop2;
                this.views.push(newView)
                newView.load(button)
                this.selectedView=newView;
            }//need helper functions for size and coordinate space transformations (maybe add in resize class or new class)
            else{
                overlapping.load(button);
            }
        }
        boundingShape.drawHierarchy();
        console.log(boundingShape)
        //destroy view preview

        //half current view at all four corners of the view
        //when existing moved, handle as if already removed or alternatively show in ui, that will be removed (last option only remove on release)
        //resizing always equal
        //limit view Size for creation and resizebar later
        //figure out how to do this all
    }
}