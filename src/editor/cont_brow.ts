import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { BoxType, EConstraintsX, EConstraintsY, Rect } from "../ui/rect.js";
import { SvgObj, SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { TransformConversions } from "../util/transform.js";
import { uni } from "../util/uniform.js";
import { allAssets, Asset, AssetType, destroyAsset } from "./asset.js";
import { View } from "./view.js";
import { ViewController } from "./view_controller.js";

class AssetButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    title;
    type;
    constructor(cB: ContentBrowser, btAsset: Asset) {
        super()
        this
            .sParent(cB.vtBox)
            .sFixedSize(uni.vtBoxSize)
        this.onPress = () => {
            mouseHandler.draggedAsset = btAsset;
        }
        this.onRelease = () => {
            if(mouseHandler.isValidDrag==false){
                if (btAsset.cont.createdViews.length == 0) {
                    btAsset.cont.createDefaultView();
                } else {
                    cB.controller.editor.changeSelectedView(btAsset.cont.createdViews[0])
                }
            }
        }

        this.title = new TextRect()
        this.title
            .sParent(this)
            .sConstX(EConstraintsX.left)
            .applyOffsetSnap()

        this.title.sText(btAsset.name);

        boundingRect.draw();

        this.type = new TextRect()
        this.type
            .sParent(this)
            .sConstX(EConstraintsX.left)
            .sFixedOffsetX(TransformConversions.edgesToPosAndSize(this.title.gAbsEdges()).size.w + 15 + uni.defEdgeDist)

        this.type.sText(btAsset.type);

        if(cB.controller.editor.playStartLv!=btAsset){ 
            const delButton = uni.makeConform(new (MakeHoverPressButton(MakeClickable(SvgRect)))(AllSvg.trash,this))
            delButton
                .applyOffsetSnap()
                .sConstX(EConstraintsX.right)
                .sSvg(AllSvg.trash) 
                .onRelease = () => {
                    destroyAsset(btAsset);
                    cB.controller.refreshViews();
                }
            delButton.idleColor = colorCreator.darkColorDef;
            delButton.sColor(colorCreator.darkColorDef)
        }

        if(btAsset.type==AssetType.level){
            //make flag for all level button
            //if(cB.controller.editor.playStartLv==asset){
            //    //toggle flag
            //}
        }

    }
}

export class ContentBrowser extends View {
    vtBox;
    viewName = "ContentBrowser";
    constructor(cont: ViewController) {
        super(cont);
        this.setTitle()
        this.indexInParent(0);
        //this.sFixedSize(240)
            //.sConsts(EConstraintsX.left,EConstraintsY.top)

        this.vtBox = new Box(BoxType.vt)
        this.vtBox
            .sParent(this.contArea)
            .sFillSpace()
            .sIsVisible(false)


        boundingRect.draw();
        this.refreshContent();
    }
    refreshContent(): void {
        this.vtBox.destroyChildren();

        console.log(allAssets)
        allAssets.forEach(el => {
            const button = new AssetButton(this, el);


        })

        const spacer = uni.makeConform(new Rect (this.vtBox));
        spacer.sFixedSize(uni.defEdgeDist)
            .sIsVisible(false);

        const createButton = uni.makeConform(new (MakeHoverPressButton(MakeClickable(Rect))) (this.vtBox));
        createButton.sFixedSize(50)
            .onRelease = () => {
                //create new asset and refresh views
            }
        const text = createButton.addText();
        text.sText("Create Asset")
        console.log("esse")
        boundingRect.draw();
    }
}