import { boundingRect } from "../ui/bounding_rect.js";
export class ViewController {
    constructor(editor) {
        this.availableViews = [];
        this.views = [];
        this.editor = editor;
        //this.getAvailViewNames()
    }
    refreshViews() {
        this.views.forEach(el => {
            el.refresh();
        });
    }
    addView(origin, dir) {
        if (origin && dir) {
            return new this.availableViews[0](this);
        }
        else {
            return new this.availableViews[0](this);
        }
    }
    removeView(view) {
        view.remove();
    }
    replaceView(oldView, newViewIndex) {
        const oldIndex = oldView.gIndexInParent();
        const oldViewParent = oldView.gParent();
        oldView.destroy();
        const v = new this.availableViews[newViewIndex](this);
        v.sParent(oldViewParent);
        v.indexInParent(oldIndex);
        boundingRect.draw();
        return v;
    }
    getAvailViewNames() {
        const viewNames = [];
        this.availableViews.forEach(viewClass => {
            const v = new viewClass(this); //instanciate to get values and destroy immediatly
            viewNames.push(v.title);
            v.destroy();
        });
        return viewNames;
    }
}
export class FileViewController extends ViewController {
    constructor(editor, file) {
        super(editor);
        this.file = file;
        this.availableViews.push();
    }
}
