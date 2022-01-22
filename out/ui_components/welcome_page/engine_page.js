import { BoundingRect } from "../../ui/bounding_shape.js";
import { HorizontalBox } from "../../ui/horizontal_box.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { EditorPage } from "../editor/editor_page.js";
import { HoverPressButton } from "./hover_press_button.js";
function colorByBrightness(value) {
    return "rgb(" + value + "," + value + "," + value + ")";
}
export class ProjectButton extends HoverPressButton {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.fixedSize.w = 240;
        this.margin = 10;
        this.color = colorByBrightness(100);
        this.hoverColor = colorByBrightness(120);
        this.pressColor = colorByBrightness(166);
        //this.browseButton.margin=10;
        this.text.text = "Project";
        this.text.size = 50;
        this.text.color = colorByBrightness(300);
    }
    onMouseUp(type) {
        super.onMouseUp(type);
        //welcomePageObj.destroy();
        //set new hash
        window.location.hash = "3";
        //load engine
        const editorPageObj = new EditorPage(BoundingRect, this.canvas);
        BoundingRect.drawHierarchy();
        //load project in engine
    }
}
export class EnginePage extends HorizontalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.isVisible = false;
        this.constX = EConstraintsX.scale;
        this.constY = EConstraintsY.top;
        this.fixedSize.h = 200;
        this.margin = 20;
    }
    addProject() {
        new ProjectButton(this, this.canvas);
    }
}
