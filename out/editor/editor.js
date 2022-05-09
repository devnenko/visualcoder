import { AllSvg } from './../util/allsvg.js';
import { SvgRect } from '../ui/svg_rect.js';
import { colorCreator } from './../util/color.js';
import { Rect } from "../ui/rect.js";
import { MakeClickable } from '../ui/clickable_rect.js';
import { MakeToggleButton } from '../ui_components/button.js';
import { Direction } from '../util/transform.js';
import { boundingRect } from '../ui/bounding_rect.js';
import { Box, BoxType } from '../ui/box.js';
import { ContentBrowser } from './content_browser/content_browser.js';
import { ViewController } from './view_cont.js';
import { ContentBrowser1 } from './content_browser.js';
export class SideBarViewButton extends (MakeToggleButton(MakeClickable(SvgRect))) {
    constructor(editor, icon, viewToAdd, dir) {
        super();
        this.sSnapMargin(5)
            .sParent(editor.sideBar)
            .sFixedSize(editor.sideBar.gFixedSize().w)
            .sZIndex(10)
            .sSvg(icon);
        this.canClickToggleOf = false;
        this.viewToAdd = viewToAdd;
        this.onToggle = (isOn) => {
            if (isOn) {
                let view = editor.addView(editor.contBrowserCont);
                view.removeCallback = () => {
                    this.toggle(false);
                };
            }
        };
    }
}
//class ViewAddPreview{
//    viewBox;
//    rects:Rect[]=[];
//    constructor(viewBox:ViewConnector){
//        this.viewBox=viewBox;
//    }
//    show(selectedView:View){
//        const parentConnector=selectedView.gParent() as ViewConnector;
//        if(parentConnector.gChildren().length!=1){
//            if(parentConnector.gChildren().indexOf(selectedView)==0){
//                this.rects.push(new Rect);
//                this.rects[this.rects.length-1].sZIndex(20)
//                    .sConstY(EConstraintsY.center)
//                    .sConstX(EConstraintsX.right)
//            }
//            if(parentConnector.gChildren().indexOf(selectedView)==2){
//                this.rects.push(new Rect);
//                this.rects[this.rects.length-1].sZIndex(20)
//                    .sConstY(EConstraintsY.center)
//            }
//        }
//
//        boundingRect.draw();
//    }
//
//    hide(){
//        this.rects.forEach(el=>el.destroy())
//        this.rects=[];
//        boundingRect.draw();
//    }
//}
export class Editor {
    constructor() {
        this.boundBox = new Box(BoxType.vt);
        this.boundBox
            .sFillSpace()
            .sIsVisible(false);
        this.sideBar = new Box(BoxType.hz);
        this.sideBar
            .sParent(this.boundBox)
            .sFixedSize(75)
            .sColor(colorCreator.colorByBrightness(22));
        this.sideBar.setInBetween(Rect, (rect) => {
            rect.sFixedSize(7)
                .sColor(colorCreator.colorByBrightness(40));
        });
        this.orientSideBar();
        this.viewBox = new Box(BoxType.hz);
        this.viewBox.sParent(this.boundBox)
            .sFillSpace()
            .sIsVisible(false);
        //this.viewBox.canDestroy = false;
        //const backButton = new SideBarViewButton(this, AllSvg.folder, ContentBrowser, Direction.left)
        const cbButton = new SideBarViewButton(this, AllSvg.folder, ContentBrowser, Direction.left);
        this.sideBar.refreshInBetween();
        boundingRect.draw();
        this.contBrowserCont = new ViewController(this);
        this.contBrowserCont.availableViews.push(ContentBrowser1);
    }
    createController() {
        return new ViewController(this);
    }
    addView(cont) {
        const view = cont.addView();
        boundingRect.draw();
        return view;
    }
    //addViewGeneric(type:(new (editor: Editor, origin?: View, dir?: Direction)=>View),dir?:Direction) {
    //    //check if space is to small on x and y axis
    //    if (false) {
    //        return null;
    //    }
    //    let view;
    //    if (this.views.length == 0) {
    //        view = new type(this)
    //    }
    //    else if (this.views.length<=1) {
    //        if(dir){
    //            view = new type(this, this.views[this.views.length - 1], dir);
    //        }
    //        else{
    //            view = new type(this, this.views[this.views.length - 1], Direction.right);
    //        }
    //    }
    //    return view
    //    //return view or null if no view created cause not possible
    //}
    //addFileViewGeneric(type:new (editor: Editor,file:CbFile, origin?: View, dir?: Direction)=>FileView,file:CbFile,dir?:Direction) {
    //    //check if space is to small on x and y axis
    //    if (false) {
    //        return null;
    //    }
    //    let view;
    //    if (this.views.length == 0) {
    //        view = new type(this,file)
    //    }
    //    else if (this.views.length<=1) {
    //        if(dir){
    //            view = new type(this,file, this.views[this.views.length - 1], dir);
    //        }
    //        else{
    //            view = new type(this,file, this.views[this.views.length - 1], Direction.right);
    //        }
    //    }
    //    return view
    //    //return view or null if no view created cause not possible
    //}
    orientSideBar() {
        if (window.orientation == 90) //landscape
         {
            this.boundBox.sBoxType(BoxType.hz);
            this.sideBar.sBoxType(BoxType.vt);
        }
        else {
            this.boundBox.sBoxType(BoxType.vt);
            this.sideBar.sBoxType(BoxType.hz);
        }
    }
}
