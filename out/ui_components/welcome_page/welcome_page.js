import { BoundingRect } from "../../ui/bounding_shape.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Rect } from "../../ui/rect.js";
import { Shape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { EnginePage } from "./engine_page.js";
import { HoverPressButton } from "./hover_press_button.js";
function colorByBrightness(value) {
    return "rgb(" + value + "," + value + "," + value + ")";
}
function loadScript() {
    //
}
function deleteScript() {
    //
}
class WelcomeButton extends HoverPressButton {
    constructor(parent, canvas, text, onClick) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.center);
        this.fixedSize.h = 100;
        this.color = colorByBrightness(100);
        this.hoverColor = colorByBrightness(120);
        this.pressColor = colorByBrightness(166);
        //this.browseButton.margin=10;
        this.text.text = text;
        this.text.size = 50;
        this.text.color = colorByBrightness(300);
        this.onClick = onClick;
    }
    onMouseUp(type) {
        super.onMouseUp(type);
        this.onClick();
    }
}
export class WelcomePage extends Shape {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.windowBox = new HorizontalBox(this, canvas);
        this.windowBox.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.windowBox.color = colorByBrightness(80);
        this.sideBox = new VerticalBox(this.windowBox, canvas);
        this.sideBox.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.sideBox.fixedSize.w = 250;
        this.sideBox.color = colorByBrightness(40);
        this.contentArea = new Rect(this.windowBox, canvas);
        this.contentArea.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.contentArea.color = colorByBrightness(80);
        this.browseButton = new WelcomeButton(this.sideBox, canvas, "Browse", () => {
            window.location.hash = "1";
            this.loadState(parseInt(window.location.hash.substring(1)));
        });
        //this.libraryButton=new WelcomeButton(this.sideBox,canvas,"Library",()=>{console.log("library")});
        //const distRect2=new Rect(this.sideBox,canvas);
        //distRect2.fixedSize.h=100;
        //distRect2.isVisible=false;
        this.engineButton = new WelcomeButton(this.sideBox, canvas, "Engine", () => {
            window.location.hash = "2";
            this.loadState(parseInt(window.location.hash.substring(1)));
        });
        if (window.location.hash != "") {
            console.log(parseInt(window.location.hash.substring(1)));
            this.loadState(parseInt(window.location.hash.substring(1)));
        }
        else {
            window.location.hash = "1";
            this.loadState(parseInt(window.location.hash.substring(1)));
        }
        window.addEventListener("hashchange", (event) => {
            this.loadState(parseInt(window.location.hash.substring(1)));
        }, false); //migrate to main
    }
    loadState(state) {
        console.log("state is: " + state);
        switch (state) {
            case 1:
                this.loadBrowse();
                break;
            case 2:
                this.loadEngine();
                break;
            case 3:
                //load engine page
                break;
            case null:
                this.loadMainPage();
                break; //migrate all this to main makes more sense and will be easyer to handle
        }
    }
    loadBrowse() {
        console.log("browse");
        this.contentArea.children.forEach(child => child.destroy());
        this.contentArea.children = [];
        this.contentArea.color = "blue";
        BoundingRect.drawHierarchy();
    }
    loadEngine() {
        console.log("engine");
        this.contentArea.children.forEach(child => child.destroy());
        this.contentArea.children = [];
        this.contentArea.color = "red";
        const ePage = new EnginePage(this.contentArea, this.contentArea.canvas);
        ePage.addProject();
        BoundingRect.drawHierarchy();
    }
    loadMainPage() {
        console.log("mainPage");
        this.contentArea.children.forEach(child => child.destroy());
        this.contentArea.children = [];
        this.contentArea.color = colorByBrightness(80);
        BoundingRect.drawHierarchy();
    }
}
