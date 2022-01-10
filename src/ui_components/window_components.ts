import { Block } from '../block.js';
import { getDampedColor } from '../main.js';
import { BoundingRect } from '../ui/bounding_rect.js';
import { Canvas } from '../ui/canvas.js';
import { HorizontalBox } from '../ui/horizontal_box.js';
import { EConstraintsX, EConstraintsY } from '../ui/types/constraints.js';
import { SideBar } from './sidebar/sidebar.js';
import { View } from './view/view.js';
import { ViewBlock } from './view/view_block.js';

export class WindowComponents{
    public canvas=new Canvas();

    public horizBox=new HorizontalBox(BoundingRect,this.canvas)
    public sideBox=new SideBar(this.horizBox,this.canvas)
    public view;
    constructor(){
        const mainBlock=new Block(getDampedColor("cyan"),"main");
        this.view=new View(this.horizBox,this.canvas, mainBlock);
        this.horizBox.setConstraints(EConstraintsX.scale,EConstraintsY.scale)
        this.horizBox.isVisible=false;
    }
}