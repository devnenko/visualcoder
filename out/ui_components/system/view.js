import { Rect } from "../../ui/rect.js";
import { Shape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
export class View extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.topBar = new Rect(this, canvas);
        this.topBar.color = "red";
        this.topBar.fixedSize.h = 60;
    }
    load(file, viewLoader) {
    }
}
export class ViewLoader extends Shape {
    constructor(parent, canvas) {
        super(parent, canvas);
    }
}
