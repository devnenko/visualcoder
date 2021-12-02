class EdgesNumber {
    constructor() {
        this.top = 0;
        this.bottom = 0;
        this.left = 0;
        this.right = 0;
    }
    static getArrays(obj) {
        let arrayNames = [];
        let arrayNumbers = [];
        if (obj.left != null) {
            arrayNames.push("left");
            arrayNumbers.push(obj.left);
        }
        if (obj.right != null) {
            arrayNames.push("right");
            arrayNumbers.push(obj.right);
        }
        if (obj.top != null) {
            arrayNames.push("top");
            arrayNumbers.push(obj.top);
        }
        if (obj.bottom != null) {
            arrayNames.push("bottom");
            arrayNumbers.push(obj.bottom);
        }
        return { nameArray: arrayNames, numberArray: arrayNumbers };
    }
    static screenEdges(canvas) {
        return {
            left: 0,
            right: canvas.canvas.width,
            top: 0,
            bottom: canvas.canvas.height,
        };
    }
}
var ResizeType;
(function (ResizeType) {
    ResizeType[ResizeType["sr"] = 0] = "sr";
    ResizeType[ResizeType["px"] = 1] = "px";
})(ResizeType || (ResizeType = {}));
export class Rect {
    constructor(parent, canvas) {
        //final render data
        this.absPos = { x: 0, y: 0 };
        this.absSize = { w: 100, h: 100 };
        this.color = "pink";
        //for relative calculations
        this.parent = null;
        this.children = [];
        this.absEdges = new EdgesNumber(); //maybe needs to be read by child
        //addit data
        this.stretchTo = { left: true, right: true, top: true, bottom: true };
        this.stretchToOffset = new EdgesNumber();
        this.fixedOffset = new EdgesNumber();
        this.parent = parent;
        this.canvas = canvas;
        this.canvas.startDraw(this);
    }
    setParent(parent) {
        this.parent = parent;
        this.parent?.children.push(this);
        this.resize();
    }
    setCanvas(canvas) {
        this.canvas = canvas;
    }
    setColor(color) {
        this.color = color;
    }
    setStretchAndOffset(obj) {
        var leftLast2 = obj.left.slice(-2);
        if (leftLast2 == "sr") {
            var numb = obj.left.replace(/\D/g, "");
            this.stretchToOffset.left = parseInt(numb);
            this.stretchTo.left = true;
        }
        else if (leftLast2 == "px") {
            var numb = obj.left.replace(/\D/g, "");
            this.fixedOffset.left = parseInt(numb);
            this.stretchTo.left = false;
        }
        else {
            console.log("error");
        }
        var rightLast2 = obj.right.slice(-2);
        if (rightLast2 == "sr") {
            var numb = obj.right.replace(/\D/g, "");
            this.stretchToOffset.right = parseInt(numb);
            this.stretchTo.right = true;
        }
        else if (rightLast2 == "px") {
            var numb = obj.right.replace(/\D/g, "");
            this.fixedOffset.right = parseInt(numb);
            console.log(this);
            this.stretchTo.right = false;
        }
        else {
            console.log("error");
        }
        var topLast2 = obj.top.slice(-2);
        if (topLast2 == "sr") {
            var numb = obj.top.replace(/\D/g, "");
            this.stretchToOffset.top = parseInt(numb);
            this.stretchTo.top = true;
        }
        else if (topLast2 == "px") {
            var numb = obj.top.replace(/\D/g, "");
            this.fixedOffset.top = parseInt(numb);
            this.stretchTo.top = false;
        }
        else {
            console.log("error");
        }
        var bottomLast2 = obj.bottom.slice(-2);
        if (bottomLast2 == "sr") {
            var numb = obj.bottom.replace(/\D/g, "");
            this.stretchToOffset.bottom = parseInt(numb);
            this.stretchTo.bottom = true;
        }
        else if (bottomLast2 == "px") {
            var numb = obj.bottom.replace(/\D/g, "");
            this.fixedOffset.bottom = parseInt(numb);
            this.stretchTo.bottom = false;
        }
        else {
            console.log("error");
        }
        this.canvas.updateContent();
    }
    setStretchTo(left, right, top, bottom) {
        this.stretchTo = { left: left, right: right, top: top, bottom: bottom };
        this.resize();
    }
    setFixedOffset(left, right, top, bottom) {
        this.fixedOffset = { left: left, right: right, top: top, bottom: bottom };
        this.resize();
    }
    resize() {
        //maybe make stretch define if they stretch to corner and else its just relative to fixed offset is just relative to othe side
        //would make more sense and less problems
        //should also resize children or we might get problems
        if (this.parent != null) {
            if (this.stretchTo.left == true) {
                this.absEdges.left = this.parent.absEdges.left + this.stretchToOffset.left;
            }
            if (this.stretchTo.right == true) {
                this.absEdges.right = this.parent.absEdges.right - this.stretchToOffset.right;
            }
            if (this.stretchTo.top == true) {
                this.absEdges.top = this.parent.absEdges.top + this.stretchToOffset.top;
            }
            if (this.stretchTo.bottom == true) {
                this.absEdges.bottom = this.parent.absEdges.bottom - this.stretchToOffset.bottom;
            }
            if (this.fixedOffset.left != 0) {
                this.absEdges.left = this.absEdges.right - this.fixedOffset.left;
            }
            if (this.fixedOffset.right != 0) {
                this.absEdges.right = this.parent.absEdges.left + this.absEdges.left + this.fixedOffset.right;
            }
            if (this.fixedOffset.top != 0) {
                this.absEdges.top = this.absEdges.bottom - this.fixedOffset.top;
            }
            if (this.fixedOffset.bottom != 0) {
                this.absEdges.bottom = this.parent.absEdges.top + this.absEdges.top + this.fixedOffset.bottom;
            }
        }
        else {
            this.absEdges = EdgesNumber.screenEdges(this.canvas);
        }
        this.applyAbsPos();
    }
    applyAbsPos() {
        //convert absolute edges to position and size
        let arrays = EdgesNumber.getArrays(this.absEdges);
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
    draw() {
        this.canvas.ctx.beginPath();
        this.canvas.ctx.rect(this.absPos.x, this.absPos.y, this.absSize.w, this.absSize.h);
        this.canvas.ctx.fillStyle = this.color;
        this.canvas.ctx.fill();
    }
}
