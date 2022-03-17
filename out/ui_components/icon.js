import { ImageRect } from "../ui/image_rect.js";
export function AddIcon(base) {
    return class extends base {
        constructor(...args) {
            super(...args);
            this.idleIcon = ImageRect.defaultImage;
            this.pressedIcon = ImageRect.defaultImage;
            this.imageRect = new ImageRect({ image: this.idleIcon });
            this.setConfigAttrs(args);
        }
        addConfig(config) {
            super.addConfig(config);
        }
    };
}
