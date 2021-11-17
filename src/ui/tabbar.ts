import { Canvas } from '../canvas.js';
import { Rect } from './rect.js';

export class Tabbar{
    public canvas:Canvas;
    tabbar:Rect;
    tabs:Rect[]=[];
    constructor(canvas:Canvas){
        this.canvas=canvas;
        var tabbar = new Rect();
        tabbar.setParent(canvas.boundingRect);
        tabbar.setStretchTo({top:true,left:true,right:true});
        tabbar.setFixedOffset({bottom:45});
        tabbar.color="green";
        canvas.startDraw(tabbar);
        canvas.updateContent();
        this.tabbar=tabbar;
    }

    public addTab(){
        var tab = new Rect();
        tab.setParent(this.tabbar);
        tab.setStretchTo({top:true,bottom:true});
        var tabStart=this.tabs.length*130;
        tab.setFixedOffset({left:tabStart,right:tabStart+130});
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        tab.color=color;
        this.canvas.startDraw(tab);
        this.canvas.updateContent();
        this.tabs.push(tab);
    }
}