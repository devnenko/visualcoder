import { boundingRect } from "../ui/bounding_rect.js";
import { Box } from "../ui/box.js";
import { MakeClickable } from "../ui/clickable_rect.js";
import { mouseHandler } from "../ui/event_handlers/mouse.js";
import { BoxType, EConstraintsX, Rect } from "../ui/rect.js";
import { SvgRect } from "../ui/svg_rect.js";
import { TextRect } from "../ui/text_rect.js";
import { MakeHoverPressButton } from "../ui_components/button.js";
import { AllSvg } from "../util/allsvg.js";
import { colorCreator } from "../util/color.js";
import { TransformConversions } from "../util/transform.js";
import { uniform } from "../util/uniform.js";
import { allAssets, destroyAsset } from "./asset.js";
import { View } from "./view.js";
class AssetButton extends MakeHoverPressButton(MakeClickable(Rect)) {
    constructor(cB, asset) {
        super();
        this
            .sParent(cB.vtBox)
            .sFixedSize(uniform.vtBoxSize);
        this.onPress = () => {
            mouseHandler.draggedAsset = asset;
        };
        this.onRelease = () => {
            if (asset.cont.createdViews.length == 0) {
                asset.cont.createView();
            }
            else {
                cB.cont.editor.changeSelectedView(asset.cont.createdViews[0]);
            }
        };
        this.title = new TextRect();
        this.title
            .sParent(this)
            .sConstX(EConstraintsX.left)
            .applyOffsetSnap();
        this.title.sText(asset.name);
        boundingRect.draw();
        this.type = new TextRect();
        this.type
            .sParent(this)
            .sConstX(EConstraintsX.left)
            .sFixedOffsetX(TransformConversions.edgesToPosAndSize(this.title.gAbsEdges()).size.w + 15 + uniform.defEdgeDist);
        this.type.sText(asset.type);
        const delButton = uniform.makeRectConform(new (MakeHoverPressButton(MakeClickable(SvgRect))), this);
        delButton
            .applyOffsetSnap()
            .sConstX(EConstraintsX.right)
            .sSvg(AllSvg.trash)
            .onRelease = () => {
            destroyAsset(asset);
            cB.cont.refreshViews();
        };
        delButton.idleColor = colorCreator.darkColorDef;
        delButton.sColor(colorCreator.darkColorDef);
    }
}
export class ContentBrowser extends View {
    constructor(cont) {
        super(cont);
        this.viewName = "ContentBrowser";
        this.setTitle();
        this.indexInParent(0);
        //this.sFixedSize(200)
        //    .sConsts(EConstraintsX.left,EConstraintsY.top)
        this.vtBox = new Box(BoxType.vt);
        this.vtBox
            .sParent(this.contArea)
            .sFillSpace()
            .sIsVisible(false);
        boundingRect.draw();
        this.refreshContent();
    }
    refreshContent() {
        this.vtBox.destroyChildren();
        allAssets.forEach(el => {
            const button = new AssetButton(this, el);
        });
        const spacer = uniform.makeRectConform(new Rect, this.vtBox);
        spacer.sFixedSize(uniform.defEdgeDist)
            .sIsVisible(false);
        const createButton = uniform.makeRectConform(new (MakeHoverPressButton(MakeClickable(Rect))), this.vtBox);
        createButton.sFixedSize(50)
            .onRelease = () => {
            //create new asset and refresh views
        };
        const text = createButton.addText();
        text.sText("Create Asset");
        boundingRect.draw();
    }
}
