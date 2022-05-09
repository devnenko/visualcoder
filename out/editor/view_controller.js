import { boundingRect } from "../ui/bounding_rect.js";
import { View } from "./view.js";
//controlls one type of view=> either a specific File or thing
//base capability will be syncing between the files and changing the views(should be same on all)
//as implementation
export class ViewController {
    constructor(editor, asset) {
        this.availableViews = []; //views that can be created for this controller as new types
        this.createdViews = []; //views that are currently on screen of this file
        this.defaultView = View; //default view to be created when createView is called
        this.editor = editor;
        if (asset) {
            this.asset = asset;
        }
        else {
            this.asset = null;
        }
    }
    addAvailable(view, setDefault) {
        this.availableViews.push(view);
        if (setDefault) {
            this.defaultView = view;
        }
    }
    setDefault(index) {
        this.defaultView = this.availableViews[index];
    }
    createView() {
        const view = new this.defaultView(this);
        this.createdViews.push(view);
        this.editor.viewBox.refreshInBetween();
        this.editor.changeSelectedView(view);
        return view;
    }
    destroyView(view) {
        this.createdViews.splice(this.createdViews.indexOf(view), 1);
        view.destroy();
        this.editor.viewBox.refreshInBetween();
    }
    replaceView(origView, newViewIndex) {
        const index = origView.gIndexInParent();
        this.destroyView(origView);
        this.setDefault(newViewIndex);
        const view = this.createView();
        view.indexInParent(index);
        this.editor.viewBox.refreshInBetween();
        this.editor.changeSelectedView(view);
        boundingRect.draw();
    }
    destroy() {
        const viewsLength = this.createdViews.length;
        for (var i = 0; i < viewsLength; i++) {
            this.destroyView(this.createdViews[i]);
        }
    }
    refreshViews() {
        //refreshes all views
        this.createdViews.forEach(el => {
            el.refreshContent();
        });
    }
    getAsset() {
        return this.asset;
    }
    setAssetSource(newSrc) {
        //code for updating asset source
        if (this.asset != null) {
            this.asset.source = newSrc;
        }
        else {
            console.error("set asset source called on non asset controller");
        }
        this.refreshViews();
    }
}
