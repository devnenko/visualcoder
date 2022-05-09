import { boundingRect } from "../../ui/bounding_rect.js";
import { Box } from "../../ui/box.js";
import { Canvas } from "../../ui/canvas.js";
import { IKeyPressHandler, KeypressHandler } from "../../ui/event_handlers/keypress.js";
import { EConstraintsX, EConstraintsY } from "../../ui/rect.js";
import { TextRect } from "../../ui/text_rect.js";
import { TextInput } from "../../ui_components/text_input.js";
import { Direction, TransformConversions } from "../../util/transform.js";
import { CbFile } from "../content_browser/content_browser.js";
import { Editor } from "../editor.js";
import { FileView, View } from "../view/view.js";


export class TextView extends FileView{
    //text;
    
    input;
    constructor(editor: Editor,file:CbFile, origin?: View, dir?: Direction){
        super(editor,file,origin,dir)
        

        this.input = document.createElement('textarea');

        //this.input.type = 'text';
        this.input.style.position = 'fixed';
    
    
        document.body.appendChild(this.input);
        this.input.style.fontSize="25px"
    
        this.input.focus();

        const origFunc=this.contArea.resize;
        this.contArea.resize=()=>{
            
            this.input.style.left = this.contArea.gAbsEdges().left + 'px';
            this.input.style.top = this.contArea.gAbsEdges().top+150 + 'px'; 
            this.input.style.width=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.w+ 'px';
            this.input.style.height=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.h+ 'px';
            origFunc.call(this.contArea);//hacky way to add function to other function: maybe make util class out of this
        }
        this.input.value=this.file.source; 

        this.input.oninput=(obj:any)=>{
            this.file.source=this.input.value;
        }

        //this.input.focus();
        

        this.refresh();
        boundingRect.draw();
        //        .sZIndex(4)
        //        .sConstX(EConstraintsX.left)
        //        .sConstY(EConstraintsY.center)
        
    }
    setInitValues(): void {
        this.name="textview"
    }
    refresh(): void {
        //this.text.sText(this.file.source)
        //this.input.style.left = this.contArea.gAbsEdges().left + 'px';
        //this.input.style.top = this.contArea.gAbsEdges().top + 'px'; 
        //this.input.style.width=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.w+ 'px';
        //this.input.style.height=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.h+ 'px';
        //this.input.style.bottom = this.contArea.gAbsEdges().bottom + 'px'; 
        //this.input.style.right= this.contArea.gAbsEdges().right + 'px'; 
        boundingRect.draw();
    }
    resizeSelf(): void {
        super.resizeSelf();
        //should happen after contentarea resize
        //this.input.style.left = this.contArea.gAbsEdges().left + 'px';
        //this.input.style.top = this.contArea.gAbsEdges().top + 'px'; 
    }
    destroy(): void {
        document.body.removeChild(this.input);
        super.destroy();
    }
}

/** 
export class TextView extends FileView{
    text;
    constructor(editor: Editor,file:CbFile, origin?: View, dir?: Direction){
        super(editor,file,origin,dir)
        

        this.text=new TextInput
        this.text.sParent(this.contArea)
                .sZIndex(4)
                .sTextSize(30)
                .sFixedOffset(10)

        this.refresh();
        boundingRect.draw();
        //        .sZIndex(4)
        //        .sConstX(EConstraintsX.left)
        //        .sConstY(EConstraintsY.center)
        
    }
    setInitValues(): void {
        this.name="textview"
    }
    refresh(): void {
        this.text.sText(this.file.source)
        boundingRect.draw();
    }
    destroy(): void {

        super.destroy();
    }
}
*/