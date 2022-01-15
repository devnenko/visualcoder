export var PinType;
(function (PinType) {
    PinType[PinType["in"] = 0] = "in";
    PinType[PinType["out"] = 1] = "out";
})(PinType || (PinType = {}));
export class BlockInstance {
    constructor(pos, block) {
        this.relPos = pos;
        this.block = block;
    }
}
