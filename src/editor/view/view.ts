import { editor } from './../../main';




import { ViewTopBar } from './topbar.js';
import { colorCreator } from '../../util/color.js';
import { MouseHandler } from '../../ui/event_handlers/mouse.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { HzBox } from '../../ui/hz_box.js';
import { VtBox } from '../../ui/vt_box.js';
import { EConstraintsX, EConstraintsY, IRectConfig, Rect } from "../../ui/rect.js";
import { Editor } from "../editor.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { destroy } from '../../compiler/lib.js';
import { TextRect } from '../../ui/text_rect.js';
import { ViewContentArea } from './content_area.js';
import { Direction } from '../../util/transform.js';
import { boundingRect, BoundingRect } from '../../ui/bounding_rect.js';
import { Box } from '../../ui/box.js';

export class ViewConnector extends Box{
    canDestroy:boolean=true;
    constructor(isHz:boolean,parent:Rect){
        super(isHz);
        this.addConfig({
            parent:parent,
            fillSpace:true,
            isVisible:false
        })
        //this.addInBetweenRect({
        //    fixedSizeW:10,
        //    color:colorCreator.colorByBrightness(40),
        //});
    }
}


export class View extends VtBox{
    private name;
    public parent: ViewConnector|BoundingRect=boundingRect;

    topBar;
    contArea;
    editor;
    constructor(editor:Editor,name:string,origin?:View,dir?:Direction){
        super();
        this.name=name;
        this.editor=editor;
        editor.views.push(this);
        let newParent:ViewConnector;
        if(origin&&dir)//if not first view to add on screen
        {
            newParent=this.addViewInDir(origin,dir);
        }
        else{
            newParent=editor.viewBox;
        }
        this.addConfig({
            parent:newParent,
            fillSpace: true,
            isVisible: false
        })


        this.topBar=new ViewTopBar(this);

        this.contArea=new ViewContentArea(this);

        //so created children can inherit zindex behaviour
        //maybe code that always take highest in hierarchy
        this.addConfig({
            zIndex:1
        })
    }

    addViewInDir(origin:View,dir:Direction){
        const originConnector=(origin.parent as ViewConnector);
        let viewConnector:ViewConnector;
        if(originConnector.isHz){
            switch (dir){
                case Direction.left:
                    viewConnector=origin.parent as ViewConnector;
                    break;
                case Direction.right:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
                case Direction.top:
                    viewConnector=new ViewConnector(false,originConnector)
                    break;
                case Direction.bottom:
                    viewConnector=new ViewConnector(false,originConnector)
                    break;
            }
        }else{
            switch (dir){
                case Direction.left:
                    viewConnector=new ViewConnector(true,originConnector as Rect)
                    break;
                case Direction.right:
                    viewConnector=new ViewConnector(true,originConnector as Rect)
                    break;
                case Direction.top:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
                case Direction.bottom:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
            }
        }
        origin.addConfig({
            parent:viewConnector
        })
        return viewConnector;
    }

    setName(name:string){
        this.name=name;
        this.topBar.title.addConfig({
            text:name
        })
    }

    getName(){
        return this.name;
    }
    destroy(){
        if(this.parent.children.length==2)//if only 2 children
        {
            if((this.parent as ViewConnector).canDestroy==true)//if is not topmost viewConnector
            {
                (this.parent as ViewConnector).popOut();
            }
        }
        this.editor.views.splice(this.editor.views.indexOf(this),1)
        super.destroySelfAndChildren();
        boundingRect.draw();
    }
}