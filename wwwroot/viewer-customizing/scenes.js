export class Scene {
    static viewer = null;
    static createScene(sceneName) {
        if (!this.viewer.overlays.hasScene(sceneName)) {
            return this.viewer.overlays.addScene(sceneName);
        } else {
            return false;
        }
    }
    static destroyScene(sceneName) {
        if (this.viewer.overlays.hasScene(sceneName)) {
            return this.viewer.overlays.removeScene(sceneName);
        } else {
            return false;
        }
    }
}
