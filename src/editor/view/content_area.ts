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

export class ViewContentArea{
    boundBox;
    constructor(view:View){
        this.boundBox=new (MakeClickable(Rect))
        this.boundBox.addConfig({
            parent:view.boundBox,
            fillSpace:true,
            color:colorCreator.colorByBrightness(10)
        })
    }
}
