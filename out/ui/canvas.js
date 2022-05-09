import { ResizeHandler } from './event_handlers/resize.js';
export class Canvas {
    constructor() {
        //create canvas in Dom
        var canvas = document.createElement('canvas');
        canvas.style.position = "absolute";
        canvas.style.zIndex = "1";
        //canvas.style.pointerEvents="none"
        document.body.appendChild(canvas);
        this.canvas = canvas;
        //get the context
        if (canvas.getContext("2d") == null) {
            console.log("ERROR: no context found");
        }
        this.ctx = canvas.getContext("2d");
        const dpr = window.devicePixelRatio;
        //setup resize events
        ResizeHandler.canvases.push(this);
        this.resize();
    }
    resize() {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const dpr = window.devicePixelRatio;
        this.canvas.width = window.innerWidth; //resize canvas to screen size
        this.canvas.height = window.innerHeight;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        //const { width:cssWidth, height:cssHeight } = this.canvas.getBoundingClientRect();
        //console.log("css: "+cssWidth+" o: "+this.canvas.width)
        this.canvas.width = windowWidth * dpr;
        this.canvas.height = windowHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = windowWidth + 'px';
        this.canvas.style.height = windowHeight + 'px';
        //this.canvas.style.width
        //this.ctx.setTransform(dpr,0,0,dpr,0,0);
    }
}
