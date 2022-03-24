import { boundingRect, BoundingRect } from "./bounding_rect.js";
import { Canvas } from "./canvas.js";



export interface IShapeConfig {
    parent?: Shape | BoundingRect,
    canvas?: Canvas,
    zIndex?: number
}


export abstract class Shape<Config = IShapeConfig> {
    
    protected parent: Shape | BoundingRect = boundingRect;
    public children: Shape[] = [];
    protected canvas: Canvas = boundingRect.canvas;
    public zIndex = 0;

    constructor() {
        boundingRect.allShapes.push(this);

        this.setParent(this.parent);
    }

    setParent(){

    }
    getParent(){
        
    }

    public addConfig(config: IShapeConfig) {
        this.setConfigAttrs(config);
        boundingRect.draw();
    }

    protected setConfigAttrs(config: any) {
        if (config) {
            for (const opt in config) {
                this.setAttr(opt, config[opt])
            }
        }
    }

    protected setAttr(key: any, value: any) {
        if (key === "parent") {
            this.setParent(value);
        }
        else if (key === "zIndex") {
            this.setZIndex(value);
        }

        // @ts-ignore: to ignore next line in ts
        this[key] = value;
    }

    public getAttr(key: string) {

        // @ts-ignore: to ignore next line in ts
        return this[key];
    }

    private setZIndex(index: number) {
        this.zIndex = index;
        for (const child of this.children) {
            child.setZIndex(this.zIndex);
        }
    }

    private setParent(parent: Shape | BoundingRect) {
        if (this.parent.children.indexOf(this) != -1) {
            this.parent.children.splice(this.parent.children.indexOf(this), 1)
        }
        parent.children.push(this);
    }


    public setIndexInParent(index: number) {
        this.parent.children.splice(this.parent.children.indexOf(this), 1)
        this.parent.children.splice(index, 0, this);
        console.log("yeeehhh")
        console.log(this)
    }

    public resize() {
        for (const child of this.children) {
            child.resize();
        }
    }

    public draw() {
    }

    public replace(newObj: Shape){
        newObj.addConfig({parent:this.parent});
        const childrenLenght=this.children.length;
        for(var i=0;i<childrenLenght;i++){
            const obj=this.children[0]
            obj.addConfig({
                parent:newObj
            })
        }
        this.destroySelf();
    }

    public popOut(){
        const childrenLenght=this.children.length;
        for(var i=0;i<childrenLenght;i++){
            const obj=this.children[0]
            obj.addConfig({
                parent:this.parent
            })
        }
        this.destroySelf();
    }

    public destroySelfAndChildren() {

        this.destroyAllChildren();
        this.destroySelf();
        boundingRect.draw();
    }

    public destroySelf(){
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        boundingRect.allShapes.splice(boundingRect.allShapes.indexOf(this), 1)
        boundingRect.draw();
    }

    public destroyAllChildren() {
        const childLength = this.children.length

        for (let i = 0; i < childLength; i++) {
            this.children[0].destroySelfAndChildren();
        }
    }
}