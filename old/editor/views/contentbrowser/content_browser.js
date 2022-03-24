// @ts-ignore
import { Rect } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/types.js";
import { View } from "../view.js";
import { allFiles } from "../cb_file.js";
import { ERectType } from "../../../../src/ui/shape.js";
import { FileButton } from "./file_button.js";
import { FileAddButton } from "./fileadd_button.js";
import { ToggleButtonGroup } from "../../../../src/ui_components/button.js";
export class ContentBrowser extends View {
    constructor(view) {
        super(view);
        this.isInFileSelector = false;
        this.viewName = "contentBrowser";
        this.startFlagGroup = new ToggleButtonGroup();
        this.viewName = "ContentBrowser";
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
        if (this.vtBox.children[0]) {
            this.vtBox.destroyChildrenOnly();
        }
        for (const file of allFiles) {
            new FileButton(file, this);
        }
        new FileAddButton(this);
    }
    destroy() {
        console.log("de");
        console.log(this.viewOutline.editor.topbar);
        this.viewOutline.editor.topbar.cbButton.toggle(false);
        super.destroy();
    }
}
