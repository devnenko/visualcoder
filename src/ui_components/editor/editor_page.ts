import { Block} from './view/block.js';
import { BoundingRect } from '../../ui/bounding_shape.js';
import { Canvas } from '../../ui/canvas.js';
import { HorizontalBox } from '../../ui/horizontal_box.js';
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
import { SideBar } from './sidebar/sidebar.js';
import { View } from './view/view.js';
import { PinType, ViewBlock } from './view/view_block.js';
import { Shape } from '../../ui/shape.js';
import { RectType } from '../../ui/rect.js';

export function getDampedColor(color:string){
    return "hsl(" + stringToHueColor(color) + ",30%,60%)";
}

function stringToHueColor(str:string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    var h = hash % 360;
    return h;
}

export class EditorPage extends Shape{
    public static self:EditorPage;
    public canvas=new Canvas();

    public horizBox=new HorizontalBox(this,this.canvas)
    public sideBox=new SideBar(this.horizBox,this.canvas)
    public view;
    constructor(parent:RectType,canvas:Canvas){
        super(parent,canvas);
        
        this.view=new View(this.horizBox,this.canvas);
        
        this.horizBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        this.horizBox.isVisible=false;
        EditorPage.self=this;
        const mainBlock=new Block(getDampedColor("cyan"),"main");
        this.view.load(mainBlock);
    }

}
