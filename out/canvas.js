export class Canvas {
    constructor() {
        this.rects = [];
        //create canvas in Dom and set value in class
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        this.canvas = canvas;
        //set context in class
        if (canvas.getContext("2d") == null) {
            console.log("ERROR: no context found");
        }
        this.ctx = canvas.getContext("2d");
        //initialize resize events
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
    }
    resizeWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.updateContent();
    }
    updateContent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rects.forEach(rect => {
            this.ctx.beginPath();
            this.ctx.rect(rect.relPos.x, rect.relPos.y, rect.absSize.w, rect.absSize.h);
            this.ctx.fillStyle = rect.color;
            this.ctx.fill();
        });
    }
    startDraw(rect) {
        rect.canvas = this;
        this.rects.push(rect);
    }
    eraseShape() {
    }
}