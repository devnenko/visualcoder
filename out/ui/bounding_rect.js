import { EObjectType } from "./shape.js";
export const BoundingRect = {
    discriminator1: 'IShape',
    type: EObjectType.Normal,
    children: [],
    absEdges: { left: 0, top: 0, right: window.innerWidth, bottom: window.innerHeight },
    drawHierarchy() {
        this.absEdges = { left: 0, right: window.innerWidth, top: 0, bottom: window.innerHeight };
        for (const child of this.children) {
            child.drawHierarchy(this);
        }
    },
    checkOverlapp(pos) {
        let all = [];
        for (const child of this.children) {
            all = all.concat(child.checkOverlapp(pos));
        }
        all = all.slice().reverse();
        return all;
    },
    destroy() {
    }
};
