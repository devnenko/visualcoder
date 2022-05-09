import { Box, BoxType } from "../../ui/box.js";
import { mouseHandler } from "../../ui/event_handlers/mouse.js";
import { TextView } from "../text/text_view.js";
import { FileView } from "./view.js";
export var FileTypeE;
(function (FileTypeE) {
    FileTypeE["text"] = "text";
    FileTypeE["empty"] = "empty";
})(FileTypeE || (FileTypeE = {}));
export const fileTypes = [
    { type: FileTypeE.text, view: TextView },
    { type: FileTypeE.empty, view: FileView }
];
export class ViewSelectButton extends Box {
    constructor(view) {
        super(BoxType.vt);
        console.log(view.file.type);
        const viewSwitchButton = view.switchViewButton;
        this.sFixedOffsetX(viewSwitchButton.gAbsEdges().left + viewSwitchButton.gFixedSize().w / 2 - this.gFixedSize().w / 2)
            .sFixedOffsetY(view.topBar.gAbsEdges().bottom)
            .sZIndex(100);
        mouseHandler.activepointer = this;
        //getAvailableViews(FileTypeE.text)
        //sconst found=fileTypes.find(el=>true);
        //console.log(found)
    }
}
function findAvailableViews() {
    console.log(fileTypes);
}
