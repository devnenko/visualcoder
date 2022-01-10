import { Button } from "../../ui/button.js";
import { EConstraintsX, EConstraintsY } from '../../ui/types/constraints.js';
export class DeleteButton extends Button {
    constructor(parent, canvas, deleteFunction) {
        super(parent, canvas);
        this.ctx = parent;
        this.deleteFunction = deleteFunction;
        this.setConstraints(EConstraintsX.scale, EConstraintsY.scale);
        this.setConstraintsInfo(undefined, { w: 50, h: 50 });
        this.color = "darkgrey";
    }
    onMouseDown(type) {
        this.deleteFunction(this.ctx);
    }
    onMouseMoveDown(type) {
    }
    onMouseUp(type) {
    }
}
