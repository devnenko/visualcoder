import { Rect, ResizeType } from './rect.js';
export class ActionBar {
    constructor(canvas) {
        this.tabs = [];
        this.canvas = canvas;
        var mainRect = new Rect(canvas.boundingRect, canvas);
        mainRect.setStretchAndOffset({
            left: { value: 0, resize: ResizeType.sr },
            right: { value: 0, resize: ResizeType.sr },
            top: { value: 0, resize: ResizeType.sr },
            bottom: { value: 50, resize: ResizeType.px }
        });
        this.mainRect = mainRect;
    }
    addTab() {
    }
}
