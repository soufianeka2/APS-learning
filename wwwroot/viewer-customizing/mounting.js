import { Sphere } from "./geometry/spher.js";
import { Scene } from "./scenes.js";

export function mountCustomGeometries(customGeometries) {
    customGeometries.forEach(customGeometry => {
        Scene.viewer.overlays.addMesh(customGeometry[0].sphereMesh, customGeometry[1]);
    });
}
export function dismountCustomGeometries(customGeometries, removeScene = false) {
    customGeometries.forEach(customGeometry => {
        Scene.viewer.overlays.removeMesh(customGeometry[0].sphereMesh, customGeometry[1]);
        Sphere.destroySphere.call(customGeometry[0]);
        if (removeScene) {
            Scene.destroyScene(customGeometry[1]);
        }
    });
}
