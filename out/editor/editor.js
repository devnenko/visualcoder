import { AllSvg } from './../util/allsvg.js';
import { SvgRect } from '../ui/svg_rect.js';
import { colorCreator } from './../util/color.js';
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../ui_components/button.js';
import { Direction } from '../util/transform.js';
import { View, ViewConnector } from './view/view.js';
import { Box } from '../ui/box.js';
export class SideBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    constructor(editor, icon) {
        super();
        this.viewName = "hello1";
        this.dir = Direction.right;
        this.addConfig({
            snapMargin: 5,
            parent: editor.sideBar,
            fixedSize: editor.sideBar.fixedSizeW,
            onRelease: (mouseHandler) => {
                editor.addViewGeneric(this.viewName, this.dir);
            },
            zIndex: 10
        }); //fix the double config needed bug
        this.addConfig({
            svg: icon
        });
    }
}
export class Editor {
    constructor() {
        this.previousView = null;
        this.views = [];
        this.boundBox = new Box(false);
        this.boundBox.addConfig({
            fillSpace: true,
            isVisible: false
        });
        this.sideBar = new Box(true);
        this.sideBar.addConfig({
            parent: this.boundBox,
            color: colorCreator.colorByBrightness(22),
            fixedSize: 75
        });
        this.orientSideBar();
        this.sideBar.addInBetweenRect({
            fixedSize: 7,
            color: colorCreator.colorByBrightness(40),
        });
        this.viewBox = new ViewConnector(true, this.boundBox);
        this.viewBox.canDestroy = false;
        const cbButton = new SideBarButton(this, AllSvg.folder);
        const cbButton2 = new SideBarButton(this, AllSvg.play);
        cbButton2.viewName = "hello2";
        cbButton2.dir = Direction.bottom;
    }
    addViewGeneric(name, dir) {
        //check if space is to small on x and y axis
        if (this.views.length == 0) {
            new View(this, name);
        }
        else {
            new View(this, name, this.views[this.views.length - 1], dir);
        }
        //return view or null if no view created cause not possible
    }
    orientSideBar() {
        if (window.orientation == 90) //landscape
         {
            this.boundBox.setBoxType(true);
            this.sideBar.setBoxType(false);
        }
        else {
            this.boundBox.setBoxType(false);
            this.sideBar.setBoxType(true);
        }
    }
}
