import { Button } from "../../ui/button.js";
import { colorCreator } from "../../ui/color.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
export class ContentBrowser extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.fixedSize.w = 200;
        this.setConstraints(EConstraintsX.left, EConstraintsY.scale);
        this.color = colorCreator.colorByBrightness(20);
        new CBButton(this, this.canvas);
        new CBButton(this, this.canvas);
    }
}
export class CBButton extends Button {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.fixedSize.h = 60;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.top);
        this.color = colorCreator.colorByBrightness(10);
        this.text = new Text(this, this.canvas);
        this.text.color = "white";
        this.text.text = "test.txt";
    }
    onMouseHoverBegin(type) {
        this.color = colorCreator.colorByBrightness(25);
    }
    onMouseHoverEnd(type) {
        this.color = colorCreator.colorByBrightness(10);
    }
    onMouseDown(type, pos) {
        this.color = colorCreator.colorByBrightness(25);
    }
    onMouseUp(type, pos) {
        this.color = colorCreator.colorByBrightness(10);
    }
}
