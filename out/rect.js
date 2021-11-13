export class Rect {
    constructor() {
        //public parent:Rect;
        this.canvas = null;
        this.absPos = { x: 0, y: 0 };
        this.absSize = { w: 40, h: 20 };
        this.relPos = { x: 0, y: 0 };
        this.margin = {};
        this.color = "pink";
        this.layer = 0;
    }
    setMargin(margin) {
        this.margin = margin;
        this.absSize.w = this.canvas.canvas.width;
        //this.canvas?.updateContent();
    }
}
