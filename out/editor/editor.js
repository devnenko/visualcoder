import { AllSvg } from './../util/allsvg.js';
import { SvgRect } from '../ui/svg_rect.js';
import { colorCreator } from './../util/color.js';
import { HzBox } from "../ui/hz_box.js";
import { VtBox } from "../ui/vt_box.js";
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../ui_components/button.js';
import { View } from './view/view.js';
export class SideBarButton extends (MakeHoverPressButton(MakeClickable(SvgRect))) {
    constructor(editor, icon) {
        super();
        this.viewName = "hello1";
        this.addConfig({
            snapMargin: 5,
            parent: editor.sideBar,
            fixedSize: editor.sideBar.fixedSizeW,
            onRelease: (mouseHandler) => {
                editor.addViewGeneric(this.viewName);
            },
            zIndex: 1
        }); //fix the double config needed bug
        this.addConfig({
            svg: icon
        });
    }
}
export class Editor {
    constructor() {
        const el = this.recreateSideBar();
        this.boundBox = el.newBBox;
        this.sideBar = el.newSideBar;
        const cbButton = new SideBarButton(this, AllSvg.folder);
        const cbButton2 = new SideBarButton(this, AllSvg.play);
        cbButton2.viewName = "hello2";
    }
    addViewGeneric(name) {
        //check if space is to small on x and y axis
        new View(this, name);
        //return view or null if no view created cause not possible
    }
    recreateSideBar() {
        let newBBox;
        let newSideBar;
        if (window.orientation == 90) //landscape
         {
            newBBox = new HzBox;
            newSideBar = new VtBox;
        }
        else {
            newBBox = new VtBox;
            newSideBar = new HzBox;
        }
        newBBox.addConfig({
            fillSpace: true,
            isVisible: false
        });
        this.boundBox?.replace(newBBox);
        this.boundBox = newBBox;
        newSideBar.addConfig({
            parent: newBBox,
            color: colorCreator.colorByBrightness(22),
            fixedSize: 75
        });
        this.sideBar?.replace(newSideBar);
        this.sideBar = newSideBar;
        this.sideBar.setIndexInParent(0);
        return { newBBox, newSideBar };
    }
}
