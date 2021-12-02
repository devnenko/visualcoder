import { Rect, ResizeType } from './rect.js';
export class View {
    constructor(canvas) {
        this.canvas = canvas;
        var mainRect = new Rect(canvas.boundingRect, canvas);
        mainRect.setStretchAndOffset({
            left: { value: 0, resize: ResizeType.sr },
            right: { value: 0, resize: ResizeType.sr },
            top: { value: 80, resize: ResizeType.sr },
            bottom: { value: 0, resize: ResizeType.sr }
        });
        mainRect.setColor("lightgrey");
        this.mainRect = mainRect;
    }
}
70;
