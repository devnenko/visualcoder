import { Rect } from './rect.js';
export class Tabbar {
    constructor(canvas) {
        this.tabs = [];
        this.canvas = canvas;
        var tabbar = new Rect(canvas.boundingRect, canvas);
        tabbar.setStretchTo(true, true, true, false);
        tabbar.setFixedOffset(0, 0, 0, 45);
        tabbar.setColor("green");
        canvas.startDraw(tabbar);
        canvas.updateContent();
        this.tabbar = tabbar;
    }
    addTab() {
        var tab = new Rect(this.tabbar, this.canvas);
        tab.setStretchTo(true, true, true, true);
        var tabStart = this.tabs.length * 130;
        tab.setFixedOffset(tabStart, tabStart + 130, 0, 0);
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        tab.setColor(color);
        this.canvas.startDraw(tab);
        this.canvas.updateContent();
        this.tabs.push(tab);
    }
}
