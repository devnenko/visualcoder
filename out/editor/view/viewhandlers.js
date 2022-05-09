import { TextView } from "../text/text_view.js";
export var FileTypeE;
(function (FileTypeE) {
    FileTypeE["text"] = "text";
    FileTypeE["empty"] = "empty";
})(FileTypeE || (FileTypeE = {}));
export const fileTypes = [
    { type: FileTypeE.text, view: TextView }
];
