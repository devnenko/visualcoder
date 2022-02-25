export class KeypressHandler {
    static init() {
        document.addEventListener('keydown', this.logKey.bind(this));
    }
    static subscribe(object) {
        this.callbackObjects.push(object);
    }
    static unsubscribe(object) {
        if (this.callbackObjects.indexOf(object) != -1) {
            this.callbackObjects.splice(this.callbackObjects.indexOf(object), 1);
        }
    }
    static logKey(e) {
        for (const obj of this.callbackObjects) {
            obj.onKeyPress(e.key);
        }
    }
}
KeypressHandler.callbackObjects = [];
