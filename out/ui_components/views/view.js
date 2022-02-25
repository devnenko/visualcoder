import { destroyScript } from "../../code/compiler.js";
import { editor } from "../../main.js";
import { colorCreator } from "../../ui/color.js";
import { Rect } from "../../ui/rect.js";
import { Text } from "../../ui/text.js";
import { EConstraintsX, EConstraintsY } from "../../ui/types/constraints.js";
import { VerticalBox } from "../../ui/vertical_box.js";
import { HoverPressButton } from "../button.js";
import { GeFile } from "./ge_file.js";
class ViewTopBar extends Rect {
    constructor(parent, canvas, view) {
        super(parent, canvas);
        this.view = view;
        this.color = colorCreator.colorByBrightness(25);
        this.fixedSize.h = 50;
        this.title = new Text(this, canvas);
        this.title.text = "nothing loaded";
        this.title.color = "white";
        this.deleteButton = new HoverPressButton(this, this.canvas);
        this.deleteButton.setConstraints(EConstraintsX.right, EConstraintsY.scale);
        this.deleteButton.fixedSize.w = 50;
        this.deleteButton.color = colorCreator.colorByBrightness(60);
        this.deleteButton.hoverColor = colorCreator.colorByBrightness(85);
        this.deleteButton.pressColor = colorCreator.colorByBrightness(90);
        this.deleteButton.onCLick = () => {
            destroyScript();
            this.view.destroyHierarchy();
        };
    }
}
//should view classes extend view maybe rather than be part of
export class View extends VerticalBox {
    constructor(parent, canvas, contentArea, viewTitle, file) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.isVisible = false;
        this.topBar = new ViewTopBar(this, canvas, this);
        this.contentArea = new contentArea(this, this.canvas, viewTitle);
        //contentArea.setParent(this);
    }
    destroyHierarchy() {
        editor.views.splice(editor.views.indexOf(this), 1);
        super.destroyHierarchy();
    }
}
export class ViewContentArea extends Rect {
    constructor(parent, canvas, viewTitle) {
        super(parent, canvas);
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.color = colorCreator.colorByBrightness(55);
        this.viewTitle = viewTitle;
    }
}
export class FileViewContentArea extends ViewContentArea {
    //debugSrc:Text|null=null;
    constructor(parent, canvas, viewTitle, file) {
        super(parent, canvas, viewTitle);
        this.file = new GeFile("hi", "hi", "hi");
    }
    showDebugSrc() {
        //this.debugSrc=new Text(this,this.canvas);
    }
}
