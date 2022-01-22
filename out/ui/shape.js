export var EObjectType;
(function (EObjectType) {
    EObjectType[EObjectType["Normal"] = 0] = "Normal";
    EObjectType[EObjectType["HzBox"] = 1] = "HzBox";
    EObjectType[EObjectType["VtBox"] = 2] = "VtBox";
})(EObjectType || (EObjectType = {}));
export function instanceOfShape(arg) {
    return arg.discriminator1 === 'IShape';
}
export class Shape {
    constructor(parent, canvas) {
        this.discriminator1 = 'IShape';
        this.children = [];
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent = parent;
        this.canvas = canvas;
    }
    drawHierarchy(parent) {
        for (const child of this.children) {
            child.drawHierarchy(parent);
        }
    }
    overlappHierarchy(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.overlappHierarchy(pos));
        }
        return all;
    }
    destroy() {
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        if (this.parent.children.indexOf(this) == -1) {
            //console.log("error")
        }
    }
}
class BoundingShape {
    constructor() {
        this.discriminator1 = 'IShape';
        this.children = [];
        this.absEdges = { left: 0, right: 0, top: 0, bottom: 0 };
        this.type = EObjectType.Normal;
    }
    drawHierarchy() {
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
        for (const child of this.children) {
            child.drawHierarchy(this);
        }
    }
    overlappHierarchy(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.overlappHierarchy(pos));
        }
        all = all.slice().reverse();
        return all;
    }
    destroy() {
        for (const child of this.children) {
            child.destroy();
        }
    }
}
const boundingShape = new BoundingShape();
//Object.freeze(boundingShape);
export { boundingShape };
