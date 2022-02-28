import { HoverPressButton } from "../../ui_components/ui_components.js";
import { GeFile } from "./views.js";
import { Rect, TextBox, colorCreator } from "../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/types.js";
import { FileTypes } from "./cb_file.js";
import { ERectType } from "../../ui/shape.js";
import { Clickable } from "../../ui/clickable.js";
class ViewTopBar extends Rect {
    constructor(view) {
        super();
        this.addConfig({
            parent: view,
            color: colorCreator.colorByBrightness(25),
            fixedSizeH: 50,
        });
        this.title = new TextBox();
        this.title.addConfig({
            constraintY: EConstraintsY.center,
            parent: this,
            text: "View name not specified",
            size: 24,
            color: "white"
        });
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
        });
        this.deleteButton.createIcon();
        this.deleteButton.icon?.addConfig({
            imageSrc: "xmark.svg",
        });
    }
}
//should view classes extend view maybe rather than be part of
export class View extends Rect {
    constructor(ContentAreaInstance, editor, file) {
        super();
        this.editor = editor;
        this.addConfig({
            rectType: ERectType.VtBox,
            parent: editor.contentArea,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });
        this.topBar = new ViewTopBar(this);
        this.contentArea = new ContentAreaInstance(this);
        if (file) {
            this.topBar.title.addConfig({
                text: this.contentArea.viewName.concat(file?.name)
            });
        }
        else {
            this.topBar.title.addConfig({
                text: this.contentArea.viewName.concat("nofile")
            });
        }
        //contentArea.setParent(this);
    }
    destroy() {
        //editor.views.splice(editor.views.indexOf(this),1);
        super.destroy();
    }
}
export class ViewContentArea extends Clickable {
    constructor(view) {
        super();
        this.viewName = "Default View";
        this.view = view;
        this.addConfig({
            parent: view,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            color: colorCreator.midColorDef
        });
    }
}
export class FileViewContentArea extends ViewContentArea {
    //debugSrc:Text|null=null;
    constructor(view, file) {
        super(view);
        this.file = new GeFile("hi", FileTypes.image, "hi");
    }
    showDebugSrc() {
        //this.debugSrc=new Text(this,this.canvas);
    }
}
