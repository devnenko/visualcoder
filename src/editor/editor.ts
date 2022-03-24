
import { SvgObj } from './../ui/svg_rect.js';
import { AllSvg } from './../util/allsvg.js';
import { MouseHandler, mouseHandler } from './../ui/event_handlers/mouse';
import { SvgRect } from '../ui/svg_rect.js';

import { colorCreator } from './../util/color.js';

import { HzBox } from "../ui/hz_box.js";
import { EConstraintsX, Rect } from "../ui/rect.js";
import { VtBox } from "../ui/vt_box.js";
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../ui_components/button.js';
import { Direction, TransformConversions } from '../util/transform.js';
import { View, ViewConnector } from './view/view.js';
import { boundingRect } from '../ui/bounding_rect.js';
import { ResizeHandler } from '../ui/event_handlers/resize.js';
import { Box } from '../ui/box.js';

export class SideBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    viewName = "hello1"
    dir: Direction = Direction.right;
    constructor(editor: Editor, icon: SvgObj) {
        super();
        this.addConfig({
            snapMargin: 5,
            parent: editor.sideBar,
            fixedSize: editor.sideBar.fixedSizeW, //same as fixedSizeH
            onRelease: (mouseHandler: MouseHandler) => {
                editor.addViewGeneric(this.viewName, this.dir)
            },
            zIndex: 10
        })//fix the double config needed bug
        this.addConfig({
            svg: icon
        })
    }
}

export class Editor {
    boundBox: Box;
    sideBar: Box;
    viewBox: ViewConnector;

    previousView: View | null = null;
    views: View[] = [];
    constructor() {

        this.boundBox = new Box(false);
        this.boundBox.addConfig({
            fillSpace: true,
            isVisible: false
        })
        this.sideBar = new Box(true);
        this.sideBar.addConfig({
            parent: this.boundBox,
            color: colorCreator.colorByBrightness(22),
            fixedSize: 75
        })

        this.orientSideBar();

        this.sideBar.addInBetweenRect({
            fixedSize: 7,
            color: colorCreator.colorByBrightness(40),
        });

        this.viewBox = new ViewConnector(true, this.boundBox);
        this.viewBox.canDestroy = false;

        const cbButton = new SideBarButton(this, AllSvg.folder)
        const cbButton2 = new SideBarButton(this, AllSvg.play)
        cbButton2.viewName = "hello2"
        cbButton2.dir = Direction.bottom;
    }

    addViewGeneric(name: string, dir: Direction) {
        //check if space is to small on x and y axis

        if (this.views.length == 0) {
            new View(this, name)
        }
        else {
            new View(this, name, this.views[this.views.length - 1], dir)
        }
        //return view or null if no view created cause not possible
    }

    orientSideBar() {
        if (window.orientation == 90)//landscape
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