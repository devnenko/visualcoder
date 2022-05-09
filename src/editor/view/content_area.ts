import { colorCreator } from '../../util/color.js';
import { MakeClickable } from '../../ui/clickable_rect.js';
import { View } from './view.js';
import { Rect } from '../../ui/rect.js';

export class ViewContentArea{
    boundBox;
    constructor(view:View){
        this.boundBox=new (MakeClickable(Rect))
        this.boundBox
            .sParent(view)
            .sFillSpace()
            .sColor(colorCreator.colorByBrightness(10))
    }
}
