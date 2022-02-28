
import { Level } from "../editor/views/level/level.js";

//single canvas or multicanvas (single canvas big screen)
//draw commands automatic or issued by lib (by lib every time there is a change)
//Dom Model done by user or me //keep track of all objects

export class Canvas{
    public canvas:HTMLCanvasElement;
    public ctx:CanvasRenderingContext2D;
    constructor(){
        var canvas = document.createElement('canvas');
        canvas.style.position="absolute";
        canvas.id="dest"
    
        document.body.appendChild(canvas);
        //for(const view of editor.views){
        //    if (view.contentArea instanceof Scene){
        //        canvas.style.left=view.contentArea.absEdges.left+"px"
        //        canvas.style.top=view.contentArea.absEdges.top+"px"
        //        canvas.width=view.contentArea.getAbsSize().w;
        //        canvas.height=view.contentArea.getAbsSize().h;
        //    }
        //}

        this.canvas = canvas;

        //get the context
        if(canvas.getContext("2d")==null){
            console.log("ERROR: no context found")
        }
        this.ctx = (canvas.getContext("2d") as CanvasRenderingContext2D);
        //for(const view of editor.contentArea.children){
        //    console.log(view)
        //    //if(views instanceof View){
        //    //    canvas.style.left=views.+"px"
        //    //    canvas.style.top="100px"
        //    //}
        //}
        //if(editor.children[1].children[0].children[0].children[1].children[0] instanceof Scene){
        //    canvas.style.left="0px"
        //    canvas.style.top="0px"
        //}
    }
    drawObjects(){
        for(const obj of allObjects){
            this.ctx.beginPath();
            this.ctx.rect(obj.transform.pos.x, obj.transform.pos.y,obj.transform.size.w,obj.transform.size.h);
            this.ctx.fillStyle="blue";
            this.ctx.fill();
        }
    }
}


//make next 10 lines into a class
export let canvas:Canvas|null=null;
let allObjects:Object[]=[];

export function init(){
    //execute on start
    canvas=new Canvas();
    allObjects=[];
}

export function destroy(){

}




export interface IPos{
    x:number;
    y:number;
}

export interface ISize{
    w:number;
    h:number;
}

export interface ITransform {
    pos:IPos;
    size:ISize;
}

export class Object{
    transform;
    constructor(transform:ITransform){
        this.transform=transform;
        allObjects.push(this);
        canvas?.drawObjects();
    }
}
export function customCode(){
    console.log("custom code execute");
}

export class Transform2D{

}



export function LogConsoleTest(val: any) {
}

//class object{transform,vertices,material,parent,children[]} =>new adds and draws it directly

//