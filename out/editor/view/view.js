import { ViewTopBar } from './topbar.js';
import { VtBox } from '../../ui/vt_box.js';
import { ViewContentArea } from './content_area.js';
export class View {
    constructor(editor, name) {
        this.name = name;
        this.boundBox = new VtBox;
        this.boundBox.addConfig({
            parent: editor.boundBox,
            fillSpace: true,
            isVisible: false,
            zIndex: 1
        });
        this.topBar = new ViewTopBar(this);
        this.contArea = new ViewContentArea(this);
    }
    setName(name) {
        this.name = name;
        this.topBar.title.addConfig({
            text: name
        });
    }
    getName() {
        return this.name;
    }
}
