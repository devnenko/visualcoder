import { colorCreator } from '../../util/color.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { TextRect } from '../../ui/text_rect.js';
import { AllSvg } from '../../util/allsvg.js';
export class ViewTopBar {
    constructor(view) {
        this.topBar = new Rect;
        this.topBar.addConfig({
            parent: view.boundBox,
            fixedSizeH: 55,
            color: colorCreator.colorByBrightness(5)
        });
        this.title = new TextRect;
        this.title.addConfig({
            parent: this.topBar,
            constraintY: EConstraintsY.center,
            fixedOffsetX: 5,
            size: 28,
            text: view.getName()
        });
        this.delButton = new (MakeHoverPressButton(MakeClickable(SvgRect)));
        this.delButton.addConfig({
            parent: this.topBar,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: this.topBar.fixedSizeH,
            snapMargin: 5,
            forgetOnMouseLeave: true,
            onRelease: (mouseHandler) => {
                view.boundBox.destroy();
            },
        });
        this.delButton.addConfig({
            svg: AllSvg.xMark
        });
    }
}
