class EdgesNullable {
    constructor(obj) {
        this.top = obj.top || null;
        this.bottom = obj.bottom || null;
        this.left = obj.left || null;
        this.right = obj.right || null;
        if (obj.left == 0) {
            this.left = 0;
        }
        if (obj.right == 0) {
            this.right = 0;
        }
        if (obj.top == 0) {
            this.top = 0;
        }
        if (obj.bottom == 0) {
            this.bottom = 0;
        }
    }
    getArrays() {
        let arrayNames = [];
        let arrayNumbers = [];
        if (this.left != null) {
            arrayNames.push("left");
            arrayNumbers.push(this.left);
        }
        if (this.right != null) {
            arrayNames.push("right");
            arrayNumbers.push(this.right);
        }
        if (this.top != null) {
            arrayNames.push("top");
            arrayNumbers.push(this.top);
        }
        if (this.bottom != null) {
            arrayNames.push("bottom");
            arrayNumbers.push(this.bottom);
        }
        return { nameArray: arrayNames, numberArray: arrayNumbers };
    }
}
export class Rect {
    constructor() {
        //public parent:Rect;
        this.canvas = null;
        this.absPos = { x: 0, y: 0 };
        this.absSize = { w: 100, h: 100 };
        this.relPos = { x: 80, y: 0 };
        this.relSize = { w: 40, h: 100 };
        this.margin = new EdgesNullable({});
        this.fixedOffset = new EdgesNullable({});
        this.color = "pink";
        this.layer = 0;
    }
    setParent() {
    }
    resizeContent() {
        this.updateMargin();
        this.updateFixedOffset();
    }
    optToNullable(distanceTo) {
        this.margin = new EdgesNullable(distanceTo);
        return this.margin.getArrays();
    }
    setMargin(margin) {
        this.margin = new EdgesNullable(margin);
        this.updateMargin();
    }
    setFixedOffset(fixedOffset) {
        //probably doesnt work for left  and top
        this.fixedOffset = new EdgesNullable(fixedOffset);
        this.updateFixedOffset();
    }
    updateMargin() {
        let arrays = this.margin.getArrays();
        for (var i = 0; i < arrays.nameArray.length; i++) {
            let name = arrays.nameArray[i];
            let value = arrays.numberArray[i];
            switch (name) {
                case 'left':
                    this.setEdgesWorld({ left: value });
                    break;
                case 'right':
                    this.setEdgesWorld({ right: this.canvas.canvas.width - value });
                    break;
                case 'top':
                    this.setEdgesWorld({ top: value });
                    break;
                case 'bottom':
                    this.setEdgesWorld({ bottom: this.canvas.canvas.height - value });
                    break;
            }
        }
    }
    updateFixedOffset() {
        if (this.fixedOffset.left != null) {
            this.setEdgesWorld({ left: this.fixedOffset.left });
        }
        if (this.fixedOffset.right != null) {
            this.setEdgesWorld({ right: this.fixedOffset.right });
        }
        if (this.fixedOffset.top != null) {
            this.setEdgesWorld({ top: this.fixedOffset.top });
        }
        if (this.fixedOffset.bottom != null) {
            this.setEdgesWorld({ bottom: this.fixedOffset.bottom });
        }
    }
    setEdgesWorld(edges) {
        let arrays = new EdgesNullable(edges).getArrays();
        for (var i = 0; i < arrays.nameArray.length; i++) {
            let name = arrays.nameArray[i];
            let value = arrays.numberArray[i];
            switch (name) {
                case 'left':
                    this.absSize.w = this.absSize.w - (value - this.absPos.x);
                    this.absPos.x = value;
                    break;
                case 'right':
                    this.absSize.w = value - this.absPos.x;
                    break;
                case 'top':
                    this.absSize.h = this.absSize.h - (value - this.absPos.y);
                    this.absPos.y = value;
                    break;
                case 'bottom':
                    this.absSize.h = value - this.absPos.y;
                    break;
            }
        }
    }
}
