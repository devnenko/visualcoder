import { Rect } from "../../src/ui/rect.js";
import { boundingShape, EObjectType } from "../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../ui/types/constraints.js";
import { ViewOutline } from "./views/view.js";
import { EditorTopBar } from "./topbar.js";
import { ERectType } from "../../src/ui/shape.js";
// problem: how do we create views so that they are usefull and dont cause confusion? 
//what are the usefull and useless usecases and how could you implement that in an intuitive way 
//maybe phones should have completely different system with individual tabs like the close button for shortcuts on shortcuts app
//still no solution for confusing usecases on windows then
//should implementation be per file different views, or views per gameengine, that react to actif file(on mobile open actif file in view maybe)?
//what is more intuitive and makes more sense
//maybe views on desktop become single tab opens on mobile (code reuse and more intuitive for desktop users)
//view opening system like unitys or construct 3s (view keep after move deffinitely unity)
//use no view open as bottom view, or scene as bottom view or content browser as bottom view
//on mobile content browser should be bottom thing cause its more intuitive
export var Direction;
(function (Direction) {
    Direction["Left"] = "left";
    Direction["Right"] = "right";
    Direction["Top"] = "top";
    Direction["Bottom"] = "bottom";
})(Direction || (Direction = {}));
export class TwoViewRect extends Rect {
    constructor(config) {
        super();
        this.children = [];
        this.setConfigAttrs(config);
    }
    removeSelf() {
        const childLenght = this.children.length;
        for (let i = 0; i < childLenght; i++) {
            this.children[0].addConfig({
                parent: this.parent
            });
        }
        this.destroy();
    }
    removeSideBar() {
        this.children.forEach(el => {
            if (el.fixedSizeW === 10) {
                el.destroy();
            }
        });
    }
}
export class Editor extends Rect {
    //emptyText;
    constructor() {
        super({
            rectType: EObjectType.VtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });
        this.views = [];
        this.viewMinSize = { w: 220, h: 220 };
        //this.setOpts({isVisible:true});
        this.topbar = new EditorTopBar(this);
        this.contentArea = new Rect();
        this.contentArea.addConfig({
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });
        //this.emptyText=new Text(this.contentArea,this.canvas);
        //this.emptyText.color="white";
        //this.emptyText.text="no view open";//disappears for some reason on mobile
        //const v=new View(this.contentArea,this.canvas);
        //v.topBar.title.text="scene"
        boundingShape.draw();
    }
    findView(ContentAreaClass) {
        for (const currContentArea of this.views) {
            if (currContentArea instanceof ContentAreaClass) {
                return currContentArea;
            }
        }
        return null;
    }
    addViewGeneric(newView, file) {
        if (this.views.length == 0) {
            new ViewOutline(newView, this);
        }
        else {
            this.addViewInDir(this.views[0], newView, Direction.Left);
        }
        console.log(this.views.length);
    }
    checkViewSpaceInDir(origin, newView, direction) {
        return; //returns if the view is creatable or not boolean
    }
    addViewInDir(origin, newView, direction) {
        let originOutline = origin.viewOutline;
        let newBoundingRect = new TwoViewRect({
            parent: originOutline.parent,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false,
        });
        originOutline.addConfig({
            parent: newBoundingRect,
            boxProportion: { x: 50, y: 50 }
        });
        const newViewObj = new ViewOutline(newView, this);
        newViewObj.addConfig({
            parent: newBoundingRect,
            boxProportion: { x: 50, y: 50 }
        });
        switch (direction) {
            case Direction.Left:
            case Direction.Right:
                newBoundingRect.addConfig({
                    rectType: ERectType.HzBox
                });
                if (direction == Direction.Left) {
                    console.log("yse");
                    originOutline.addConfig({
                        parent: originOutline.parent
                    });
                    console.log(newViewObj.parent);
                }
                break;
            case Direction.Top:
            case Direction.Bottom:
                newBoundingRect.addConfig({
                    rectType: ERectType.VtBox
                });
                if (direction == Direction.Top) {
                    console.log("yse");
                    originOutline.addConfig({
                        parent: originOutline.parent
                    });
                    console.log(newViewObj.parent);
                }
                break;
        }
        //add resize bar
        const resizeBar = new Rect({
            fixedSizeW: 10,
            fixedSizeH: 10,
            parent: newBoundingRect
        });
        resizeBar.setIndexInParent(1);
        //resizeBar.parent=newBoundingRect;
        //resizeBar.setParent(newBoundingRect,1);
        //if(newViewObj.getAbsSize().w<this.viewMinSize.w||newViewObj.getAbsSize().h<this.viewMinSize.h){
        //    //too small
        //    newViewObj.destroy();
        //}
    }
    drawViewPreview(pos) {
    }
    addViewPreview() {
    }
}
