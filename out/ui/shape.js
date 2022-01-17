export var EObjectType;
(function (EObjectType) {
    EObjectType[EObjectType["Normal"] = 0] = "Normal";
    EObjectType[EObjectType["HzBox"] = 1] = "HzBox";
    EObjectType[EObjectType["VtBox"] = 2] = "VtBox";
})(EObjectType || (EObjectType = {}));
export class Shape {
    constructor(parent, canvas) {
        this.discriminator1 = 'IShape';
        this.children = [];
        parent.children.push(this); //set this as a child of parent to create an object tree
        this.parent = parent;
        this.canvas = canvas;
    }
    destroy() {
        console.log("dest");
        this.parent.children.splice(this.parent.children.indexOf(this), 1);
        if (this.parent.children.indexOf(this) == -1) {
            //console.log("error")
        }
    }
    drawHierarchy(parent) {
        for (const child of this.children) {
            child.drawHierarchy(this);
        }
    }
    checkOverlapp(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.checkOverlapp(pos));
        }
        return all;
    }
}
export function instanceOfShape(object) {
    return object.discriminator1 === 'IShape';
}
