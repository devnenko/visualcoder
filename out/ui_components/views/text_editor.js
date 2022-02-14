import { KeypressHandler } from "../../ui/event_handlers/keypress.js";
import { boundingShape } from "../../ui/shape.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
export class TextEditor extends VerticalBox {
    constructor(parent, canvas, file) {
        super(parent, canvas);
        KeypressHandler.subscribe(this);
        this.isVisible = false;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.file = file;
        this.text = new Text(this, this.canvas);
        this.text.text = this.file.source;
    }
    onKeyPress(key) {
        let newString = "";
        if (key == "Backspace") {
            newString = this.text.text.slice(0, -1);
        }
        else {
            newString = this.text.text.concat(key);
        }
        console.log(key);
        this.text.text = newString;
        this.file.source = newString;
        boundingShape.drawHierarchy();
    }
}
