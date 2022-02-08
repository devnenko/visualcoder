import { editor } from "../../main.js";
import { colorCreator } from "../../ui/color.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { boundingShape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { ContentBrowser } from "./views/content_browser.js";
import { Scene } from "./views/scene.js";
import { HoverPressButton } from "./special_buttons.js";
import { View } from "./views/view.js";
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
class TopBar extends HorizontalBox //will have play button, options for adding views (maybe should be something better)
 {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.fixedSize.w = 60;
        this.fixedSize.h = 60;
        this.color = colorCreator.colorByBrightness(10);
        new ReloadButton(this, this.canvas);
        new ContentBrowserButton(this, this.canvas);
    }
}
class TopBarButton extends HoverPressButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.margin = 5;
        this.fixedSize.w = 60;
        this.fixedSize.h = 60;
        this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.setOrigColor(colorCreator.colorByBrightness(30));
        this.hoverColor = colorCreator.colorByBrightness(45);
        this.pressColor = colorCreator.colorByBrightness(80);
    }
}
class ReloadButton extends TopBarButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.onCLick = () => {
            const scene = new Scene(boundingShape, this.canvas);
            editor.addViewGeneric(scene, "Scene");
            scene.reload();
        };
    }
}
class ContentBrowserButton extends TopBarButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.onCLick = () => //implement loading script also for drag and drop and multi tab. also implement for click add at best location
         {
            editor.addViewGeneric(new ContentBrowser(boundingShape, this.canvas), "ContentBrowser");
        };
    }
}
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
                console.log("is");
                const index = this.contentArea.children.indexOf(child);
                child.destroy();
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
