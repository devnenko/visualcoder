import { boundingRect } from "../ui/bounding_rect.js";
import { Box, BoxType } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { EConstraintsY, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { TransformConversions } from "../util/transform.js";
import { View } from "./view.js";
import { FileViewController, ViewController } from "./view_cont.js";


export class TextView extends View {
    title = "text";
    textBox;
    constructor(controller: FileViewController) {
        super(controller)
        this.changeTitle();

        this.textBox=new TextRect
        this.textBox.sParent(this.contentArea)
            .sText(controller.file.source)
    }
}

export class TextEditView extends View{
    title = "textedit";
    input;
    constructor(controller: FileViewController) {
        super(controller)
        this.contentArea.sIsVisible(false);
        this.changeTitle();

        this.input = document.createElement('textarea');

        //this.input.type = 'text';
    
    
        document.body.appendChild(this.input);
        this.input.style.position="fixed"
        this.input.style.fontSize="25px"
    
        this.input.focus();

        const origFunc=this.contentArea.resize;
        this.contentArea.resize=()=>{
            
            origFunc.call(this.contentArea);//hacky way to add function to other function: maybe make util class out of this
            this.input.style.left = this.contentArea.gAbsEdges().left + 'px';
            this.input.style.top = this.contentArea.gAbsEdges().top+ 'px'; 
            this.input.style.width=TransformConversions.edgesToPosAndSize(this.contentArea.gAbsEdges()).size.w+ 'px';
            this.input.style.height=TransformConversions.edgesToPosAndSize(this.contentArea.gAbsEdges()).size.h+ 'px';
        }
        this.input.value=controller.file.source; 

        this.input.oninput=(obj:any)=>{
            controller.file.source=this.input.value;
        }

        //this.input.focus();
        

        boundingRect.draw();
    }

    destroy(): void {
        document.body.removeChild(this.input);
        super.destroy();
    }
}