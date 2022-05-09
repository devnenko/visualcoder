import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
class ViewTopBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    constructor(topbar, icon) {
        super();
        this.sParent(topbar)
            .sConsts(EConstraintsX.right, EConstraintsY.scale)
            .sFixedSize(topbar.gFixedSize().h)
            .sSvg(icon);
    }
}
class ViewTopBar extends Rect {
    constructor(view) {
        super();
        this.sParent(view)
            .sColor("blue")
            .setFixedSizeH(70);
        this.delButton = new ViewTopBarButton(this, AllSvg.xMark);
        this.delButton.onRelease = () => {
            view.destroy();
            boundingRect.draw();
        };
        this.viewSelButton = new ViewTopBarButton(this, AllSvg.folder);
        this.viewSelButton
            .sFixedOffsetX(this.gFixedSize().h)
            .onRelease = () => {
            const changeViewBox = new Box(BoxType.vt);
            changeViewBox
                .sParent(this.viewSelButton)
                .sConsts(EConstraintsX.center, EConstraintsY.bottom)
                .sFixedOffsetY(-changeViewBox.gFixedSize().h);
            //mouseHandler.activepointer=changeViewBox
            const names = view.controller.getAvailViewNames();
            for (var i = 0; i < names.length; i++) {
                const button = new (MakeHoverPressButton(MakeClickable(Rect)));
                button
                    .sParent(changeViewBox)
                    .setFixedSizeH(50)
                    .onRelease = () => {
                    view.controller.replaceView(view, button.gIndexInParent());
                };
                const text = new TextRect;
                text.sParent(button)
                    .sText(names[i]);
            }
        };
    }
}
export class View extends Box {
    constructor(controller) {
        super(BoxType.vt);
        this.title = "view";
        this.controller = controller;
        this.sParent(controller.editor.viewBox)
            .sFillSpace()
            .sIsVisible(false);
        this.topBar = new ViewTopBar(this);
        this.contentArea = new Rect;
        this.contentArea.sParent(this)
            .sFillSpace()
            .sColor("red");
    }
    otherfunc() { }
}
export class ContentBrowser extends View {
    constructor(controller) {
        super(controller);
        this.title = "contentbrowser";
        this.contentArea.sColor("green");
    }
}
