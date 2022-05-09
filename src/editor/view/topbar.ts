import { colorCreator } from '../../util/color.js';
import { mouseHandler, MouseHandler } from '../../ui/event_handlers/mouse.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { Editor } from "../editor.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { destroy } from '../../compiler/lib.js';
import { TextRect } from '../../ui/text_rect.js';
import { FileView, View } from './view.js';
import { AllSvg } from '../../util/allsvg.js';
import { Box, BoxType } from '../../ui/box.js';
import { TransformConversions } from '../../util/transform.js';
import { FileTypeE} from './view_connections.js';


export class ViewTopBar extends MakeClickable(Rect) {
    title;
    delButton;

    view;
    constructor(view: View) {
        super();
        this.view=view;
        this
            .sParent(view)
            .setFixedSizeH(50)
            .sColor(colorCreator.colorByBrightness(5))

        this.title = new TextRect;
        this.title
            .sParent(this)
            .sConstY(EConstraintsY.center)
            .sText(view.name)
            .sTextSize(28)
            .sFixedOffsetX(7)


        this.delButton = new (MakeHoverPressButton(MakeClickable(SvgRect)))
        this.delButton
            .sParent(this)
            .sConstX(EConstraintsX.right)
            .sConstY(EConstraintsY.scale)
            .sFixedSizeW(this.gFixedSize().h)
            .sSnapMargin(3)
            .sForgetOnLeave(true)
            .sSvg(AllSvg.xMark)
            .sFixedOffsetX(6)


        this.delButton.onRelease = (mouseHandler: MouseHandler) => {
            view.destroy();
        }



        //this.onMouseDown=()=>{
        //    console.log("show")
        //    view.editor.viewAddPreview.show();
        //}
        //this.onMouseUp=()=>{
        //    console.log("hide")
        //    view.editor.viewAddPreview.hide();
        //}
    }
}
