import { Box, BoxType } from "../../ui/box.js"
import { mouseHandler } from "../../ui/event_handlers/mouse.js"
import { Direction } from "../../util/transform.js"
import { CbFile } from "../content_browser/content_browser.js"
import { Editor } from "../editor.js"
import { TextView } from "../text/text_view.js"
import { FileView, View } from "./view.js"

export enum FileTypeE{
    text="text",
    empty="empty"
}

export interface FileTypeI{
    type:FileTypeE,
    view:new (editor: Editor,file:CbFile, origin?: View, dir?: Direction)=>FileView
}

export const fileTypes:FileTypeI[]=[
    {type:FileTypeE.text,view:TextView},
    {type:FileTypeE.empty,view:FileView}
]

export class ViewSelectButton extends Box {
    constructor(view: FileView) {
        super(BoxType.vt)
        console.log(view.file.type)
        const viewSwitchButton = view.switchViewButton;
        this.sFixedOffsetX(viewSwitchButton.gAbsEdges().left + viewSwitchButton.gFixedSize().w / 2 - this.gFixedSize().w / 2)
            .sFixedOffsetY(view.topBar.gAbsEdges().bottom)
            .sZIndex(100)
        mouseHandler.activepointer = this;

        //getAvailableViews(FileTypeE.text)
        //sconst found=fileTypes.find(el=>true);
        //console.log(found)
    }
}

function findAvailableViews(){
    console.log(fileTypes)
}