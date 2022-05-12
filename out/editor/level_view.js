import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { EConstraintsX, EConstraintsY, BoxType, Rect } from "../ui/rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton, MakeToggleButton } from "../ui_components/button.js";
import { colorCreator } from "../util/color.js";
import { uni } from "../util/uniform.js";
import { allAssets, AssetType } from "./asset.js";
import { View } from "./view.js";
//make play view its own view type which will always have camera orientation
//and the qutoswitch when press play
//this is not the case right now but should make happen later cause it motivates to use and understand change view feature
class SideBar extends Box {
    constructor(lvView) {
        super(BoxType.vt);
        this.acceptedTypes = [AssetType.script];
        this.lvView = lvView;
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
        this.lvView.addAsset(asset.name);
    }
}
export class LevelView extends View {
    constructor(cont) {
        super(cont);
        this.viewName = "LevelView";
        this.sideBar = null;
        //this.viewName="LevelView " + "(" + cont.getAsset()?.name + ")";
        this.setTitle();
        this.hzBox = uni.invisFill(new Box(BoxType.hz));
        this.hzBox.sParent(this.contArea);
        this.levelArea = uni.invisFill(new Rect);
        this.levelArea.sParent(this.hzBox);
        this.sideBarButton = new (MakeToggleButton(MakeClickable(Rect)));
        this.sideBarButton
            .sParent(this.contArea)
            .sConstX(EConstraintsX.right)
            .sFixedOffsetY(uni.defEdgeDist * 2)
            .sFixedSize(40)
            .sColor(colorCreator.darkColorDef);
        this.sideBarButton.idleColor = colorCreator.darkColorDef;
        this.sideBarButton.onToggle = (isOn) => {
            if (isOn) {
                this.sideBar = new SideBar(this);
                this.sideBarButton.sFixedOffsetX(this.sideBar.gFixedSize().w);
                this.refreshContent();
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
        const asset = this.controller.asset;
        if (asset) {
            const addingAsset = allAssets.find(el => el.name == newAsset);
            const alrAsset = JSON.parse(this.controller.asset.source).find(el => el == newAsset);
            console.log(JSON.parse(this.controller.asset.source).find(el => el == newAsset));
            if (addingAsset.type == AssetType.script && alrAsset == null) {
                const fileSrc = JSON.parse(asset.source);
                fileSrc.push(newAsset);
                asset.source = JSON.stringify(fileSrc);
            }
        }
        this.controller.refreshViews();
    }
    refreshContent() {
        //this.clickArea.destroyChildren();
        this.sideBar?.destroyChildren();
        //get used assets from json
        const assetObjs = [];
        const asset = this.controller.asset;
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
                //const r1 = new Rect
                //r1.sParent(this.clickArea)
                //r1.sFixedOffsetX(mouseHandler.mousePos.x)
                //r1.sFixedOffsetY(mouseHandler.mousePos.y)
                if (this.sideBar) {
                    const r1 = new (MakeHoverPressButton(MakeClickable(Rect)));
                    r1.sParent(this.sideBar);
                    r1.setFixedSizeH(40);
                    const t1 = new TextRect;
                    t1.sParent(r1);
                    t1.sText(el.name);
                }
            }
        });
        boundingRect.draw();
    }
    play() {
        this.controller.editor.changeSelectedView(this);
        //get used assets from json
        const linkedAssets = []; //maybe make this into a more general class function for other views too
        const asset = this.controller.asset;
        if (asset) {
            const str = JSON.parse(asset.source);
            str.forEach(el => {
                const res = allAssets.find(asset => el == asset.name);
                if (res) {
                    linkedAssets.push(res);
                }
            });
        }
        linkedAssets.forEach(el => {
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
