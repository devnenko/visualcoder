import { editor } from "../../main.js";
import { colorCreator } from "../../ui/color.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { ToggleButton } from "./hover_press_button.js";
import { View } from "./view.js";
// problem: how do we create views so that they are usefull and dont cause confusion? 
//what are the usefull and useless usecases and how could you implement that in an intuitive way 
//maybe phones should have completely different system with individual tabs like the close button for shortcuts on shortcuts app
//still no solution for confusing usecases on windows then
//should implementation be per file different views, or views per gameengine, that react to actif file(on mobile open actif file in view maybe)?
//what is more intuitive and makes more sense
//maybe views on desktop become single tab opens on mobile (code reuse and more intuitive for desktop users)
//view opening system like unitys or construct 3s (view keep after move deffinitely unity)
class TopBar extends HorizontalBox //will have play button, options for adding views (maybe should be something better)
 {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.fixedSize.h = 60;
        this.color = colorCreator.colorByBrightness(10);
        this.playButton = new PlayButton(this, this.canvas);
    }
}
class PlayButton extends ToggleButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.fixedSize.w = 60;
        this.setOrigColor(colorCreator.colorByBrightness(30));
        this.hoverColor = colorCreator.colorByBrightness(45);
        this.pressColor = colorCreator.colorByBrightness(80);
        this.onToggle = () => {
            if (this.isOn == true) {
                //toggle has been enabled
                let hasSceneView = false;
                for (const child of editor.contentArea.children) {
                    if (child instanceof View && child.topBar.title.text == "scene") {
                        console.log("child");
                        hasSceneView = true;
                        break;
                    }
                }
                if (hasSceneView == true) {
                }
                else {
                    const v = new View(editor.contentArea, this.canvas);
                    v.topBar.title.text = "scene";
                }
            }
            else {
                //toggle has been disabled
            }
        };
    }
}
export class Editor extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.isVisible = false;
        this.topbar = new TopBar(this, this.canvas);
        this.contentArea = new Rect(this, this.canvas);
        this.contentArea.color = colorCreator.colorByBrightness(20);
        this.contentArea.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.emptyText = new Text(this.contentArea, this.canvas);
        this.emptyText.color = "white";
        this.emptyText.text = "no view open"; //disappears for some reason on mobile
        //const v=new View(this.contentArea,this.canvas);
        //v.topBar.title.text="scene"
    }
}
