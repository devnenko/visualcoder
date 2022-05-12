
import { Editor } from "./editor.js";
import { LevelView } from "./level_view.js";
import { ScriptView } from "./script_view.js";
import { AssetInfoView } from "./view.js";
import { ViewController } from "./view_controller.js"

export enum AssetType {
    level="level",
    script="script",
    empty="empty"
}

export interface Asset {
    name: string,
    type: AssetType,
    source: string,
    cont:ViewController
}

export const allAssets:Asset[]=[]

export function createAsset(name:string,type:AssetType,editor:Editor,source?:string){
    let asset:Asset={name:name,type:type,source:JSON.stringify([])} as Asset;
    asset.cont=new ViewController(editor);
    asset.cont.addAvailable(AssetInfoView,true);
    switch(type){
        case AssetType.level:
            asset.cont.addAvailable(LevelView,true);
            break;
        case AssetType.script:
            asset.cont.addAvailable(ScriptView,true);
            break;
    }

    if(source){
        asset.source=source;
    }

    allAssets.push(asset as Asset)

    editor.cBCont.refreshViews();

    return asset;
}

export function destroyAsset(asset:Asset){
    asset.cont.destroy();
    allAssets.splice(allAssets.indexOf(asset),1);
}

export function emptyAsset(cont:ViewController){
    let asset:Asset={name:"empty",type:AssetType.empty,source:JSON.stringify([]),cont:cont};
    return asset;
}