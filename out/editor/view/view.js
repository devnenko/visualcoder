import { ViewTopBar } from './topbar.js';
import { ViewContentArea } from './content_area.js';
import { Direction } from '../../util/transform.js';
import { boundingRect } from '../../ui/bounding_rect.js';
import { Box, BoxType } from '../../ui/box.js';
export class ViewConnector extends Box {
    constructor(boxType, parent) {
        super(boxType);
        this.canDestroy = true;
        this
            .sParent(parent)
            .sFillSpace()
            .sVisible(false);
    }
    checkIfChildren(amount) {
        if (this.getChildren().length == amount) //if only 1 children
         {
            if (this.canDestroy == true) //if is not topmost viewConnector
             {
                return true;
            }
        }
        return false;
    }
}
export class View extends Box {
    constructor(editor, name, origin, dir) {
        super(BoxType.vt);
        this.parent = boundingRect;
        this.name = name;
        this.editor = editor;
        editor.views.push(this);
        let newParent;
        if (origin && dir) //if not first view to add on screen
         {
            newParent = this.addViewInDir(origin, dir);
        }
        else {
            newParent = editor.viewBox;
        }
        this
            .sParent(newParent)
            .sFillSpace()
            .sVisible(true);
        this.topBar = new ViewTopBar(this);
        this.contArea = new ViewContentArea(this);
        //so created children can inherit zindex behaviour
        //maybe code that always take highest in hierarchy
        this.sZIndex(1);
        this.topBar.sZIndex(20);
        boundingRect.draw();
    }
    addViewInDir(origin, dir) {
        const originConnector = origin.parent;
        let viewConnector;
        if (originConnector.boxType == BoxType.hz) {
            switch (dir) {
                case Direction.left:
                    viewConnector = origin.parent;
                    break;
                case Direction.right:
                    viewConnector = origin.parent;
                    ;
                    break;
                case Direction.top:
                    viewConnector = new ViewConnector(BoxType.vt, originConnector);
                    break;
                case Direction.bottom:
                    viewConnector = new ViewConnector(BoxType.vt, originConnector);
                    break;
            }
        }
        else {
            switch (dir) {
                case Direction.left:
                    viewConnector = new ViewConnector(BoxType.hz, originConnector);
                    break;
                case Direction.right:
                    viewConnector = new ViewConnector(BoxType.hz, originConnector);
                    break;
                case Direction.top:
                    viewConnector = origin.parent;
                    ;
                    break;
                case Direction.bottom:
                    viewConnector = origin.parent;
                    ;
                    break;
            }
        }
        origin.sParent(viewConnector);
        boundingRect.draw();
        return viewConnector;
    }
    setName(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    destroy() {
        let parent = this.parent;
        this.editor.views.splice(this.editor.views.indexOf(this), 1);
        super.destroy();
        if (parent.checkIfChildren(1) == true) {
            if (parent.getChildren()[0] instanceof ViewConnector) {
                if (parent.getChildren()[0].boxType == parent.getParent().boxType) {
                    parent.getChildren()[0].popOut();
                }
            }
            parent.popOut();
        }
        boundingRect.draw();
    }
}
