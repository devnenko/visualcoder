import { BoundingShape, boundingShape ,Canvas} from "./ui.js";

export enum ERectType {
    Normal = 0,
    HzBox = 1,
    VtBox = 2
}

export interface IShapeConfig {
    parent?: IShape,
    canvas?: Canvas
}


export interface IShape {
    canvas?: Canvas,
    parent?: IShape;
    children: IShape[],//only children is passed (no parent)
    draw: (parent: IShape) => void, //draws shape and all children 
    //overlappHierarchy(pos:IPos): Button[]
    destroy: () => void
}



export abstract class Shape<Config = IShapeConfig> {
    public parent:IShape=boundingShape;
    public canvas:Canvas=boundingShape.canvas;
    public children: IShape[] = [];
    constructor(config?:Config) {
        this.parent.children.push(this);
        this.setAttrs(config);
    }

    addConfig(config:IShapeConfig){
        this.setAttrs(config);
        boundingShape.draw();
    }

    public setAttrs(config:any){
        if(config){
            for (const opt in config) {
                //if (Object.prototype.hasOwnProperty.call(config, opt)) {
                //    this.setAttr(opt, config[opt])
                //}
                this.setAttr(opt, config[opt])
            }
        }
    }

    protected setAttr(key: any,value:any){
        if (key==="parent") {
            this.setParent(value as IShape);//why val.parent????
        }
        // @ts-ignore
        this[key]=value;
    }

    getAttr(key:string){
        // @ts-ignore
        return this[key];
    }

    //public createConfig(opts:Opts){
    //    this.addConfig(opts)
    //}
//
    //protected addConfig(opts: any) {
    //    for (const opt in opts) {
    //        if (Object.prototype.hasOwnProperty.call(opts, opt)) {
    //            this.setConfigAttr(opt as keyof Opts, opts[opt])
    //        }
    //    }
    //    //boundingShape.draw();
    //}

    //public setConfigAttr(key: keyof Opts, val: any) {
//
    //    if (val === undefined || val === null) {
    //        delete this[key as keyof IShapeConfig];
    //    }
    //    else if (key==="parent") {
    //        this.setParent(val as IShape);//why val.parent????
    //    }
    //    else {
    //        this[key as keyof IShapeConfig] = val;
    //    }
    //}
//
    //private getConfigAttr(key: keyof IShapeConfig) {
    //    return this[key];
    //}

    protected setParent(parent:IShape){
        this.parent.children.splice(this.parent.children.indexOf(this),1)
        parent.children.push(this);
        boundingShape.draw();
    }

    public draw(parent: IShape) {
        for (const child of this.children) {
            child.draw(this);
        }
    }

    public destroy() {

        this.destroyChildrenOnly();
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }

    public destroyChildrenOnly(){
        const childLength = this.children.length

        for (let i = 0; i < childLength; i++) {
            this.children[0].destroy();
        }
    }
}