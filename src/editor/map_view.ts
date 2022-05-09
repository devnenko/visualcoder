import { MakeClickable } from "../ui/clickable_rect.js";
import { MouseHandler } from "../ui/event_handlers/mouse.js";
import { Rect } from "../ui/rect.js";
import { View } from "./view.js";
import { FileView } from "./view/view.js";
import { FileViewController } from "./view_cont.js";

export class MapView extends View {
    title = "map";
    constructor(controller: FileViewController) {
        super(controller)
        this.changeTitle();

    }
}