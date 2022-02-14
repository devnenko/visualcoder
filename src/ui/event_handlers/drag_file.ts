// @ts-nocheck


import { editor } from "../../main.js";
import { Canvas } from "../canvas.js";
import { boundingShape } from "../shape.js";

//add info here
//

export class DragFileHandler{

    public static canvases:Canvas[]=[];

    static init(){
        var dragArea = document.createElement('div');
        dragArea.style.position="fixed";
        dragArea.style.top="0";
        dragArea.style.left="0";
        dragArea.style.width="100%";
        dragArea.style.height="100%";
        document.body.appendChild(dragArea);
        dragArea.ondragover=DragFileHandler.dragOverScreen.bind(this);
        dragArea.ondrop=DragFileHandler.dropOverScreen.bind(this);
    }

    static dragOverScreen(e:any){
        console.log('File(s) over screen');
        const pos={x:e.clientX,y:e.clientY};
        //editor.updateViewPreview(pos)
        e.stopPropagation();
        e.preventDefault();
        boundingShape.drawHierarchy();
    }

    static dropOverScreen(e:DragEvent){
        console.log('File(s) dropped');
        console.log("drop")
        //const bnew=new CBButton(editor.contentBrowser,editor.contentBrowser.canvas);
        e.stopPropagation();
        e.preventDefault();
        //console.log(e.dataTransfer?.items[0].getAsFile())
        if(e.dataTransfer){
            e.dataTransfer?.items[0].getAsFile()?.text().then((val)=>{
                bnew.source=val; 
                console.log(bnew)
                console.log(val);
                editor.selectedView.load(bnew);
                boundingShape.drawHierarchy();
                }
            );
            if(e.dataTransfer.items[0].getAsFile()){
                bnew.title.text=e.dataTransfer?.items[0].getAsFile()?.name as string;
            }
        }
        const pos={x:e.clientX,y:e.clientY};
        editor.convertToView(pos,bnew);
        boundingShape.drawHierarchy();
        editor.convertToView(pos,)
        console.log('File(s) dropped');
    }
}