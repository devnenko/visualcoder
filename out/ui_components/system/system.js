import { HorizontalBox } from "../../ui/horizontal_box.js";
import { Shape } from "../../ui/shape.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { ContentBrowser } from "./content_browser.js";
import { ResizeBar } from "./resize_bar.js";
import { View } from "./view.js";
export class Editor extends Shape {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.hzBox = new HorizontalBox(this, canvas);
        this.hzBox.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.hzBox.isVisible = false;
        this.contentBrowser = new ContentBrowser(this.hzBox, canvas);
        this.view = new View(this.hzBox, canvas);
        new ResizeBar(this, canvas, this.contentBrowser, this.view);
    }
}
