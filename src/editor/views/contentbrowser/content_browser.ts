// @ts-ignore


import { HoverPressButton, ToggleButton } from "../../../ui_components/ui_components.js";
import { Rect, Canvas, TextBox, colorCreator, boundingShape } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../../../ui/types/types.js";
import { ViewOutline, View } from "../view.js";
import { allFiles, CBFile, FileTypes, mapStartFile } from "../cb_file.js";
import { ITextBoxConfig } from "../../../ui/text_box.js";
import { TextInput } from "../../../ui_components/text_input.js";
import { BlockEditor } from "../script/block/block_editor.js";
import { ERectType } from "../../../ui/shape.js";
import { PixelImage } from "../image/image.js";
import { FileButton } from "./file_button.js";
import { FileSelector } from "./file_selector.js";
import { FileAddButton } from "./fileadd_button.js";
import { ToggleButtonGroup } from "../../../ui_components/button.js";




export class ContentBrowser extends View {
    vtBox;
    isInFileSelector: boolean = false;
    viewName: string="contentBrowser";
    startFlagGroup=new ToggleButtonGroup();
    constructor(view: ViewOutline) {
        super(view)
        this.viewName = "ContentBrowser"

        this.vtBox = new Rect({
            rectType: ERectType.VtBox,
            parent: this,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.scale,
            isVisible: false
        });

        this.refresh();
    }
    refresh() {
        if(this.vtBox.children[0]){
            this.vtBox.destroyChildrenOnly();
        }
        for (const file of allFiles) {
            new FileButton(file, this)
        }
        new FileAddButton(this)
    }
    destroy(): void {
        console.log("de")
        console.log(this.viewOutline.editor.topbar)
        this.viewOutline.editor.topbar.cbButton.toggle(false);
        super.destroy();
    }
}


