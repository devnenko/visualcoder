import { TransformConversions } from "../util/transform.js";
import { Rect } from "./rect.js";
export class SvgObj {
    constructor(src, width, height) {
        this.source = src;
        this.width = width;
        this.height = height;
    }
    setColor(color) {
    }
}
SvgObj.defaultSvg = new SvgObj("M4.96582 20.7686H13.043C14.3965 20.7686 15.2666 19.9512 15.3369 18.5977L15.9258 5.94141H16.8926C17.3408 5.94141 17.6836 5.58984 17.6836 5.15039C17.6836 4.71094 17.332 4.37695 16.8926 4.37695H12.9902V3.05859C12.9902 1.70508 12.1289 0.914062 10.6611 0.914062H7.32129C5.85352 0.914062 4.99219 1.70508 4.99219 3.05859V4.37695H1.10742C0.667969 4.37695 0.316406 4.71973 0.316406 5.15039C0.316406 5.59863 0.667969 5.94141 1.10742 5.94141H2.07422L2.66309 18.5977C2.7334 19.96 3.59473 20.7686 4.96582 20.7686ZM6.63574 3.1377C6.63574 2.68945 6.95215 2.39941 7.43555 2.39941H10.5469C11.0303 2.39941 11.3467 2.68945 11.3467 3.1377V4.37695H6.63574V3.1377ZM5.1416 19.1953C4.6582 19.1953 4.30664 18.835 4.28027 18.3164L3.69141 5.94141H14.2822L13.7109 18.3164C13.6934 18.8438 13.3506 19.1953 12.8496 19.1953H5.1416ZM6.40723 17.7803C6.78516 17.7803 7.02246 17.543 7.01367 17.1914L6.75 7.99805C6.74121 7.64648 6.49512 7.41797 6.13477 7.41797C5.76562 7.41797 5.52832 7.65527 5.53711 8.00684L5.80078 17.2002C5.80957 17.5518 6.05566 17.7803 6.40723 17.7803ZM9 17.7803C9.36914 17.7803 9.62402 17.5518 9.62402 17.2002V8.00684C9.62402 7.65527 9.36914 7.41797 9 7.41797C8.63086 7.41797 8.38477 7.65527 8.38477 8.00684V17.2002C8.38477 17.5518 8.63086 17.7803 9 17.7803ZM11.5928 17.7891C11.9443 17.7891 12.1904 17.5518 12.1992 17.2002L12.4629 8.00684C12.4717 7.65527 12.2344 7.42676 11.8652 7.42676C11.5049 7.42676 11.2588 7.65527 11.25 8.00684L10.9863 17.2002C10.9775 17.543 11.2148 17.7891 11.5928 17.7891Z", 18, 21);
export class SvgRect extends Rect {
    constructor(config) {
        super();
        this.svg = SvgObj.defaultSvg;
        this.setConfigAttrs(config);
    }
    addConfig(config) {
        super.addConfig(config);
    }
    draw() {
        if (this.isVisible) {
            const posAndSize = TransformConversions.edgesToPosAndSize(this.absEdges);
            const path = new Path2D(this.svg.source);
            const path2 = new Path2D;
            const matrix = new DOMMatrix([posAndSize.size.w / this.svg.width, 0, 0, posAndSize.size.h / this.svg.height, posAndSize.pos.x, posAndSize.pos.y]);
            path2.addPath(path, matrix);
            this.canvas.ctx.fillStyle = this.color;
            this.canvas.ctx.fill(path2);
        }
    }
}
