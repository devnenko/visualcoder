import { LevelView } from "./level_view.js";
import { ScriptView } from "./script_view.js";
import { AssetInfoView } from "./view.js";
import { ViewController } from "./view_controller.js";
export var AssetType;
(function (AssetType) {
    AssetType["level"] = "level";
    AssetType["script"] = "script";
    AssetType["empty"] = "empty";
})(AssetType || (AssetType = {}));
export const allAssets = [];
export function createAsset(name, type, editor, source) {
    let asset = { name: name, type: type, source: JSON.stringify([]) };
    asset.cont = new ViewController(editor);
    asset.cont.addAvailable(AssetInfoView, true);
    switch (type) {
        case AssetType.level:
            asset.cont.addAvailable(LevelView, true);
            break;
        case AssetType.script:
            asset.cont.addAvailable(ScriptView, true);
            break;
    }
    if (source) {
        asset.source = source;
    }
    allAssets.push(asset);
    editor.cBCont.refreshViews();
    return asset;
}
export function destroyAsset(asset) {
    asset.cont.destroy();
    allAssets.splice(allAssets.indexOf(asset), 1);
}
export function emptyAsset(cont) {
    let asset = { name: "empty", type: AssetType.empty, source: JSON.stringify([]), cont: cont };
    return asset;
}
