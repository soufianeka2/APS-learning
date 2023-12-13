/**
 * NOTES TO BE RESPECTED
 * 
 * This function MUST be called only after:
 * 1- The wanted extensions were registered (see register.js)
 * 2- The viewer instance was successfully initialized (see viewer.js).
 */
import { ToolbarExtension } from "./ToolbarExtension.js";

export function loadCustomExtensions() {
    NOP_VIEWER.loadExtension(ToolbarExtension.name);
}
