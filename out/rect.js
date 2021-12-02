export class Rect {
    constructor() {
        //public parent:Rect;
        this.canvas = null;
        this.absPos = { x: 0, y: 0 };
        this.absSize = { w: 100, h: 100 };
        this.relPos = { x: 80, y: 0 };
        this.relSize = { w: 40, h: 100 };
        this.margin = { left: null, right: null, top: null, bottom: null };
        this.fixedOffset = { left: null, right: null, top: null, bottom: null };
        this.color = "pink";
        this.layer = 0;
    }
    setParent() {
    }
    optToNullable(distanceTo) {
        let k;
        for (k in distanceTo) {
            
            console.log(k);
            console.log(distanceTo[k]);
        }
        switch (distanceTo) {
            case 'left': {
                console.log("topppp");
                break;
            }
        }
        return 0;
    }
    setMargin(margin) {
        this.margin = this.optToNullable(margin);
        if (this.margin.left != null) {
            this.setEdgesWorld({ left: this.margin.left, right: null, top: null, bottom: null });
        }
        if (this.margin.right != null) {
            this.setEdgesWorld({ left: null, right: this.canvas.canvas.width - this.margin.right, top: null, bottom: null });
        }
        if (this.margin.top != null) {
            this.setEdgesWorld({ left: null, right: null, top: this.margin.top, bottom: null });
        }
        if (this.margin.bottom != null) {
            this.setEdgesWorld({ left: null, right: null, top: null, bottom: this.canvas.canvas.height - this.margin.bottom });
        }
        console.log(this);
    }
    setFixedOffset(fixedOffset) {
        this.fixedOffset = this.optToNullable(fixedOffset);
        if (this.fixedOffset.left != null) {
            this.setEdgesWorld({ left: this.margin.left, right: null, top: null, bottom: null });
        }
        if (this.fixedOffset.right != null) {
            this.setEdgesWorld({ left: null, right: this.canvas.canvas.width - this.margin.right, top: null, bottom: null });
        }
        if (this.fixedOffset.top != null) {
            this.setEdgesWorld({ left: null, right: null, top: this.margin.top, bottom: null });
        }
        if (this.fixedOffset.bottom != null) {
            this.setEdgesWorld({ left: null, right: null, top: null, bottom: this.canvas.canvas.height - this.margin.bottom });
        }
        console.log(this);
    }
    setEdgesWorld(edges) {
        if (edges.left != null) {
            this.absSize.w = this.absSize.w - (edges.left - this.absPos.x);
            this.absPos.x = edges.left;
        }
        if (edges.right != null) {
            this.absSize.w = edges.right - this.absPos.x;
        }
        if (edges.top != null) {
            this.absSize.h = this.absSize.h - (edges.top - this.absPos.y);
            this.absPos.y = edges.top;
        }
        if (edges.bottom != null) {
            this.absSize.h = edges.bottom - this.absPos.y;
        }
    }
}
