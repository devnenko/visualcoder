import { colorCreator } from '../../util/color.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { TextRect } from '../../ui/text_rect.js';
import { AllSvg } from '../../util/allsvg.js';
export class ViewTopBar extends Rect {
    constructor(view) {
        super();
        this.addConfig({
            parent: view,
            fixedSizeH: 50,
            color: colorCreator.colorByBrightness(5)
        });
        this.title = new TextRect;
        this.title.addConfig({
            parent: this,
            constraintY: EConstraintsY.center,
            fixedOffsetX: 5,
            size: 28,
            text: view.getName()
        });
        this.delButton = new (MakeHoverPressButton(MakeClickable(SvgRect)));
        this.delButton.addConfig({
            parent: this,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: this.fixedSizeH,
            snapMargin: 5,
            forgetOnMouseLeave: true,
            onRelease: (mouseHandler) => {
                view.destroy();
            },
        });
        this.delButton.addConfig({
            svg: AllSvg.xMark
        });
    }
}
