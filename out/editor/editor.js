import { AllSvg } from './../util/allsvg.js';
import { SvgRect } from '../ui/svg_rect.js';
import { colorCreator } from './../util/color.js';
import { BoxType, Rect } from "../ui/rect.js";
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeHoverPressButton, MakeToggleButton } from '../ui_components/button.js';
import { ViewController } from './view_controller.js';
import { boundingRect } from '../ui/bounding_rect.js';
import { Box } from '../ui/box.js';
import { ContentBrowser } from './cont_brow.js';
import { uni } from '../util/uniform.js';
import { AssetType, createAsset } from './asset.js';
import { BrowserSpec } from '../util/browser_spec.js';
import { LevelView } from './level_view.js';
class SideBarButton extends (MakeToggleButton(MakeClickable(SvgRect))) {
    constructor(editor, icon) {
        super();
        this.sSnapMargin(uni.defSnapMargin)
            .sParent(editor.sideBar)
            .sFixedSize(editor.sideBar.gFixedSize().w)
            .sZIndex(10)
            .sSvg(icon);
    }
}
export class SideBarViewButton extends SideBarButton {
    constructor(editor, icon, contToAdd) {
        super(editor, icon);
        this.currView = null;
        this.onToggle = (isOn) => {
            if (isOn) {
                const view = contToAdd.createDefaultView();
                this.currView = view;
                //let view = editor.addView(editor.contBrowserCont);
                const viewDest = view.destroy;
                view.destroy = () => {
                    if (this.isToggleOn == true) {
                        this.currView = null;
                        this.toggle(false);
                    }
                    viewDest.call(view);
                };
            }
            else if (this.currView) {
                contToAdd.destroyView(this.currView);
            }
        };
    }
}
export class Editor {
    constructor() {
        //setup sidebar and main content area
        this.selectedView = null;
        this.boundBox = uni.invisFill(new Box(BoxType.vt));
        this.sideBar = new Box(BoxType.hz, this.boundBox);
        this.sideBar
            .sFixedSize(75)
            .sColor(colorCreator.brightColorDef);
        this.viewBox = uni.invisFill(new Box(BoxType.hz, this.boundBox));
        //make this more ergonomic later
        this.viewBox.setInBetween(MakeHoverPressButton(MakeClickable(Rect)), (rect) => {
            rect.sFixedSize(8)
                .sBoxProp(0)
                .sColor(colorCreator.darkColorDef);
            rect.idleColor = colorCreator.darkColorDef;
            rect.hoverColor = colorCreator.highlightColor;
        });
        if (BrowserSpec.isMobile()) {
            this.orientSideBar();
        }
        ;
        //------------------------------------------------
        //add content browser view and level asset+view
        this.cBCont = new ViewController(this);
        this.cBCont.addAvailable(ContentBrowser, true);
        const cbButton = new SideBarViewButton(this, AllSvg.folder, this.cBCont);
        cbButton.toggle(true);
        this.playStartLv = createAsset("start", AssetType.level, this);
        this.playStartLv.cont.createDefaultView();
        const playButton = new SideBarButton(this, AllSvg.play);
        playButton.onToggle = (isOn) => {
            if (isOn) {
                playButton.sSvg(AllSvg.pause); //need to make this into a class maybe for later
                boundingRect.draw();
                const view = this.playStartLv.cont.createOrFindView(LevelView);
                view.play;
            }
            else {
                playButton.sSvg(AllSvg.play);
                boundingRect.draw();
            }
        };
        boundingRect.draw();
    }
    orientSideBar() {
        if (window.orientation == 90) //landscape
         {
            this.boundBox.sBoxType(BoxType.hz);
            this.sideBar.sBoxType(BoxType.vt);
            this.viewBox.sBoxType(BoxType.hz);
        }
        else {
            this.boundBox.sBoxType(BoxType.vt);
            this.sideBar.sBoxType(BoxType.hz);
            this.viewBox.sBoxType(BoxType.vt);
        }
    }
    changeSelectedView(newView) {
        this.selectedView?.topBar.text.sColor(colorCreator.textColor);
        newView.topBar.text.sColor(colorCreator.selectColor);
        boundingRect.draw();
        this.selectedView = newView;
    }
}
