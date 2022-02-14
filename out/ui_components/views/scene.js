import { boundingShape } from "../../ui/shape.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { allFiles } from "./content_browser.js";
export class Scene extends VerticalBox {
    constructor(parent, canvas) {
        super(parent, canvas);
        this.isVisible = false;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.res = new Text(this, this.canvas);
        this.res.color = "red";
        this.res.text = "no input";
    }
    refresh() {
    }
    reload() {
        for (const file of allFiles) {
            if (file.type == "src") {
                this.res.text = file.source;
            }
        }
        boundingShape.drawHierarchy();
    }
}
