import { ViewTopBar } from './topbar.js';
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { Editor } from "../editor.js";
import { ViewContentArea } from './content_area.js';
import { Direction } from '../../util/transform.js';
import { boundingRect, BoundingRect } from '../../ui/bounding_rect.js';
import { Box, BoxType } from '../../ui/box.js';
import { colorCreator } from '../../util/color.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { MakeClickable } from '../../ui/clickable_rect.js';
import { mouseHandler, MouseHandler } from '../../ui/event_handlers/mouse.js';
import { CbFile } from '../content_browser/content_browser.js';
import { TextView } from '../text/text_view.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { AllSvg } from '../../util/allsvg.js';
import { fileTypes, ViewSelectButton } from './view_connections.js';

export class ViewConnector extends Box {
    canDestroy: boolean = true;
    constructor(boxType: BoxType, parent: Rect) {
        super(boxType);

        this
            .sParent(parent)
            .sFillSpace()
            .sIsVisible(false)

        this.setInBetween(MakeHoverPressButton(MakeClickable(Rect)), (rect: any) => {
            rect.sFixedSize(10)
                .sColor(colorCreator.colorByBrightness(0))
            rect.idleColor = colorCreator.colorByBrightness(0);
            rect.hoverColor = colorCreator.colorByBrightness(40);
            rect.pressColor = colorCreator.colorByBrightness(40);
            let prevPos = { x: 0, y: 0 }
            let propObj = 0;
            rect.onPress = (mouseHandler: MouseHandler) => {
                prevPos = mouseHandler.mousePos;
                this.impValues();
                propObj = this.childProportionsSumm;
            }
            rect.onMovePressed = (mouseHandler: MouseHandler) => {
                this.impValues();
                const allProp = this.childProportionsSumm;
                const delta = { x: mouseHandler.mousePos.x - prevPos.x, y: mouseHandler.mousePos.y - prevPos.y };
                prevPos = mouseHandler.mousePos;
                //if(this.gBoxType()==BoxType.hz){
                //    this.children[0].sBoxProp(this.children[0].gBoxProp()+delta.x);
                //}
                //else{
                //    this.children[0].sBoxProp(this.children[0].gBoxProp()+delta.y);
                //}
                boundingRect.draw()
            }
        })
    }

    checkIfChildren(amount: number) {
        if (this.gChildren().length == amount)//if only 1 children
        {
            if (this.canDestroy == true)//if is not topmost viewConnector
            {
                return true;
            }
        }
        return false;
    }
}


export class View extends Box//make clickable for hover events handling later
{
    public name = "defaultview";
    protected parent: ViewConnector | BoundingRect = boundingRect;


    topBar;
    contArea;
    editor;
    constructor(editor: Editor) {
        super(BoxType.vt);
        this.setInitValues();
        this.editor = editor;
        editor.views.push(this);

        let newParent: ViewConnector;
        //if (origin && dir)//if not first view to add on screen
        //{
        //    newParent = this.addViewInDir(origin, dir);
        //}
        //else {
        //    newParent = editor.viewBox;
        //}
        //this
        //    .sParent(newParent)
        //    .sFillSpace()
        //    .sIsVisible(true);
        //if (dir) {
        //    if (dir == Direction.left || dir == Direction.top) {
        //        this.indexInParent(0)
        //    }
        //}

        //newParent.refreshInBetween();
        //boundingRect.draw();
        this.topBar = new ViewTopBar(this);

        this.contArea = new (MakeClickable(Rect))
        this.contArea
            .sParent(this)
            .sFillSpace()
            .sColor(colorCreator.colorByBrightness(10))

        //so created children can inherit zindex behaviour
        //maybe code that always take highest in hierarchy
        this.sZIndex(1);
        this.topBar.sZIndex(20);



        boundingRect.draw();
    }


    setInitValues() {

    }

    refresh() {

    }

    addViewInDir(origin: View, dir: Direction) {
        const originConnector = (origin.parent as ViewConnector);
        let viewConnector: ViewConnector;
        if (originConnector.gBoxType() == BoxType.hz) {
            switch (dir) {
                case Direction.left:
                    viewConnector = origin.parent as ViewConnector;
                    origin.sParent(viewConnector);
                    break;
                case Direction.right:
                    viewConnector = origin.parent as ViewConnector;;
                    origin.sParent(viewConnector);
                    break;
                case Direction.top:
                    viewConnector = new ViewConnector(BoxType.vt, originConnector)
                    origin.sParent(viewConnector);
                    break;
                case Direction.bottom:
                    viewConnector = new ViewConnector(BoxType.vt, originConnector)
                    origin.sParent(viewConnector);
                    break;
            }
        } else {
            switch (dir) {
                case Direction.left:
                    viewConnector = new ViewConnector(BoxType.hz, originConnector as Rect)
                    origin.sParent(viewConnector);
                    break;
                case Direction.right:
                    viewConnector = new ViewConnector(BoxType.hz, originConnector as Rect)
                    origin.sParent(viewConnector);
                    break;
                case Direction.top:
                    viewConnector = origin.parent as ViewConnector;;
                    origin.sParent(viewConnector);
                    break;
                case Direction.bottom:
                    viewConnector = origin.parent as ViewConnector;;
                    origin.sParent(viewConnector);
                    break;
            }
        }
        boundingRect.draw();
        return viewConnector;
    }

    destroy() {
        let parent = this.parent as ViewConnector;

        this.editor.views.splice(this.editor.views.indexOf(this), 1)
        super.destroy();
        parent.refreshInBetween();//is necessary
        if (parent.checkIfChildren(1) == true) {
            if (parent.gChildren()[0] instanceof ViewConnector) {
                if ((parent.gChildren()[0] as ViewConnector).gBoxType() == (parent.gParent() as ViewConnector).gBoxType()) {
                    parent.gChildren()[0].popOut();
                }
            }
            parent.popOut();
        }

        parent.refreshInBetween();

        boundingRect.draw();
    }
}


export class FileView extends View {
    file;
    switchViewButton;
    viewSelect: null | ViewSelectButton = null;
    constructor(editor: Editor, file: CbFile, origin?: View, dir?: Direction) {
        super(editor, origin, dir);
        this.file = file;

        this.switchViewButton = new (MakeHoverPressButton(MakeClickable(SvgRect)))
        this.switchViewButton
            .sParent(this.topBar)
            .sConstX(EConstraintsX.right)
            .sConstY(EConstraintsY.scale)
            .sFixedSizeW(this.topBar.gFixedSize().h)
            .sSnapMargin(3)
            .sForgetOnLeave(true)
            .sSvg(AllSvg.folder)
            .sFixedOffsetX(6 + this.topBar.gFixedSize().h)
            .sZIndex(200)

        this.switchViewButton.onRelease = (mouseHandler: MouseHandler) => {
            console.log("release1")
            //console.log(fileTypes)
            //this.viewSelect = new ViewSelectButton(this);
        }
        boundingRect.draw();
    }
    setInitValues(): void {
        this.name = "defaultfileview"
    }
}
