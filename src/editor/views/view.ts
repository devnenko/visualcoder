import { destroyScript } from "../../compiler/compiler.js";
import { HoverPressButton } from "../../ui_components/ui_components.js";
import { Rect, Canvas, TextBox, colorCreator } from "../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../../ui/types/types.js";
import { Editor, TwoViewRect } from "../editor.js";
import { CBFile, FileTypes } from "./cb_file.js";
import { ERectType } from "../../ui/shape.js";
import { Clickable } from "../../ui/clickable.js";

class ViewTopBar extends Rect {
    title;
    deleteButton;
    constructor(view: ViewOutline) {
        super()
        this.addConfig({
            parent: view,
            color: colorCreator.colorByBrightness(25),
            fixedSizeH: 50,
        })


        this.title = new TextBox();
        this.title.addConfig({
            constraintY: EConstraintsY.center,
            parent: this,
            text: "View name not specified",
            size: 24,
            color: "white"
        })
        this.title.zIndex=4;

        this.deleteButton = new HoverPressButton();

        this.deleteButton.addConfig({
            parent: this,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: 50,
            onPress: () => {
                //destroyScript();
                view.destroy();
            }
        })
        this.deleteButton.createIcon();
        this.deleteButton.icon?.addConfig({
            imageSrc: "xmark.svg",
        })
        this.deleteButton.zIndex=4;
    }
}

//should view classes extend view maybe rather than be part of

export class ViewOutline extends Rect {
    topBar: ViewTopBar;
    view: View;
    editor: Editor;
    constructor(ContentAreaInstance: typeof View, editor: Editor, file?: CBFile) {
        super()
        this.editor = editor;
        this.addConfig({
            rectType: ERectType.VtBox,
            parent: editor.contentArea,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false,
        });

        this.topBar = new ViewTopBar(this);

        this.view = new ContentAreaInstance(this);

        if (file) {
            this.topBar.title.addConfig({
                text: this.view.viewName.concat(file?.name)
            });
        }
        else{
            this.topBar.title.addConfig({
                text: this.view.viewName.concat("nofile")
            });
        }
        //contentArea.setParent(this);
    }
    destroy(): void {
        //this.editor.removeView(this);
        if(this.parent instanceof TwoViewRect){
            const twoViewRect=this.parent;
            console.log("twoviewRect")
            console.log(twoViewRect.children)
            this.parent.removeSelf();
            console.log("now")
            console.log(twoViewRect.children)
        }
        super.destroy();
    }
}

export class View extends Clickable {
    viewName: string = "Default View"
    viewOutline: ViewOutline;
    constructor(view: ViewOutline) {
        super()
        this.viewOutline = view;
        this.viewOutline.editor.views.push(this);
        this.addConfig({
            parent: view,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            color: colorCreator.midColorDef
        })
    }
    destroy(): void {
        //this.viewOutline.editor.removeView(this);
        this.viewOutline.editor.views.splice(this.viewOutline.editor.views.indexOf(this),1)
        super.destroy();
    }
}


