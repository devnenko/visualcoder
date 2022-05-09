
import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgObj, SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { Editor } from "./editor.js";
import { ViewConnector } from "./view/view.js";
import { FileViewController, ViewController } from "./view_cont.js";

class ViewTopBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    constructor(topbar: ViewTopBar,icon:SvgObj) {
        super()
        this.sParent(topbar)
            .sConsts(EConstraintsX.right, EConstraintsY.scale)
            .sFixedSize(topbar.gFixedSize().h)
            .sSvg(icon)
            .sSnapMargin(3)
            .sFixedOffsetX(6)
    }
}

class ViewTopBar extends Rect {
    title;
    delButton;
    viewSelButton;
    constructor(view: View) {
        super()

        this.sParent(view)
            .setFixedSizeH(50)
            .sColor(colorCreator.colorByBrightness(5))

        this.title=new TextRect
        this.title.sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(view.title)
            .sTextSize(28)
            .sFixedOffsetX(7)

        this.delButton = new ViewTopBarButton(this,AllSvg.xMark)
        this.delButton.onRelease=()=>{
            view.controller.removeView(view);
            boundingRect.draw();
        }

        if(view.controller.availableViews.length!=1){
            const viewSelButton = new ViewTopBarButton(this,AllSvg.folder)
            viewSelButton
                .sFixedOffsetX(this.gFixedSize().h)
                .onRelease = () => {
                    const changeViewBox = new Box(BoxType.vt);
                    changeViewBox
                        .sParent(viewSelButton)
                        .sConsts(EConstraintsX.center, EConstraintsY.bottom)
                        .setFixedSizeH(0)
                        .sFixedOffsetY(-changeViewBox.gFixedSize().h)
                        .sIsVisible(false)
                    //mouseHandler.activepointer=changeViewBox
    
                    const names = view.controller.getAvailViewNames()
                    for (var i = 0; i < names.length; i++) {
                        const button = new (MakeHoverPressButton(MakeClickable(Rect)))
                        button
                            .sParent(changeViewBox)
                            .setFixedSizeH(50)
                            .onRelease = () => {
                                view.controller.replaceView(view, button.gIndexInParent());
                            }
                        const text = new TextRect
                        text.sParent(button)
                            .sText(names[i])
                    }
                    boundingRect.draw();
                }
            this.viewSelButton=viewSelButton;
        }
    }
}

export class View extends Box {
    controller;
    title = "view";

    topBar;
    contentArea;
    removeCallback=()=>{};
    constructor(controller: ViewController) {
        super(BoxType.vt)
        this.controller = controller;
        controller.views.push(this);
        this.sParent(controller.editor.viewBox)
            .sFillSpace()
            .sIsVisible(false)

        this.topBar = new ViewTopBar(this)
        this.changeTitle();

        this.contentArea = new Rect
        this.contentArea.sParent(this)
            .sFillSpace()
            .sColor(colorCreator.colorByBrightness(10))
    }
    changeTitle() {
        if(this.controller instanceof FileViewController){
            this.topBar.title.sText(this.controller.file.name+" "+this.title);
        }
        else{
            this.topBar.title.sText(this.title);
        }
        boundingRect.draw();
    }
    otherfunc() { }
    remove(){
        this.controller.views.splice(this.controller.views.indexOf(this));
        this.removeCallback();
        this.destroy();
    }
    refresh(){
        
    }
}
