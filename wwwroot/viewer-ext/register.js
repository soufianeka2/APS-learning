import { ToolbarExtension } from "./ToolbarExtension.js";

export function registerCustomExtensions() {
    return Autodesk.Viewing.theExtensionManager.registerExtension(ToolbarExtension.name, ToolbarExtension);
}
