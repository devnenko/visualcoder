
import { boundingRect } from "../ui/bounding_rect.js";
import { Rect } from "../ui/rect.js";
import { Direction } from "../util/transform.js";
import { CbFile } from "./content_browser.js";
import { Editor } from "./editor.js";
import { View } from "./view.js";

type ViewClass<T>={new (controller:T):View}

export class ViewController {
    editor;
    availableViews: Array<ViewClass<ViewController>> = [];
    views:View[]=[];
    constructor(editor: Editor) {
        this.editor = editor;
        //this.getAvailViewNames()
    }
    refreshViews(){
        this.views.forEach(el=>{
            el.refresh();
        })
    }
    addView(origin?:View,dir?:Direction) {
        if(origin&&dir){
            return new this.availableViews[0](this);
        }else{
            return new this.availableViews[0](this);
        }
    }
    removeView(view:View){
        view.remove();
    }
    replaceView(oldView: View, newViewIndex: number) {
        const oldIndex=oldView.gIndexInParent();
        const oldViewParent = oldView.gParent();
        oldView.destroy();
        const v = new this.availableViews[newViewIndex](this);
        v.sParent(oldViewParent)
        v.indexInParent(oldIndex);
        boundingRect.draw();
        return v;
    }
    getAvailViewNames() {
        const viewNames: string[] = [];
        this.availableViews.forEach(viewClass => {
            const v = new viewClass(this)//instanciate to get values and destroy immediatly
            viewNames.push(v.title);
            v.destroy();
        });
        return viewNames;
    }
}

export class FileViewController extends ViewController {
    file: CbFile;
    constructor(editor: Editor, file: CbFile) {
        super(editor)
        this.file = file;
        this.availableViews.push()
    }

}