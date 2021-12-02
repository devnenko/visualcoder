import { Rect } from "./ui/rect.js";
import {MouseState} from './mouse_state.js';

export class Canvas {
    //right now, the canvas always takes the whole window space (might need to add options later)
    public canvas;
    public ctx:CanvasRenderingContext2D;
    public boundingRect:Rect;
    public rects: Rect []=[];
    constructor() {
        //create canvas in Dom and set value in class
        var canvas = document.createElement('canvas');
        document.body.appendChild(canvas);
        MouseState.canvases.push(this);
        this.canvas = canvas;

        //set context in class
        if(canvas.getContext("2d")==null){
            console.log("ERROR: no context found")
        }
        this.ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);

        //initialize resize events
        this.resizeWindow();
        window.addEventListener('resize', this.resizeWindow.bind(this));

        this.boundingRect = new Rect(null,this);
        this.boundingRect.setColor("black");
        this.startDraw(this.boundingRect);
        this.updateContent();
    }

    private resizeWindow() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.updateContent();
    }

    public updateContent(){

        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

        this.rects.forEach(rect => {
            rect.resize();

            rect.draw();
        });
    }

    public startDraw(rect:Rect){
        rect.setCanvas(this);
        this.rects.push(rect);
    }

    public eraseShape(){

    }

    public getOverlapp(x:number,y:number){
        var finalRect:Rect=this.rects[0];
        var canChange=true;
        this.rects.slice().reverse().forEach(rect => {
            if(rect.isMouseOver(x,y)&&rect.parent!=null&&canChange==true){
                finalRect=rect;
                canChange=false;
            }
        });
        return finalRect;
    }

    public logShapes(){
        console.log(this.rects);
    }
}