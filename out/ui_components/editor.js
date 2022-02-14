import { editor } from "../main.js";
import { colorCreator } from "../ui/color.js";
import { Rect } from "../ui/rect.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { VerticalBox } from "../ui/vertical_box.js";
import { View } from "./views/view.js";
import { TopBar } from "./topbar.js";
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
    //emptyText;
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.isVisible = false;
        this.topbar = new TopBar(this, this.canvas);
        this.contentArea = new Rect(this, this.canvas);
        this.contentArea.color = colorCreator.colorByBrightness(20);
        this.contentArea.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        //this.emptyText=new Text(this.contentArea,this.canvas);
        //this.emptyText.color="white";
        //this.emptyText.text="no view open";//disappears for some reason on mobile
        //const v=new View(this.contentArea,this.canvas);
        //v.topBar.title.text="scene"
    }
    addViewGeneric(content, title) {
        for (const child of this.contentArea.children) {
            if (child instanceof View) {
                const index = this.contentArea.children.indexOf(child);
                child.destroyHierarchy();
                break;
            }
        }
        const view = new View(editor.contentArea, this.canvas);
        view.topBar.title.text = title;
        content.setParent(view.contentArea);
    }
    drawViewPreview(pos) {
    }
    addViewPreview() {
    }
}
