//this rect encapsulates all other rects
//it can refresh the whole screen when updated
//the any type addition disables typechecking for some reason
//this might introduce some bugs later
export class BoundingShape {
    constructor() {
        this.discriminator1 = 'IShape';
        this.children = [];
    }
    drawHierarchy(parent) {
        for (const child of this.children) {
            child.drawHierarchy(this);
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
        for (const child of this.children) {
            child.destroy();
        }
    }
}
