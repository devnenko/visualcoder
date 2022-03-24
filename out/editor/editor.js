import { AllSvg } from './../util/allsvg.js';
import { SvgRect } from '../ui/svg_rect.js';
import { colorCreator } from './../util/color.js';
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../ui_components/button.js';
import { Direction } from '../util/transform.js';
import { View, ViewConnector } from './view/view.js';
import { boundingRect } from '../ui/bounding_rect.js';
import { Box, BoxType } from '../ui/box.js';
export class SideBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    constructor(editor, icon) {
        super();
        this.viewName = "hello1";
        this.dir = Direction.right;
        this.sSnapMargin(5)
            .sParent(editor.sideBar)
            .sFixedSize(editor.sideBar.fixedSize.w)
            .sZIndex(10)
            .sSvg(icon);
        this.onRelease = (mouseHandler) => {
            editor.addViewGeneric(this.viewName, this.dir);
        };
    }
}
export class Editor {
    constructor() {
        this.previousView = null;
        this.views = [];
        this.boundBox = new Box(BoxType.vt);
        this.boundBox
            .sFillSpace()
            .sVisible(false);
        this.sideBar = new Box(BoxType.hz);
        this.sideBar
            .sParent(this.boundBox)
            .sFixedSize(75)
            .sColor(colorCreator.colorByBrightness(22));
        this.orientSideBar();
        this.viewBox = new ViewConnector(BoxType.hz, this.boundBox);
        this.viewBox.canDestroy = false;
        const cbButton = new SideBarButton(this, AllSvg.folder);
        const cbButton2 = new SideBarButton(this, AllSvg.play);
        cbButton2.dir = Direction.bottom;
        boundingRect.draw();
    }
    addViewGeneric(name, dir) {
        //check if space is to small on x and y axis
        if (false) {
            return null;
        }
        let view;
        if (this.views.length == 0) {
            view = new View(this, name);
        }
        else {
            view = this.addViewInDir(name, dir);
        }
        return view;
        //return view or null if no view created cause not possible
    }
    addViewInDir(name, dir) {
        return new View(this, name, this.views[this.views.length - 1], dir);
    }
    orientSideBar() {
        if (window.orientation == 90) //landscape
         {
            this.boundBox.setBoxType(BoxType.hz);
            this.sideBar.setBoxType(BoxType.vt);
        }
        else {
            this.boundBox.setBoxType(BoxType.vt);
            this.sideBar.setBoxType(BoxType.hz);
        }
    }
}
