import { ResizeHandler } from './event_handlers/resize.js';


export class Canvas {
    public canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    constructor() {
        //create canvas in Dom
        var canvas = document.createElement('canvas');
        canvas.style.position = "fixed";
        canvas.style.zIndex="1";
        canvas.style.pointerEvents="none"

        document.body.appendChild(canvas);
        this.canvas = canvas;

        //get the context
        if (canvas.getContext("2d") == null) {
            console.log("ERROR: no context found")
        }
        this.ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);

        //setup resize events
        ResizeHandler.canvases.push(this);
        this.resize();
    }

    public resizeCanvasToDisplaySize(canvas: HTMLCanvasElement) {
        // Lookup the size the browser is displaying the canvas in CSS pixels.
        const dpr = window.devicePixelRatio;
        const { width, height } = canvas.getBoundingClientRect();
        const displayWidth = Math.round(width * dpr);
        const displayHeight = Math.round(height * dpr);

        // Check if the canvas is not the same size.
        const needResize = canvas.width != displayWidth ||
            canvas.height != displayHeight;

        if (needResize) {
            // Make the canvas the same size
            canvas.width = displayWidth;
            canvas.height = displayHeight;
        }

        return needResize;
    }

    public resize() {
        let ratio = window.devicePixelRatio;
        let style_width = +getComputedStyle(this.canvas).getPropertyValue("width").slice(0, -2);//+ makes to integer, slice removes px at end
        let style_height = +getComputedStyle(this.canvas).getPropertyValue("height").slice(0, -2);//+ makes to integer, slice removes px at end
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.resizeCanvasToDisplaySize(this.canvas)
    }
}