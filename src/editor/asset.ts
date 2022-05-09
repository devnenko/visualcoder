import { editor } from "../main.js"
import { LevelView } from "./level_view.js";
import { ScriptView } from "./script_view.js";
import { AssetView } from "./view.js";
import { ViewController } from "./view_controller.js"

export enum AssetType {
    level="level",
    script="script"
}

export interface Asset {
    name: string,
    type: AssetType,
    source: string,
    cont:ViewController
}

export const allAssets:Asset[]=[]

export function createAsset(name:string,type:AssetType){
    let asset:Asset={name:name,type:type,source:JSON.stringify([])} as Asset;
    asset.cont=new ViewController(editor,asset);
    asset.cont.addAvailable(AssetView,true);
    switch(type){
        case AssetType.level:
            asset.cont.addAvailable(LevelView,true);
            break;
        case AssetType.script:
            asset.cont.addAvailable(ScriptView,true);
            break;
    }

    allAssets.push(asset as Asset)

    editor.contBrowCont.refreshViews();
}

export function destroyAsset(asset:Asset){
    asset.cont.destroy();
    allAssets.splice(allAssets.indexOf(asset),1);
}