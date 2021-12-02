import { Rect } from "./ui/rect.js";
import { MouseState } from './mouse_state.js';
export class Canvas {
    constructor() {
        this.rects = [];
        //create canvas in Dom and set value in class
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        MouseState.canvases.push(this);
        this.canvas = canvas;
        //set context in class
        if (canvas.getContext("2d") == null) {
            console.log("ERROR: no context found");
        }
        this.ctx = canvas.getContext("2d");
        //initialize resize events
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));
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
    }
    eraseShape() {
    }
    getOverlapp(x, y) {
        var finalRect = this.rects[0];
        var canChange = true;
        this.rects.slice().reverse().forEach(rect => {
            if (rect.isMouseOver(x, y) && rect.parent != null && canChange == true) {
                finalRect = rect;
                canChange = false;
            }
        });
        return finalRect;
    }
    logShapes() {
        console.log(this.rects);
    }
}
