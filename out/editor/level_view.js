import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { EConstraintsX, EConstraintsY, BoxType, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeToggleButton } from "../ui_components/button.js";
import { colorCreator } from "../util/color.js";
import { uniform } from "../util/uniform.js";
import { allAssets, AssetType } from "./asset.js";
import { View } from "./view.js";
//make play view its own view type which will always have camera orientation
//and the qutoswitch when press play
class SideBar extends Box {
    constructor(lvView) {
        super(BoxType.vt);
        this.acceptedTypes = [AssetType.script];
        this.sParent(lvView.hzBox)
            .sConstX(EConstraintsX.right)
            .sFixedSizeW(185)
            .sColor(colorCreator.colorByBrightness(6));
        mouseHandler.subscribeDrag(this);
    }
    destroy() {
        mouseHandler.unsubscribeDrag(this);
        super.destroy();
    }
    onDrag(asset) {
        console.log("drag");
        console.log(asset);
    }
}
export class LevelView extends View {
    constructor(cont) {
        super(cont);
        this.viewName = "LevelView";
        this.sideBar = null;
        //this.viewName="LevelView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle();
        this.hzBox = uniform.makeInvisFill(new Box(BoxType.hz), this.contArea);
        this.levelArea = uniform.makeInvisFill(new Rect, this.hzBox);
        this.sideBarButton = new (MakeToggleButton(MakeClickable(Rect)));
        this.sideBarButton
            .sParent(this.contArea)
            .sConstX(EConstraintsX.right)
            .sFixedOffsetY(uniform.defEdgeDist * 2)
            .sFixedSize(40)
            .sColor(colorCreator.darkColorDef);
        this.sideBarButton.idleColor = colorCreator.darkColorDef;
        this.sideBarButton.onToggle = (isOn) => {
            if (isOn) {
                this.sideBar = new SideBar(this);
                this.sideBarButton.sFixedOffsetX(this.sideBar.gFixedSize().w);
                boundingRect.draw();
            }
            else {
                this.sideBar?.destroy();
                this.sideBar = null;
                this.sideBarButton.sFixedOffsetX(0);
                boundingRect.draw();
            }
        };
        this.refreshContent();
    }
    addAsset(newAsset) {
        const asset = this.cont.getAsset();
        if (asset) {
            const addingAsset = allAssets.find(el => el.name == newAsset);
            const alrAsset = JSON.parse(this.cont.getAsset().source).find(el => el == newAsset);
            console.log(JSON.parse(this.cont.getAsset().source).find(el => el == newAsset));
            if (addingAsset.type == AssetType.script && alrAsset == null) {
                const fileSrc = JSON.parse(asset.source);
                fileSrc.push(newAsset);
                asset.source = JSON.stringify(fileSrc);
            }
        }
        this.cont.refreshViews();
    }
    refreshContent() {
        //this.clickArea.destroyChildren();
        //get used assets from json
        const assetObjs = [];
        const asset = this.cont.getAsset();
        if (asset) {
            const str = JSON.parse(asset.source);
            str.forEach(el => {
                const res = allAssets.find(asset => el == asset.name);
                if (res) {
                    assetObjs.push(res);
                }
            });
        }
        console.log(assetObjs);
        assetObjs.forEach(el => {
            if (el.type == AssetType.script) {
                const r1 = new Rect;
                //r1.sParent(this.clickArea)
                //r1.sFixedOffsetX(mouseHandler.mousePos.x)
                //r1.sFixedOffsetY(mouseHandler.mousePos.y)
            }
        });
        boundingRect.draw();
    }
    play() {
        this.cont.editor.changeSelectedView(this);
        //get used assets from json
        const assetObjs = [];
        const asset = this.cont.getAsset();
        if (asset) {
            const str = JSON.parse(asset.source);
            str.forEach(el => {
                const res = allAssets.find(asset => el == asset.name);
                if (res) {
                    assetObjs.push(res);
                }
            });
        }
        assetObjs.forEach(el => {
            if (el.type == AssetType.script) {
                const r = new TextRect;
                r
                    .sParent(this.contArea)
                    .sText("")
                    .sConsts(EConstraintsX.left, EConstraintsY.top)
                    .applyOffsetSnap()
                    .sColor("pink");
                JSON.parse(el.source).forEach(el => {
                    //r.sText(r.gText().concat("\n"))
                    r.sText(r.gText().concat(el));
                });
                boundingRect.draw();
                setTimeout(() => {
                    r.destroy();
                    boundingRect.draw();
                }, 1000);
            }
        });
    }
}
