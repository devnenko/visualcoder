//import { editor } from "../main.js";
import { Canvas } from "../ui/canvas.js";
import { colorCreator } from "../ui/color.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { HorizontalBox } from "../ui/horizontal_box.js";
import { IRectOpts, Rect } from "../ui/rect.js";
import { boundingShape, IShape } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { EMouseType } from "../ui/types/mouse.js";
import { IPos } from "../ui/types/pos.js";
import { VerticalBox } from "../ui/vertical_box.js";
import { Scene } from "./views/scene/scene.js";
import { HoverPressButton } from "../ui_components/ui_components.js";
import { FileViewContentArea, View, ViewContentArea } from "./views/view.js";
import { EditorTopBar } from "./topbar.js";

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








export class Editor extends VerticalBox {
    topbar: EditorTopBar;
    contentArea: Rect;
    //views: View[] = [];
    //emptyText;
    constructor() {
        super()
        this.createConfig({
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });
        //this.setOpts({isVisible:true});

        this.topbar = new EditorTopBar(this);

        this.contentArea = new Rect();
        this.contentArea.createConfig({
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

    public addViewGeneric(ContentAreaClass: typeof ViewContentArea) {
        ////for(const child of this.contentArea.children){
        ////    if(child instanceof View){
        ////        const index=this.contentArea.children.indexOf(child);
        ////        
        ////        child.destroyHierarchy();
        ////        break;
        ////    }
        ////}
        const view =new View(ContentAreaClass,this);
        ////this.views.push(view);
        ////view.topBar.title.text=view.contentArea.viewTitle;
        ////boundingShape.drawHierarchy();
    }

    public drawViewPreview(pos: IPos) {

    }

    public addViewPreview() {

    }
}