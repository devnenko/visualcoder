

import { editor } from './../../main.js';




import { ViewTopBar } from './topbar.js';
import { colorCreator } from '../../util/color.js';
import { MouseHandler } from '../../ui/event_handlers/mouse.js';
import { SvgRect } from '../../ui/svg_rect.js';
import { EConstraintsX, EConstraintsY,  Rect } from "../../ui/rect.js";
import { Editor } from "../editor.js";
import { MakeClickable } from '../../ui/clickable_rect.js';
import { MakeHoverPressButton } from '../../ui_components/button.js';
import { destroy } from '../../compiler/lib.js';
import { TextRect } from '../../ui/text_rect.js';
import { ViewContentArea } from './content_area.js';
import { Direction } from '../../util/transform.js';
import { boundingRect, BoundingRect } from '../../ui/bounding_rect.js';
import { Box,BoxType } from '../../ui/box.js';

export class ViewConnector extends Box{
    canDestroy:boolean=true;
    constructor(boxType:BoxType,parent:Rect){
        super(boxType);

        this
            .sParent(parent)
            .sFillSpace()
            .sVisible(false)
    }

    checkIfChildren(amount:number){
        if(this.getChildren().length==amount)//if only 1 children
        {
            if(this.canDestroy==true)//if is not topmost viewConnector
            {
                return true;
            }
        }
        return false;
    }
}


export class View extends Box{
    private name;
    public parent: ViewConnector|BoundingRect=boundingRect;

    topBar;
    contArea;
    editor;
    constructor(editor:Editor,name:string,origin?:View,dir?:Direction){
        super(BoxType.vt);
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
        this
            .sParent(newParent)
            .sFillSpace()
            .sVisible(true);


        this.topBar=new ViewTopBar(this);

        this.contArea=new ViewContentArea(this);

        //so created children can inherit zindex behaviour
        //maybe code that always take highest in hierarchy
        this.sZIndex(1);
        this.topBar.sZIndex(20);

        boundingRect.draw();
    }

    addViewInDir(origin:View,dir:Direction){
        const originConnector=(origin.parent as ViewConnector);
        let viewConnector:ViewConnector;
        if(originConnector.boxType==BoxType.hz){
            switch (dir){
                case Direction.left:
                    viewConnector=origin.parent as ViewConnector;
                    break;
                case Direction.right:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
                case Direction.top:
                    viewConnector=new ViewConnector(BoxType.vt,originConnector)
                    break;
                case Direction.bottom:
                    viewConnector=new ViewConnector(BoxType.vt,originConnector)
                    break;
            }
        }else{
            switch (dir){
                case Direction.left:
                    viewConnector=new ViewConnector(BoxType.hz,originConnector as Rect)
                    break;
                case Direction.right:
                    viewConnector=new ViewConnector(BoxType.hz,originConnector as Rect)
                    break;
                case Direction.top:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
                case Direction.bottom:
                    viewConnector=origin.parent as ViewConnector;;
                    break;
            }
        }
        origin.sParent(viewConnector)
        boundingRect.draw();
        return viewConnector;
    }

    setName(name:string){
        this.name=name;
    }

    getName(){
        return this.name;
    }
    destroy(){
        let parent=this.parent as ViewConnector;

        this.editor.views.splice(this.editor.views.indexOf(this),1)
        super.destroy();
        if(parent.checkIfChildren(1)==true){
            if(parent.getChildren()[0] instanceof ViewConnector){
                if((parent.getChildren()[0] as ViewConnector).boxType==(parent.getParent() as ViewConnector).boxType){
                    parent.getChildren()[0].popOut();
                }
            }
            parent.popOut();
        }

        boundingRect.draw();
    }
}