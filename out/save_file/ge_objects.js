import { GeObject } from "./ge_interface";
export class GeShape extends GeObject {
    constructor(name, transform, vertices, material) {
        super(name);
        this.transform = transform;
        this.vertices = vertices;
        this.material = material;
    }
}
