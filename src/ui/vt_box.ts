import { TransformConversions } from "../util/transform.js";
import { IBoxConfig,HzBox } from "./hz_box.js";
import { EConstraintsX, EConstraintsY, IRectConfig, Rect } from "./rect.js";



export class VtBox<Config=IBoxConfig> extends Rect<Config> {
    public children: Rect<IRectConfig>[]=[];
    public availableSpace=0;
    public childrenDimensionsSumm=0;
    resizeBoxToContent=false;

    constructor() {
        super();
    }

    public addInBetweenRect(rect: IRectConfig) {
        function childPush(args: any, thisObj: Rect[]) {
            const changedShape: Rect = args[0];
            const index = thisObj.indexOf(changedShape);
            if (thisObj[index - 1]) {
                const r1 = new Rect
                // @ts-ignore: to ignore next line in ts
                r1["hi"] = true;
                r1.addConfig(rect);
                r1.addConfig({
                    parent: thisObj[0].parent
                })
                r1.setIndexInParent(index);
            }
        }
        function childSplice(args: any, thisObj: Rect[]) {
            console.log("destroy3")
            const changedIndex: number = args[0];
            console.log(args)
            //const index = thisObj.indexOf(changedShape);
            if (thisObj[changedIndex - 1].hi==true) {
                thisObj[changedIndex - 1].destroySelfAndChildren();
            }
        }
        // @ts-ignore: to ignore next line in ts
        this.children.push = function () {
            // @ts-ignore: to ignore next line in ts
            Array.prototype.push.apply(this, arguments);
            if (!(arguments[0].hi == true)) {
                childPush(arguments, this);
            }
        };
        // @ts-ignore: to ignore next line in ts
        this.children.splice = function () {
            // @ts-ignore: to ignore next line in ts
            Array.prototype.splice.apply(this, arguments);
            // @ts-ignore: to ignore next line in ts
            if (!(arguments[0].hi == true)) {
                childSplice(arguments,this);
            }
        };
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
            if(el.constraintY==EConstraintsY.top||el.constraintY==EConstraintsY.bottom||el.constraintY==EConstraintsY.center){
                fixedSizesSumm+=el.fixedSizeH;
            }
        })
        this.availableSpace=TransformConversions.edgesToPosAndSize(this.absEdges).size.h-fixedSizesSumm;

        let childrenDimensionsSumm=0;
        this.children.forEach(el=>{
            if(el.constraintY==EConstraintsY.scale){
                childrenDimensionsSumm+=el.boxProportion;
            }
        })
        this.childrenDimensionsSumm=childrenDimensionsSumm;

        const absEdges=this.absEdges;
        const parentAbsEdges=this.parent.absEdges;

        if(this.resizeBoxToContent==true){
            switch(this.constraintY){
                case EConstraintsY.top:
                    absEdges.top=parentAbsEdges.top+this.fixedOffsetY;
                    absEdges.bottom=absEdges.top+fixedSizesSumm;
                    break;
                case EConstraintsY.bottom:
                    absEdges.bottom=parentAbsEdges.bottom-this.fixedOffsetY;
                    absEdges.top=absEdges.bottom-fixedSizesSumm;
                    break;
                case EConstraintsY.center:
                    const middle=TransformConversions.average(parentAbsEdges.top,parentAbsEdges.bottom);
                    absEdges.top=middle-fixedSizesSumm/2+this.fixedOffsetY;
                    absEdges.bottom=absEdges.top+fixedSizesSumm;
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

        absEdges.left=parentAbsEdges.left
        absEdges.right=parentAbsEdges.right
        switch(child.constraintY){
            case EConstraintsY.top: case EConstraintsY.bottom: case EConstraintsY.center:
                if(this.isFirst(child)){
                    absEdges.top=parentAbsEdges.top;
                }
                else{
                    absEdges.top=this.getPrevious(child).absEdges.bottom;
                }
                absEdges.bottom=absEdges.top+child.fixedSizeH;
                break;
            case EConstraintsY.scale:
                if(this.isFirst(child)){
                    absEdges.top=parentAbsEdges.top;
                }
                else{
                    absEdges.top=this.getPrevious(child).absEdges.bottom;
                }
                absEdges.bottom=absEdges.top+this.availableSpace*child.boxProportion/this.childrenDimensionsSumm;
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