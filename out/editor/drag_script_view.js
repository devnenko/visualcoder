import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { Rect } from "../ui/rect.js";
import { MakeToggleButton } from "../ui_components/button.js";
import { View } from "./view.js";
class BlockChooser extends Box {
    constructor() {
        super(BoxType.vt);
    }
}
export class TextScriptView extends View {
    constructor(controller) {
        super(controller);
        this.title = "textscript";
        this.changeTitle();
        this.clickArea = new (MakeClickable(Rect));
        this.clickArea
            .sParent(this.contentArea)
            .sFillSpace()
            .sIsVisible(false);
        this.vtBox = new Box(BoxType.vt);
        this.vtBox
            .sParent(this.clickArea)
            .sFillSpace()
            .sIsVisible(false);
        this.clickArea.onMouseUp = (handler) => {
            console.log("click");
            const b = new (MakeToggleButton(MakeClickable(Rect)));
            b.sParent(this.vtBox)
                .sSnapMargin(8)
                .setFixedSizeH(75);
            boundingRect.draw();
        };
    }
}
