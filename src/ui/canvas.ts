
// @ts-ignore
import Stats from './../../node_modules/stats.js/src/Stats.js'
import { BoundingRect } from './bounding_rect.js';
import { ResizeHandler } from './event_handlers/resize.js';
import { Rect } from './rect.js';


//var stats = new Stats();
//stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
//document.body.appendChild( stats.dom );

//teh canvas class hase a html canvas which an assigned shape will be drawing to
//it also handles the resize events (maybe this should be changed later to be handled in a single location)

export class Canvas{
    public canvas:HTMLCanvasElement;
    public ctx:CanvasRenderingContext2D;

    public boundingRect=BoundingRect;


    constructor() {
        //create canvas in Dom
        var canvas = document.createElement('canvas');
        canvas.style.position="absolute";
        document.body.appendChild(canvas);
        this.canvas = canvas;

        //get the context
        if(canvas.getContext("2d")==null){
            console.log("ERROR: no context found")
        }
        this.ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);

        //setup resize events
        ResizeHandler.canvases.push(this);
        this.resize();
        //this.update();
        //window.addEventListener('resize', this.update.bind(this));
    }

    public resize(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private update(){
        
        //stats.begin();
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        //this.boundingRect.resize({left:0,top:0,right:window.innerWidth,bottom:window.innerHeight});
        //this.boundingRect.drawInHierarchy();
        this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        //for (const child of this.shapes){
        //    child.draw();
        //}
        //this.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

        //stats.end();
    }

    private erase(){
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
    
}