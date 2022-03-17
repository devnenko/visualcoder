
import { Rect, Canvas, TextBox, colorCreator, boundingShape } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../../../ui/types/types.js";
import { ViewOutline, View } from "../view.js";
import { allFiles, CBFile, FileTypes } from "../cb_file.js";
import { ITextBoxConfig } from "../../../../src/ui/text_rect.js";
import { TextInput } from "../../../../src/ui_components/text_input.js";
import { BlockEditor } from "../script/block/block_editor.js";
import { ERectType } from "../../../../src/ui/shape.js";
import { PixelImage } from "../image/image.js";
import { ContentBrowser} from "./content_browser.js";
import { FileSelector } from "./file_selector.js";
import { HoverPressButton } from "../../../../src/ui_components/button.js";

export class FileAddButton extends HoverPressButton {
    previewRect: Rect | null = null;
    contentBrowser: ContentBrowser;

    constructor(contentBrowser: ContentBrowser) {
        super()
        this.contentBrowser = contentBrowser;
        this.addConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: () => {
                this.color = this.idleColor;
                boundingShape.draw()
                new FileSelector(contentBrowser);
            }
        })
        this.createTitle();
        this.title?.addConfig({
            text: "Create File"
        })

    }
    public onMouseHoverBegin: (type: EMouseType, pos: IPos, isTopMost: boolean) => void = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.contentBrowser.isInFileSelector == false) {
            super.onMouseHoverBegin(type, pos, isTopMost)
        }
    };
    public onMouseDown: (type: EMouseType, pos: IPos, isTopMost: boolean) => void = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.contentBrowser.isInFileSelector == false) {
            super.onMouseDown(type, pos, isTopMost)
        }
    };
}