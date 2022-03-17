import { ViewTopBar } from './topbar.js';
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
import { ViewContentArea } from './content_area.js';

export class View{
    private name;

    boundBox;
    topBar;
    contArea;
    constructor(editor:Editor,name:string){
        this.name=name;

        this.boundBox = new VtBox;
        this.boundBox.addConfig({
            parent:editor.boundBox,
            fillSpace: true,
            isVisible: false,
            zIndex:1
        })

        this.topBar=new ViewTopBar(this);

        this.contArea=new ViewContentArea(this);

    }

    setName(name:string){
        this.name=name;
        this.topBar.title.addConfig({
            text:name
        })
    }

    getName(){
        return this.name;
    }
}