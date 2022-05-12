import { boundingRect } from "../ui/bounding_rect.js";
import { emptyAsset } from "./asset.js";
import { View, } from "./view.js";
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
            this.asset = emptyAsset(this);
        }
    }
    addAvailable(view, setDefault) {
        this.availableViews.push(view);
        if (setDefault) {
            this.defaultView = view;
        }
    }
    setDefault(view) {
        this.defaultView = this.availableViews[this.availableViews.indexOf(view)];
    }
    createOrFindView(type) {
        if (this.createdViews.length == 0) {
            return this.createView(type);
        }
        else {
            const view = this.replaceView(this.createdViews[0], type);
            return view;
        }
    }
    createView(type) {
        //if no type it will fall back to the default type
        const view = new type(this);
        this.createdViews.push(view);
        this.editor.viewBox.refreshInBetween();
        this.editor.changeSelectedView(view);
        return view;
    }
    createDefaultView() {
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
    replaceView(origView, newViewType) {
        const index = origView.gIndexInParent();
        this.destroyView(origView);
        const view = this.createView(newViewType);
        view.indexInParent(index);
        this.editor.viewBox.refreshInBetween();
        this.editor.changeSelectedView(view);
        boundingRect.draw();
        return view;
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
}
//type ContType2=(new (cont: AssetViewController) => AssetView);
//export class AssetViewController extends ViewController{
//    public availableViews: ContType[] = [];//views that can be created for this controller as new types
//    asset;
//    constructor(editor:Editor,asset:Asset){
//        super(editor)
//        this.asset=asset;
//    }
//    setAssetSource(newSrc: string) {
//        //code for updating asset source
//        if (this.asset != null) {
//            this.asset.source = newSrc;
//        }
//        else {
//            console.error("set asset source called on non asset controller")
//        }
//        this.refreshViews();
//    }
//
//    addAvailable(view: ContType2, setDefault: boolean) {
//        super.addAvailable(view,setDefault)
//    }
//
//}
