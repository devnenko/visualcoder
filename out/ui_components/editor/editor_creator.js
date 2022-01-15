import { BoundingRect } from '../../ui/bounding_rect.js';
import { Canvas } from '../../ui/canvas.js';
import { HorizontalBox } from '../../ui/horizontal_box.js';
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
import { SideBar } from './sidebar/sidebar.js';
import { View } from './view/view.js';
export class WindowComponents {
    constructor() {
        this.canvas = new Canvas();
        this.horizBox = new HorizontalBox(BoundingRect, this.canvas);
        this.sideBox = new SideBar(this.horizBox, this.canvas);
        this.view = new View(this.horizBox, this.canvas);
        this.horizBox.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.horizBox.isVisible = false;
    }
}
