import { Canvas } from '../canvas.js';
import { Rect, ResizeType } from './rect.js';

export class Tabbar{
    public canvas:Canvas;
    tabbar:Rect;
    tabs:Rect[]=[];
    constructor(canvas:Canvas){
        this.canvas=canvas;
        var tabbar=new Rect(canvas.boundingRect,canvas);
        tabbar.setStretchAndOffset({
            left:{value:0,resize:ResizeType.sr},
            right:{value:0,resize:ResizeType.sr},
            top:{value:0,resize:ResizeType.sr},
            bottom:{value:60,resize:ResizeType.px}
        });
        this.tabbar=tabbar;
    }

    public addTab(){
        var tab=new Rect(this.tabbar,this.canvas);
        var letters = '0123456789ABCDEF';
        var randomColor = '#';
        for (var i = 0; i < 6; i++) {
          randomColor += letters[Math.floor(Math.random() * 16)];
        }
        tab.setColor(randomColor);
        tab.setStretchAndOffset({
            left:{value:this.tabs.length*200,resize:ResizeType.sr},
            right:{value:200,resize:ResizeType.px},
            top:{value:0,resize:ResizeType.sr},
            bottom:{value:0,resize:ResizeType.sr}
        });
        this.tabs.push(tab);
    }
}