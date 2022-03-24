
import { colorCreator } from '../../util/color.js';
import { MouseHandler } from '../../ui/event_handlers/mouse.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { HzBox } from '../../ui/hz_box.js';
import { VtBox } from '../../ui/vt_box.js';
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { Editor } from "../editor.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { destroy } from '../../compiler/lib.js';
import { TextRect } from '../../ui/text_rect.js';
import { View } from './view.js';
import { AllSvg } from '../../util/allsvg.js';

export class ViewTopBar extends Rect{
    title;
    delButton;
    constructor(view:View){
        super();
        this.addConfig({
            parent:view,
            fixedSizeH:50,
            color:colorCreator.colorByBrightness(5)
        })

        this.title=new TextRect;
        this.title.addConfig({
            parent:this,
            constraintY:EConstraintsY.center,
            fixedOffsetX:5,
            size:28,
            text:view.getName()
        })

        this.delButton=new (MakeHoverPressButton(MakeClickable(SvgRect)))
        this.delButton.addConfig({
            parent:this,
            constraintX:EConstraintsX.right,
            constraintY:EConstraintsY.scale,
            fixedSizeW:this.fixedSizeH,
            snapMargin:5,
            forgetOnMouseLeave:true,
            onRelease:(mouseHandler:MouseHandler)=>{
                view.destroy();
            },
        })
        this.delButton.addConfig({
            svg:AllSvg.xMark
        })
    }
}
