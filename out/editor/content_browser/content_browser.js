import { editor } from "../../main.js";
import { boundingRect } from "../../ui/bounding_rect.js";
import { Box, BoxType } from "../../ui/box.js";
import { MakeClickable } from "../../ui/clickable_rect.js";
import { EConstraintsX, EConstraintsY, Rect } from "../../ui/rect.js";
import { TextRect } from "../../ui/text_rect.js";
import { MakeHoverPressButton } from "../../ui_components/button.js";
import { View } from "../view/view.js";
import { fileTypes } from "../view/view_connections.js";
import { FileAddTab } from "./fileadd_tab.js";
class FileButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    constructor(contBrow, file) {
        super();
        this.sParent(contBrow.vtBox)
            .sZIndex(3) //apply snap margin needs to be fixed
            .setFixedSizeH(80)
            .sSnapMargin(10);
        this.name = new TextRect;
        this.name.sText(file.name)
            .sParent(this)
            .sZIndex(4)
            .sConstX(EConstraintsX.left)
            .sConstY(EConstraintsY.center);
        this.onRelease = () => {
            const views = fileTypes.find(el => el.type == file.type);
            if (views) {
                editor.addFileViewGeneric(views.view, file);
            }
        };
    }
}
class FileCreateButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    constructor(contBrow) {
        super();
        this.sParent(contBrow.vtBox)
            .sZIndex(3) //apply snap margin needs to be fixed
            .setFixedSizeH(80)
            .sSnapMargin(10);
        this.name = new TextRect;
        this.name.sText("create file")
            .sParent(this)
            .sZIndex(4)
            .sConstX(EConstraintsX.left)
            .sConstY(EConstraintsY.center);
        this.onRelease = () => {
            new FileAddTab(contBrow);
            boundingRect.draw();
        };
    }
}
export class ContentBrowser extends View {
    constructor(editor, origin, dir) {
        super(editor, origin, dir);
        this.vtBox = new Box(BoxType.vt);
        this.vtBox
            .sParent(this.contArea)
            .sZIndex(2)
            .sSnapMargin(10)
            .sFillSpace()
            .sIsVisible(false);
        this.refresh();
        boundingRect.draw();
    }
    setInitValues() {
        this.name = "contentbrowser";
    }
    refresh() {
        this.vtBox.destroyChildren();
        allFiles.forEach(file => {
            new FileButton(this, file);
        });
        new FileCreateButton(this);
    }
}
