import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton, MakeToggleButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { uni } from "../util/uniform.js";
class ViewSelectorButton extends (MakeHoverPressButton(MakeClickable(Rect))) {
    constructor(selector, viewClass) {
        super(selector);
        this.controller = selector.view.controller;
        this.setFixedSizeH(42)
            .sIdleColor(colorCreator.darkColorDef);
        const text = this.getViewtitle(viewClass, this.controller);
        this.title = new TextRect(this, text, 18);
        this.onRelease = () => {
            const newViewClass = this.controller.availableViews[this.gIndexInParent()];
            selector.view.controller.setDefault(newViewClass);
            selector.view.controller.replaceView(selector.view, newViewClass);
        };
    }
    getViewtitle(viewClass, controller) {
        //creates and destroys view immediatly to get view title property
        const infoObj = new viewClass(controller);
        const text = infoObj.viewName;
        infoObj.destroy();
        return text;
    }
}
class ViewSelector extends Box {
    constructor(view) {
        super(BoxType.vt, view.contArea);
        this.view = view;
        this.sConstX(EConstraintsX.right)
            .sIsVisible(false);
        if (view.topBar.selectorBt) {
            this.sFixedOffsetX(view.topBar.selectorBt.gFixedOffset().x - view.topBar.selectorBt.gFixedSize().w / 2);
        } //align with button
        view.controller.availableViews.forEach(el => {
            const bt = new ViewSelectorButton(this, el);
            if (el.name == view.viewName) {
                bt.title.sColor(colorCreator.selectColor);
                boundingRect.draw();
            }
        });
    }
}
class ViewTopBar extends Rect {
    constructor(view) {
        super(view);
        this.selector = null;
        this.view = view;
        this.sFixedSize(50)
            .sColor(colorCreator.darkColorDef);
        this.text = uni.offsetSnap(new TextRect(this, view.viewName, 32));
        this.text.sConstX(EConstraintsX.left);
        this.destroyBt = uni.offsetSnap(uni.makeConform(new (MakeHoverPressButton(MakeClickable(SvgRect)))(AllSvg.xMark, this)));
        this.destroyBt
            .sConstX(EConstraintsX.right)
            .onRelease = () => {
            this.view.controller.destroyView(this.view);
        };
        if (this.view.controller.availableViews.length > 1) {
            this.selectorBt = uni.offsetSnap(uni.makeConform(new (MakeToggleButton(MakeClickable(SvgRect)))(AllSvg.folder, this)));
            this.selectorBt
                .sConstX(EConstraintsX.right)
                .sFixedOffsetX(this.destroyBt.gFixedSize().w)
                .onToggle = (isOn) => {
                if (isOn) {
                    this.selector = new ViewSelector(this.view);
                }
                else {
                    this.selector?.destroy();
                    this.selector = null;
                }
                boundingRect.draw();
            };
        }
    }
}
export class View extends MakeClickable(Box) {
    constructor(cont) {
        super(BoxType.vt, cont.editor.viewBox);
        this.viewName = "View";
        this.controller = cont;
        uni.invisFill(this);
        this.sMousePassthrough(true);
        this.topBar = new ViewTopBar(this);
        this.contArea = new Rect(this);
        this.contArea
            .sFillSpace()
            .sColor(colorCreator.midColorDef);
        boundingRect.draw();
    }
    refreshContent() {
        //dispatched to all views once something changes
        //should only be called from controller. almost never individually call!
    }
    setTitle() {
        this.topBar.text.sText(this.viewName);
        boundingRect.draw();
    }
    onMouseUp(mouseHandler) {
        this.controller.editor.changeSelectedView(this);
    }
}
export class AssetInfoView extends View {
    constructor(cont) {
        super(cont);
        this.viewName = "AssetView";
        //this.viewName = "AssetView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle();
        this.sourceText = new TextRect;
        this.sourceText
            .sParent(this.contArea)
            .sConsts(EConstraintsX.left, EConstraintsY.top)
            .sFixedOffset(uni.defEdgeDist);
        this.refreshContent();
    }
    refreshContent() {
        this.sourceText.sText(this.controller.asset.source);
        boundingRect.draw();
    }
}
