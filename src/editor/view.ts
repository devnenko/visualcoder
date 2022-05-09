import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler, MouseHandler } from "../ui/event_handlers/mouse.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton, MakeToggleButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { TransformConversions } from "../util/transform.js";
import { uniform } from "../util/uniform.js";
import { ViewController } from "./view_controller.js";

class ViewSelectorButton extends (MakeHoverPressButton(MakeClickable(Rect))) {
    t;
    constructor(selector: ViewSelector, viewClass: new (cont: ViewController) => View) {
        super();
        this.sParent(selector)
            .setFixedSizeH(42)
            .sColor(colorCreator.darkColorDef)
        this.idleColor = colorCreator.darkColorDef
        this.t = new TextRect;
        this.t.sParent(this)
            .sText(viewClass.name)//really hacky way to do this for now
            .sTextSize(18)

        this.onRelease = () => {
            console.log(viewClass.name)
            selector.view.cont.replaceView(selector.view, this.gIndexInParent())
        }
    }
}

class ViewSelector extends Box {
    view;
    constructor(view: View) {
        super(BoxType.vt);

        this.view = view;
        this.sParent(view.contArea)
            .sConstX(EConstraintsX.right)
            .sIsVisible(false)
        if (view.topBar.changebutton) {
            this.sFixedOffsetX(view.topBar.changebutton.gFixedOffset().x - view.topBar.changebutton.gFixedSize().w / 2)
        }

        view.cont.availableViews.forEach(el => {
            const b=new ViewSelectorButton(this, el);
            if(el.name==view.viewName){
                b.t.sColor(colorCreator.selectColor)
                boundingRect.draw();
            }
        })
    }
}

class ViewTopBar extends Rect {
    text;
    changebutton;
    selector: ViewSelector | null = null;
    delButton;

    view;
    constructor(view: View) {
        super()
        this.view = view;

        this.sParent(view)
            .sFixedSize(50)
            .sColor(colorCreator.darkColorDef)

        this.text = new TextRect
        this.text.sParent(this)
            .sText(view.viewName)
            .sTextSize(32)
            .sConstX(EConstraintsX.left)
            .applyOffsetSnap()


        this.delButton = new (MakeHoverPressButton(MakeClickable(SvgRect)))
        this.delButton.sParent(this)
            .sConsts(EConstraintsX.right, EConstraintsY.scale)
            .sFixedSize(this.gFixedSize().h)
            .sSvg(AllSvg.xMark)
            .applyOffsetSnap()
            .onRelease = () => {
                this.view.cont.destroyView(this.view);
            }

        if (this.view.cont.availableViews.length > 1) {
            this.changebutton = new (MakeToggleButton(MakeClickable(SvgRect)))
            this.changebutton.sParent(this)
                .sConsts(EConstraintsX.right, EConstraintsY.scale)
                .sFixedSize(this.gFixedSize().h)
                .sSvg(AllSvg.folder)
                .applyOffsetSnap()
                .sFixedOffsetX(this.delButton.gFixedSize().w)
                .onToggle = (isOn) => {
                    if (isOn) {
                        this.selector = new ViewSelector(this.view);
                        //mouseHandler.mouseDownCallbacks.push({thisFunc:()=>{
                        //    this.changebutton.toggle(false);
                        //},thisObj:this})
                    } else {
                        this.selector?.destroy();
                        this.selector = null;
                        boundingRect.draw();
                    }
                    boundingRect.draw();
                }
        }
    }
}

export class View extends MakeClickable(Box) {
    //should only have UI updates
    topBar;
    contArea;

    viewName = "View";
    static data = "data"
    cont;

    constructor(cont: ViewController) {
        super(BoxType.vt)
        this.cont = cont;
        this.sStrokeSize(3)
            .sStrokeColor(colorCreator.highlightColor)

        uniform.makeInvisFill(this, cont.editor.viewBox)
        this.sMouseOnlyTopMost(false)

        this.topBar = new ViewTopBar(this);

        this.contArea = new Rect;
        this.contArea.sParent(this)
            .sFillSpace()
            .sColor(colorCreator.midColorDef)

        //this.sBoxProp(((this.gParent() as Box).gChildren()[0] as Rect).gBoxProp());
        boundingRect.draw();
        //this.sBoxProp(TransformConversions.edgesToPosAndSize(this.gAbsEdges()).size.w);
        //boundingRect.draw();
    }
    refreshContent() {
        //dispatched to all views once something changes
        //should only be called from controller. never individually call!
    }

    setTitle() {
        this.topBar.text.sText(this.viewName);
        boundingRect.draw();
    }
    onMouseUp(mouseHandler: MouseHandler) {
        this.cont.editor.changeSelectedView(this);
    }
    destroy(): void {
        //should only be called from controller. never call from somewhere else!
        super.destroy();
    }
}

export class AssetView extends View {
    viewName = "AssetView";
    sourceText;
    constructor(cont: ViewController) {
        super(cont);
        //this.viewName = "AssetView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle()
        this.sourceText = new TextRect;
        this.sourceText
            .sParent(this.contArea)
            .sConsts(EConstraintsX.left, EConstraintsY.top)
            .sFixedOffset(uniform.defEdgeDist)


        this.refreshContent();
    }
    refreshContent(): void {
        const asset = this.cont.getAsset();
        if (asset) {
            this.sourceText.sText(asset.source);
        }
        boundingRect.draw();
    }
}