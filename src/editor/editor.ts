//import { editor } from "../main.js";
import { Canvas } from "../ui/canvas.js";
import { colorCreator } from "../ui/color.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import {  Rect } from "../ui/rect.js";
import { boundingShape, EObjectType, IShape } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { Level } from "./views/level/level.js";
import { HoverPressButton } from "../ui_components/ui_components.js";
import { FileViewContentArea, View, ViewContentArea } from "./views/view.js";
import { EditorTopBar } from "./topbar.js";
import { GeFile } from "./views/views.js";

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








export class Editor extends Rect {
    topbar: EditorTopBar;
    contentArea: Rect;
    //views: View[] = [];
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
    }

    public addViewGeneric(ContentAreaClass: typeof ViewContentArea,file?:GeFile) {
        ContentAreaClass.prototype.viewName
        if(this.contentArea.children[0]){
            if((this.contentArea.children[0] as View).contentArea.viewName!=ContentAreaClass.prototype.constructor.name){
                (this.contentArea.children[0] as View).destroy();
                const view =new View(ContentAreaClass,this,file);
            }
            else{
                console.log("ye")
            }
        }else{
            const view =new View(ContentAreaClass,this,file);
        }
        ////this.views.push(view);
        ////view.topBar.title.text=view.contentArea.viewTitle;
        ////boundingShape.drawHierarchy();
    }
    public findView(viewName:string){
        for(const child of this.contentArea.children){
            for(const area of (child.children as ViewContentArea[])){
                if(area.viewName==viewName){
                    return child;
                }
            }
        }
        return null;
    }

    public drawViewPreview(pos: IPos) {

    }

    public addViewPreview() {

    }
}
