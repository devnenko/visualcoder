import { EConstraintsX, EConstraintsY } from "../../ui/rect.js";
import { TextRect } from "../../ui/text_rect.js";
import { View } from "../view/view.js";
export class TextView extends View {
    constructor(editor, file, origin, dir) {
        super(editor, origin, dir);
        this.file = file;
        this.text = new TextRect;
        this.text.setText("empty text")
            .sParent(this)
            .sZIndex(4)
            .sConstX(EConstraintsX.left)
            .sConstY(EConstraintsY.center);
    }
    setInitValues() {
        this.name = "textview";
    }
    refresh() {
    }
}
