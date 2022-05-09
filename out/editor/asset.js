import { editor } from "../main.js";
import { LevelView } from "./level_view.js";
import { ScriptView } from "./script_view.js";
import { AssetView } from "./view.js";
import { ViewController } from "./view_controller.js";
export var AssetType;
(function (AssetType) {
    AssetType["level"] = "level";
    AssetType["script"] = "script";
})(AssetType || (AssetType = {}));
export const allAssets = [];
export function createAsset(name, type) {
    let asset = { name: name, type: type, source: JSON.stringify([]) };
    asset.cont = new ViewController(editor, asset);
    asset.cont.addAvailable(AssetView, true);
    switch (type) {
        case AssetType.level:
            asset.cont.addAvailable(LevelView, true);
            break;
        case AssetType.script:
            asset.cont.addAvailable(ScriptView, true);
            break;
    }
    allAssets.push(asset);
    editor.contBrowCont.refreshViews();
}
export function destroyAsset(asset) {
    asset.cont.destroy();
    allAssets.splice(allAssets.indexOf(asset), 1);
}
