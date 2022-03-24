import { ViewTopBar } from './topbar.js';
import { VtBox } from '../../ui/vt_box.js';
import { ViewContentArea } from './content_area.js';
import { Direction } from '../../util/transform.js';
import { boundingRect } from '../../ui/bounding_rect.js';
import { Box } from '../../ui/box.js';
export class ViewConnector extends Box {
    constructor(isHz, parent) {
        super(isHz);
        this.canDestroy = true;
        this.addConfig({
            parent: parent,
            fillSpace: true,
            isVisible: false
        });
        //this.addInBetweenRect({
        //    fixedSizeW:10,
        //    color:colorCreator.colorByBrightness(40),
        //});
    }
}
export class View extends VtBox {
    constructor(editor, name, origin, dir) {
        super();
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
        this.addConfig({
            parent: newParent,
            fillSpace: true,
            isVisible: false
        });
        this.topBar = new ViewTopBar(this);
        this.contArea = new ViewContentArea(this);
        //so created children can inherit zindex behaviour
        //maybe code that always take highest in hierarchy
        this.addConfig({
            zIndex: 1
        });
    }
    addViewInDir(origin, dir) {
        const originConnector = origin.parent;
        let viewConnector;
        if (originConnector.isHz) {
            switch (dir) {
                case Direction.left:
                    viewConnector = origin.parent;
                    break;
                case Direction.right:
                    viewConnector = origin.parent;
                    ;
                    break;
                case Direction.top:
                    viewConnector = new ViewConnector(false, originConnector);
                    break;
                case Direction.bottom:
                    viewConnector = new ViewConnector(false, originConnector);
                    break;
            }
        }
        else {
            switch (dir) {
                case Direction.left:
                    viewConnector = new ViewConnector(true, originConnector);
                    break;
                case Direction.right:
                    viewConnector = new ViewConnector(true, originConnector);
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
        origin.addConfig({
            parent: viewConnector
        });
        return viewConnector;
    }
    setName(name) {
        this.name = name;
        this.topBar.title.addConfig({
            text: name
        });
    }
    getName() {
        return this.name;
    }
    destroy() {
        if (this.parent.children.length == 2) //if only 2 children
         {
            if (this.parent.canDestroy == true) //if is not topmost viewConnector
             {
                this.parent.popOut();
            }
        }
        this.editor.views.splice(this.editor.views.indexOf(this), 1);
        super.destroySelfAndChildren();
        boundingRect.draw();
    }
}
