import { Rect, ResizeType } from './rect.js';
export class TopBar {
    constructor(canvas) {
        this.buttons = [];
        this.canvas = canvas;
        var mainRect = new Rect(canvas.boundingRect, canvas);
        mainRect.setStretchAndOffset({
            left: { value: 0, resize: ResizeType.sr },
            right: { value: 0, resize: ResizeType.sr },
            top: { value: 0, resize: ResizeType.sr },
            bottom: { value: 80, resize: ResizeType.px }
        });
        mainRect.setColor("grey");
        this.mainRect = mainRect;
    }
    addButton() {
        var tab = new Rect(this.mainRect, this.canvas);
        var letters = '0123456789ABCDEF';
        var randomColor = '#';
        for (var i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
        }
        tab.setColor(randomColor);
        tab.setStretchAndOffset({
            left: { value: this.buttons.length * 80, resize: ResizeType.sr },
            right: { value: 80, resize: ResizeType.px },
            top: { value: 0, resize: ResizeType.sr },
            bottom: { value: 0, resize: ResizeType.sr }
        });
        tab.clickE = () => {
            var specialTab = new Rect(this.canvas.boundingRect, this.canvas);
            specialTab.setColor("orange");
            specialTab.setStretchAndOffset({
                left: { value: 60, resize: ResizeType.sr },
                right: { value: 60, resize: ResizeType.sr },
                top: { value: 60, resize: ResizeType.sr },
                bottom: { value: 60, resize: ResizeType.sr }
            });
        };
        this.buttons.push(tab);
    }
}
