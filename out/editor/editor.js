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
import { uniform } from '../util/uniform.js';
import { allAssets, AssetType } from './asset.js';
import { BrowserSpec } from '../util/browser_spec.js';
import { LevelView } from './level_view.js';
export class SideBarViewButton extends (MakeToggleButton(MakeClickable(SvgRect))) {
    constructor(editor, icon, contToAdd) {
        super();
        this.currView = null;
        this.sSnapMargin(uniform.defSnapMargin)
            .sParent(editor.sideBar)
            .sFixedSize(editor.sideBar.gFixedSize().w)
            .sZIndex(10)
            .sSvg(icon);
        //this.canClickToggleOf = false
        this.onToggle = (isOn) => {
            if (isOn) {
                const view = contToAdd.createView();
                this.currView = view;
                //let view = editor.addView(editor.contBrowserCont);
                const viewDest = view.destroy;
                view.destroy = () => {
                    if (this.isToggleOn == true) {
                        this.currView = null;
                        this.toggle(false);
                    }
                    console.log("de");
                    viewDest.call(view);
                };
            }
            else {
                if (this.currView) {
                    contToAdd.destroyView(this.currView);
                }
            }
        };
    }
}
export class Editor {
    constructor() {
        this.selectedView = null;
        this.boundBox = uniform.makeInvisFill(new Box(BoxType.vt));
        this.sideBar = new Box(BoxType.hz);
        this.sideBar
            .sParent(this.boundBox)
            .sFixedSize(75)
            .sColor(colorCreator.brightColorDef);
        this.viewBox = uniform.makeInvisFill(new Box(BoxType.hz), this.boundBox);
        this.viewBox.setInBetween(MakeHoverPressButton(MakeClickable(Rect)), (rect) => {
            rect.sFixedSize(8)
                .sBoxProp(0)
                .sColor(colorCreator.darkColorDef);
            rect.idleColor = colorCreator.darkColorDef;
            rect.hoverColor = colorCreator.highlightColor;
            //let initPos:IPos;
            //rect.onMouseDown=(handler:MouseHandler)=>{
            //    initPos=handler.mousePos;
            //    const index=rect.parent.gChildren().indexOf(rect)
            //    console.log(index);
            //    (rect.parent.gChildren()[index-1] as Rect).sBoxProp(TransformConversions.edgesToPosAndSize((rect.parent.gChildren()[index-1] as Rect).gAbsEdges()).size.w);
            //    (rect.parent.gChildren()[index+1] as Rect).sBoxProp(TransformConversions.edgesToPosAndSize((rect.parent.gChildren()[index+1] as Rect).gAbsEdges()).size.w);
            //}
            //rect.onMouseMoveDown=(handler:MouseHandler)=>{
            //    const deltaX=handler.mousePos.x-initPos.x;
            //    const index=rect.parent.gChildren().indexOf(rect);
            //    console.log((rect.parent.gChildren()[index-1] as Rect).gBoxProp()+ " "+(rect.parent.gChildren()[index+1] as Rect).gBoxProp());
            //    (rect.parent.gChildren()[index-1] as Rect).sBoxProp(TransformConversions.edgesToPosAndSize((rect.parent.gChildren()[index-1] as Rect).gAbsEdges()).size.w+deltaX);
            //    (rect.parent.gChildren()[index+1] as Rect).sBoxProp(TransformConversions.edgesToPosAndSize((rect.parent.gChildren()[index+1] as Rect).gAbsEdges()).size.w-deltaX);
            //    initPos=handler.mousePos;
            //    boundingRect.draw();
            //}
        });
        if (BrowserSpec.isMobile()) {
            this.orientSideBar();
        }
        //this.orientSideBar();
        boundingRect.draw();
        this.contBrowCont = new ViewController(this);
        this.contBrowCont.addAvailable(ContentBrowser, true);
        //this.contBrowCont.createView()
        new SideBarViewButton(this, AllSvg.folder, this.contBrowCont);
        const b2 = new (MakeToggleButton(MakeClickable(SvgRect)));
        b2.sSnapMargin(uniform.defSnapMargin)
            .sParent(this.sideBar)
            .sFixedSize(this.sideBar.gFixedSize().w)
            .sZIndex(10)
            .sSvg(AllSvg.play)
            .onToggle = (isOn) => {
            if (isOn) {
                b2.sSvg(AllSvg.pause);
                boundingRect.draw();
                const r = allAssets.find(el => el.type == AssetType.level);
                if (r) {
                    const view = r.cont.createdViews[0];
                    if (view) {
                        if (view instanceof LevelView) {
                            view.play();
                        }
                        else {
                            r.cont.replaceView(view, 1);
                            const view2 = r.cont.createdViews[0];
                            if (view2 instanceof LevelView) {
                                view2.play();
                            }
                        }
                    }
                    else {
                        const v2 = r.cont.createView();
                        if (v2 instanceof LevelView) {
                            v2.play();
                        }
                        else {
                            r.cont.replaceView(v2, 1);
                            const view2 = r.cont.createdViews[0];
                            if (view2 instanceof LevelView) {
                                view2.play();
                            }
                        }
                    }
                }
            }
            else {
                b2.sSvg(AllSvg.play);
                boundingRect.draw();
            }
        };
        boundingRect.draw();
    }
    changeSelectedView(newView) {
        this.selectedView?.topBar.text.sColor(colorCreator.textColor);
        newView.topBar.text.sColor(colorCreator.selectColor);
        boundingRect.draw();
        this.selectedView = newView;
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
}
