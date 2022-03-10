import { HoverPressButton, ToggleButton } from "../../../ui_components/ui_components.js";
import { Rect, Canvas, TextBox, colorCreator, boundingShape } from "../../../ui/ui.js";
import { EConstraintsX, EConstraintsY, EMouseType, IPos } from "../../../ui/types/types.js";
import { ViewOutline, View } from "../view.js";
import { allFiles, CBFile, FileTypes, mapStartFile, setMapStartFile } from "../cb_file.js";
import { ITextBoxConfig } from "../../../ui/text_box.js";
import { TextInput } from "../../../ui_components/text_input.js";
import { BlockEditor } from "../script/block/block_editor.js";
import { ERectType } from "../../../ui/shape.js";
import { PixelImage } from "../image/image.js";
import { ContentBrowser } from "./content_browser";
import { Level } from "../level/level.js";

export class FileButton extends HoverPressButton {
    previewRect: Rect | null = null;
    file: CBFile;
    contentBrowser: ContentBrowser;
    setStartButton:ToggleButton| null=null;
    //type:Text;

    constructor(file: CBFile, contentBrowser: ContentBrowser) {
        super()
        this.contentBrowser = contentBrowser;
        this.file = file;
        this.addConfig({
            parent: contentBrowser.vtBox,
            constraintX: EConstraintsX.scale,
            constraintY: EConstraintsY.top,
            snapMargin: 5,
            fixedSizeH: 70,
            onPress: (type: EMouseType, pos: IPos, isTopMost: boolean) => {
                if (isTopMost) {
                    if (file.type == FileTypes.script) {
                        contentBrowser.viewOutline.editor.addViewGeneric(BlockEditor);
                    }
                    else if(file.type == FileTypes.image){
                        contentBrowser.viewOutline.editor.addViewGeneric(PixelImage);
                    }
                    else if(file.type == FileTypes.level){
                        contentBrowser.viewOutline.editor.addViewGeneric(Level,file);
                    }
                }
            }
        })

        const labelConfig: ITextBoxConfig = {
            constraintY: EConstraintsY.center,
            size: 24,
            parent: this,
            text: file.type,
            snapOffset: { left: 20, right: 20, top: 0, bottom: 0 }
        };

        const nameText = new TextBox();
        nameText.addConfig(labelConfig)
        nameText.setText(file.name);


        const typeText = new TextBox();
        typeText.addConfig(labelConfig)
        typeText.addConfig({
            fixedOffsetX: nameText.getAbsSize().w,
            text: file.type
        })

        const rightHzBox=new Rect({
            parent:this,
            rectType:ERectType.HzBox,
            constraintX:EConstraintsX.right,
            constraintY:EConstraintsY.scale,
            fixedSizeW:500,
            isVisible:true,
            resizeBoxToContent:false
        })

        if(file.type==FileTypes.level){
            const setStartButton = new ToggleButton();
            setStartButton.addConfig({
                parent: rightHzBox,
                constraintX: EConstraintsX.right,
                constraintY: EConstraintsY.scale,
                fixedSizeW: 65,
                onToggle:(isOn:boolean)=>{
                    if(isOn){
                        setMapStartFile(this.file);
                        setStartButton.icon?.addConfig({
                            imageSrc:"flag.square.svg"
                        }) 
                    }
                    else{
                        setStartButton.icon?.addConfig({
                            imageSrc:"flag.square.fill.svg"
                        }) 

                    }
                }
            })
            setStartButton.createIcon();
            setStartButton.icon?.addConfig({
                imageSrc:"flag.square.fill.svg",
                snapMargin:5
            }) 
            this.contentBrowser.startFlagGroup.addButton(setStartButton);
            this.setStartButton=setStartButton;

            if(mapStartFile==file){
                this.contentBrowser.startFlagGroup.setCurrentToggled(setStartButton);

            }
        }


        const deleteButton = new HoverPressButton();
        deleteButton.addConfig({
            parent: rightHzBox,
            constraintX: EConstraintsX.right,
            constraintY: EConstraintsY.scale,
            fixedSizeW: 65,
            onPress: () => {
                //destroyScript();
                allFiles.splice(allFiles.indexOf(file), 1);
                contentBrowser.refresh();
            }
        })
        deleteButton.createIcon();
        deleteButton.icon?.addConfig({
            imageSrc:"trash.svg",
            snapMargin:5
        }) 


        rightHzBox.addConfig({
            fixedSizeW:rightHzBox.children.length*65
        })

    }
    public onMouseHoverBegin: (type: EMouseType, pos: IPos, isTopMost: boolean) => void = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.contentBrowser.isInFileSelector == false) {
            super.onMouseHoverBegin(type, pos, isTopMost)
        }
    };
    public onMouseDown: (type: EMouseType, pos: IPos, isTopMost: boolean) => void = (type: EMouseType, pos: IPos, isTopMost: boolean) => {
        if (this.contentBrowser.isInFileSelector == false) {
            super.onMouseDown(type, pos, isTopMost)
        }
    };
}