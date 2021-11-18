import { Rect } from "./ui/rect.js";
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
        //add Bounding Rect
        //this.boundingRect=new Rect();
        //this.startDraw(this.boundingRect);
        //this.boundingRect.setMargin({left:10,right:20})
        //this.boundingRect.color="green";
        //this.updateContent();
        this.boundingRect = new Rect(null, this);
        this.boundingRect.setColor("black");
        this.startDraw(this.boundingRect);
        this.updateContent();
    }
    resizeWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.updateContent();
    }
    updateContent() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rects.forEach(rect => {
            rect.resize();
            rect.draw();
        });
    }
    startDraw(rect) {
        rect.setCanvas(this);
        this.rects.push(rect);
        console.log(rect);
    }
    eraseShape() {
    }
}
