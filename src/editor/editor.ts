//import { editor } from "../main.js";
import { Canvas } from "../ui/canvas.js";
import { colorCreator } from "../util/color.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import {  IRectConfig, Rect, recti } from "../ui/rect.js";
import { boundingShape, EObjectType, IShape } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { Level } from "./views/level/level.js";
import { HoverPressButton } from "../ui_components/ui_components.js";
import {  ViewOutline, View } from "./views/view.js";
import { EditorTopBar } from "./topbar.js";
import { CBFile } from "./views/cb_file.js";
import { ERectType } from "../ui/shape.js";
import { ResizeHandler } from "../ui/event_handlers/resize.js";
import { ISize } from "../compiler/lib.js";

// problem: how do we create views so that they are usefull and dont cause confusion? 
//what are the usefull and useless usecases and how could you implement that in an intuitive way 
//maybe phones should have completely different system with individual tabs like the close button for shortcuts on shortcuts app
//still no solution for confusing usecases on windows then
//should implementation be per file different views, or views per gameengine, that react to actif file(on mobile open actif file in view maybe)?
//what is more intuitive and makes more sense
//maybe views on desktop become single tab opens on mobile (code reuse and more intuitive for desktop users)
//view opening system like unitys or construct 3s (view keep after move deffinitely unity)


//use no view open as bottom view, or scene as bottom view or content browser as bottom view
//on mobile content browser should be bottom thing cause its more intuitive





export enum Direction{
    Left="left",
    Right="right",
    Top="top",
    Bottom="bottom"
}


export class TwoViewRect extends Rect{
    public children: Rect[]=[];
    constructor(config?:IRectConfig){
        super()
        this.setAttrs(config);
    }
    removeSelf(){
        const childLenght=this.children.length;
        for(let i=0;i<childLenght;i++){
            this.children[0].addConfig({
                parent:this.parent
            })
        }
        this.destroy();
    }
}

export class Editor extends Rect {
    topbar: EditorTopBar;
    contentArea: Rect;
    views: View[] = [];
    viewMinSize:ISize={w:220,h:220}
    //emptyText;
    constructor() {
        super({
            rectType:EObjectType.VtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        })
        //this.setOpts({isVisible:true});

        this.topbar = new EditorTopBar(this);

        this.contentArea = new Rect();
        this.contentArea.addConfig({
            parent:this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible:false
        })

        //this.emptyText=new Text(this.contentArea,this.canvas);
        //this.emptyText.color="white";
        //this.emptyText.text="no view open";//disappears for some reason on mobile




        //const v=new View(this.contentArea,this.canvas);
        //v.topBar.title.text="scene"
        
        boundingShape.draw();
    }
    public findView(ContentAreaClass: typeof View){
        for(const currContentArea of this.views){
            if(currContentArea instanceof ContentAreaClass){
                return currContentArea;
            }
        }
        return null;
    }

    public addViewGeneric(newView: typeof View,file?:CBFile) {
        if(this.views.length==0){
            new ViewOutline(newView,this);
        }else{
            this.addViewInDir(this.views[0],newView,Direction.Left);
        }
        console.log(this.views.length)
    }

    public checkViewSpaceInDir(origin:View,newView: typeof View,direction:Direction){
        return //returns if the view is creatable or not boolean
    }

    public addViewInDir(origin:View,newView: typeof View,direction:Direction){
        let originOutline=origin.viewOutline;
        let newBoundingRect=new TwoViewRect({
            parent:originOutline.parent,
            constraintX:EConstraintsX.scale,
            constraintY:EConstraintsY.scale,
            isVisible:false,
        });
        originOutline.addConfig({
            parent:newBoundingRect,
            boxProportion:{x:50,y:50}
        })
        const newViewObj =new ViewOutline(newView,this);
        newViewObj.addConfig({
            parent:newBoundingRect,
            boxProportion:{x:50,y:50}
        })
        switch (direction){
            case Direction.Left: case Direction.Right:
                newBoundingRect.addConfig({
                    rectType:ERectType.HzBox
                })
                if(direction==Direction.Left){
                    console.log("yse")
                    originOutline.addConfig({
                        parent:originOutline.parent
                    })
                    console.log(newViewObj.parent)
                }
                break;
            case Direction.Top: case Direction.Bottom:
                newBoundingRect.addConfig({
                    rectType:ERectType.VtBox
                })
                if(direction==Direction.Top){
                    console.log("yse")
                    originOutline.addConfig({
                        parent:originOutline.parent
                    })
                    console.log(newViewObj.parent)
                }
                break;
        }
        //add resize bar
        const resizeBar=new Rect({
            fixedSizeW:10,
            fixedSizeH:10,
            parent:newBoundingRect
        })
        resizeBar.setIndex(1);
        //resizeBar.parent=newBoundingRect;
        //resizeBar.setParent(newBoundingRect,1);
        //if(newViewObj.getAbsSize().w<this.viewMinSize.w||newViewObj.getAbsSize().h<this.viewMinSize.h){
        //    //too small
        //    newViewObj.destroy();
        //}
    }

    public drawViewPreview(pos: IPos) {

    }

    public addViewPreview() {

    }
}

