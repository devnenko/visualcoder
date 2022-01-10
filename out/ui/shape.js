export var EObjectType;
(function (EObjectType) {
    EObjectType[EObjectType["Normal"] = 0] = "Normal";
    EObjectType[EObjectType["HzBox"] = 1] = "HzBox";
    EObjectType[EObjectType["VtBox"] = 2] = "VtBox";
})(EObjectType || (EObjectType = {}));
export function instanceOfShape(object) {
    return object.discriminator1 === 'IShape';
}
