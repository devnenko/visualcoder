
import { IKeyPressHandler } from "../../ui_components/editor/views/text_editor.js";
import { Canvas } from "../canvas.js";
import { boundingShape, IShape } from "../shape.js";

//add info here
//

export class KeypressHandler{

    static callBackObjects:IKeyPressHandler[]=[];

    static init(){
        document.addEventListener('keydown', this.logKey.bind(this));
    }

    static subscribe(object:IKeyPressHandler){
        this.callBackObjects.push(object);
    }

    static logKey(e:KeyboardEvent) {
        console.log(e)
        for(const obj of this.callBackObjects){
            obj.onKeyPress(e.key)
        }
    }

}