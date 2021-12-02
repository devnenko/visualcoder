import { Rect, ResizeType } from './rect.js';
export class Tabbar {
    constructor(canvas) {
        this.tabs = [];
        this.canvas = canvas;
        var tabbar = new Rect(canvas.boundingRect, canvas);
        tabbar.setStretchAndOffset({
            left: { value: 0, resize: ResizeType.sr },
            right: { value: 0, resize: ResizeType.sr },
            top: { value: 0, resize: ResizeType.sr },
            bottom: { value: 60, resize: ResizeType.px }
        });
        this.tabbar = tabbar;
    }
    addTab() {
        var tab = new Rect(this.tabbar, this.canvas);
        var letters = '0123456789ABCDEF';
        var randomColor = '#';
        for (var i = 0; i < 6; i++) {
            randomColor += letters[Math.floor(Math.random() * 16)];
        }
        tab.setColor(randomColor);
        tab.setStretchAndOffset({
            left: { value: this.tabs.length * 200, resize: ResizeType.sr },
            right: { value: 200, resize: ResizeType.px },
            top: { value: 0, resize: ResizeType.sr },
            bottom: { value: 0, resize: ResizeType.sr }
        });
        this.tabs.push(tab);
    }
}
