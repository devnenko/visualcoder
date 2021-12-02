import { Canvas } from './canvas.js';

export class MouseState{
    public static canvases:Canvas[]=[];
    public static absPos={x:0,y:0};
    public static init(){
        window.addEventListener('click', MouseState.mouseClick.bind(this));
    }
    private static mouseClick(e:MouseEvent) {
        MouseState.absPos={x:e.x,y:e.y}
        var obj=MouseState.canvases[0].getOverlapp(e.x,e.y)
        console.log(obj);
        obj.clickE();
    }
}