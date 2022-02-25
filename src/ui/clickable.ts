import { isIMouseHandler, MouseHandler } from "./event_handlers/event_handlers.js";
import { IShape, boundingShape,EObjectType,IShapeOpts,BoundingShape} from "./ui.js";
import { ITransform ,EConstraintsX, EConstraintsY,IEdges,IPos,EMouseType} from "./types/types.js"; 
import { Shape } from "./shape.js";
import { Rect } from "./ui.js";
import { IRectOpts } from "./rect.js";

export interface IClickableOpts extends IRectOpts{
    onMouseDown?:(type: EMouseType, pos: IPos)=> void,
    onMouseMoveDown?:(type:EMouseType,pos:IPos,isTopMost:boolean)=>void;
    onMouseUp?:(type:EMouseType,pos:IPos,isTopMost:boolean)=>void;
    onMouseHoverBegin?:(type:EMouseType,pos:IPos,isTopMost:boolean)=>void;
    onMouseHoverEnd?:(type:EMouseType,pos:IPos,isTopMost:boolean)=>void;
}

export class Clickable<Opts extends IClickableOpts = IClickableOpts> extends Rect{
    //use texture atlas in future

    onMouseDown(type:EMouseType,pos:IPos,isTopMost:boolean){};
    onMouseMoveDown(type:EMouseType,pos:IPos,isTopMost:boolean){};
    onMouseUp(type:EMouseType,pos:IPos,isTopMost:boolean){};
    onMouseHoverBegin(type:EMouseType,pos:IPos,isTopMost:boolean){};
    onMouseHoverEnd(type:EMouseType,pos:IPos,isTopMost:boolean){};

    constructor(){
        super()
        MouseHandler.subscribe(this);
    }

    public createConfig(opts: IClickableOpts){
        this.addConfig(opts)
    }

    destroy(){
        MouseHandler.unsubscribe(this);
        super.destroy();
    }

}