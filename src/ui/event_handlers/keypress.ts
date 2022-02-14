

import { Canvas } from "../canvas.js";
import { Rect } from "../rect.js";
import { boundingShape, IShape } from "../shape.js";

//add info here
//

export interface IKeyPressHandler{
    onKeyPress(key:string):void;
}

export class KeypressHandler{

    static callbackObjects:(IKeyPressHandler&Rect)[]=[];

    static init(){
        document.addEventListener('keydown', this.logKey.bind(this));
    }

    static subscribe(object:IKeyPressHandler&Rect){
        this.callbackObjects.push(object);
    }

    static unsubscribe(object:(IKeyPressHandler&Rect)){
        if(this.callbackObjects.indexOf(object)!=-1){
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);
        }
    }

    static logKey(e:KeyboardEvent) {
        console.log(e)
        for(const obj of this.callbackObjects){
            obj.onKeyPress(e.key)
        }
    }

}