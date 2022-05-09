import { boundingRect } from "../../ui/bounding_rect.js";
import { TransformConversions } from "../../util/transform.js";
import { FileView } from "../view/view.js";
export class TextView extends FileView {
    constructor(editor, file, origin, dir) {
        super(editor, file, origin, dir);
        this.input = document.createElement('textarea');
        //this.input.type = 'text';
        this.input.style.position = 'fixed';
        document.body.appendChild(this.input);
        this.input.style.fontSize = "25px";
        this.input.focus();
        const origFunc = this.contArea.resize;
        this.contArea.resize = () => {
            this.input.style.left = this.contArea.gAbsEdges().left + 'px';
            this.input.style.top = this.contArea.gAbsEdges().top + 150 + 'px';
            this.input.style.width = TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.w + 'px';
            this.input.style.height = TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.h + 'px';
            origFunc.call(this.contArea); //hacky way to add function to other function: maybe make util class out of this
        };
        this.input.value = this.file.source;
        this.input.oninput = (obj) => {
            this.file.source = this.input.value;
        };
        //this.input.focus();
        this.refresh();
        boundingRect.draw();
        //        .sZIndex(4)
        //        .sConstX(EConstraintsX.left)
        //        .sConstY(EConstraintsY.center)
    }
    setInitValues() {
        this.name = "textview";
    }
    refresh() {
        //this.text.sText(this.file.source)
        //this.input.style.left = this.contArea.gAbsEdges().left + 'px';
        //this.input.style.top = this.contArea.gAbsEdges().top + 'px'; 
        //this.input.style.width=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.w+ 'px';
        //this.input.style.height=TransformConversions.edgesToPosAndSize(this.contArea.gAbsEdges()).size.h+ 'px';
        //this.input.style.bottom = this.contArea.gAbsEdges().bottom + 'px'; 
        //this.input.style.right= this.contArea.gAbsEdges().right + 'px'; 
        boundingRect.draw();
    }
    resizeSelf() {
        super.resizeSelf();
        //should happen after contentarea resize
        //this.input.style.left = this.contArea.gAbsEdges().left + 'px';
        //this.input.style.top = this.contArea.gAbsEdges().top + 'px'; 
    }
    destroy() {
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
