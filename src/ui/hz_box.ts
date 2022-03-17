import { VtBox } from './vt_box.js';
import { TransformConversions } from "../util/transform.js";
import { EConstraintsX, IRectConfig, Rect } from "./rect.js";


export interface IBoxConfig extends IRectConfig{
    resizeBoxToContent?:boolean
}

export class HzBox<Config=IBoxConfig> extends Rect<Config> {
    public children: Rect<IRectConfig>[]=[];
    public availableSpace=0;
    public childrenDimensionsSumm=0;
    resizeBoxToContent=false;

    constructor() {
        super();
    }

    public addConfig(config: Config): void {
        super.addConfig(config);
    }

    public resize(): void {
        if(!(this.parent instanceof HzBox||this.parent instanceof VtBox)){
            super.resizeSelf();//resize hzbox
        }
        this.impValues();

        for (const child of this.children) {

            this.resizeChild(child);


            if(!(child instanceof HzBox||child instanceof VtBox)){
                for(const childchild of child.children){
                    childchild.resize();
                }
            }
            else{
                child.resize();
            }
        }
    }

    impValues(){
        let fixedSizesSumm=0;
        this.children.forEach(el=>{
            if(el.constraintX==EConstraintsX.left||el.constraintX==EConstraintsX.right||el.constraintX==EConstraintsX.center){
                fixedSizesSumm+=el.fixedSizeW;
            }
        })
        this.availableSpace=TransformConversions.edgesToPosAndSize(this.absEdges).size.w-fixedSizesSumm;

        let childrenDimensionsSumm=0;
        this.children.forEach(el=>{
            if(el.constraintX==EConstraintsX.scale){
                childrenDimensionsSumm+=el.boxProportion;
            }
        })
        this.childrenDimensionsSumm=childrenDimensionsSumm;

        const absEdges=this.absEdges;
        const parentAbsEdges=this.parent.absEdges;

        if(this.resizeBoxToContent==true){
            switch(this.constraintX){
                case EConstraintsX.left:
                    absEdges.left=parentAbsEdges.left+this.fixedOffsetX;
                    absEdges.right=absEdges.left+fixedSizesSumm;
                    break;
                case EConstraintsX.right:
                    absEdges.right=parentAbsEdges.right-this.fixedOffsetX;
                    absEdges.left=absEdges.right-fixedSizesSumm;
                    break;
                case EConstraintsX.center:
                    const middle=TransformConversions.average(parentAbsEdges.left,parentAbsEdges.right);
                    absEdges.left=middle-fixedSizesSumm/2+this.fixedOffsetX;
                    absEdges.right=absEdges.left+fixedSizesSumm;
                    break;
                default:
                    console.error("box has scale constraint, but is supposed to resize to content, makes no sense")
            }
        }

        this.absEdges=absEdges;
    }

    public resizeChild(child:Rect){
        const parentAbsEdges=this.absEdges;
        const absEdges=child.absEdges;

        absEdges.top=parentAbsEdges.top
        absEdges.bottom=parentAbsEdges.bottom
        switch(child.constraintX){
            case EConstraintsX.left: case EConstraintsX.right: case EConstraintsX.center:
                if(this.isFirst(child)){
                    absEdges.left=parentAbsEdges.left;
                }
                else{
                    absEdges.left=this.getPrevious(child).absEdges.right;
                }
                absEdges.right=absEdges.left+child.fixedSizeW;
                break;
            case EConstraintsX.scale:
                if(this.isFirst(child)){
                    absEdges.left=parentAbsEdges.left;
                }
                else{
                    absEdges.left=this.getPrevious(child).absEdges.right;
                }
                absEdges.right=absEdges.left+this.availableSpace*child.boxProportion/this.childrenDimensionsSumm;
                break;
        }
        
        child.absEdges=absEdges;

        child.applySnapMargin();
        
    }

    private isFirst(child:Rect){
        const indexInParent=this.children.indexOf(child);
        if(indexInParent==0){
            return true;
        }
        return false;
    }
    private getPrevious(child:Rect){
        const indexInParent=this.children.indexOf(child);
        const newRect=this.children[indexInParent-1];
        return newRect as Rect;
    }
}