import { boundingShape } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY } from "../../../ui/types/types.js";
import { FileSelector } from "./file_selector.js";
import { HoverPressButton } from "../../../../src/ui_components/button.js";
export class FileAddButton extends HoverPressButton {
    constructor(contentBrowser) {
        super();
        this.previewRect = null;
        this.onMouseHoverBegin = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseHoverBegin(type, pos, isTopMost);
            }
        };
        this.onMouseDown = (type, pos, isTopMost) => {
            if (this.contentBrowser.isInFileSelector == false) {
                super.onMouseDown(type, pos, isTopMost);
            }
        };
        this.contentBrowser = contentBrowser;
        this.addConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: () => {
                this.color = this.idleColor;
                boundingShape.draw();
                new FileSelector(contentBrowser);
            }
        });
        this.createTitle();
        this.title?.addConfig({
            text: "Create File"
        });
    }
}
