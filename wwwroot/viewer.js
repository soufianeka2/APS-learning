// import * as Autodesk from "@types/forge-viewer";

import { ToolbarExtension } from "./viewer-ext/ToolbarExtension.js";
import { registerCustomExtensions } from "./viewer-ext/register.js";

async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok) {
            throw new Error(await resp.text());
        }
        const { access_token, expires_in } = await resp.json();
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        let extensions = [
            'Autodesk.DocumentBrowser',
        ];
        Autodesk.Viewing.Initializer({ getAccessToken }, function () {
            const config = {
                extensions,
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }
            viewer.setTheme('light-theme');
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry())); // load the default model
            // use custom code to determine which one to load.
            let viewables = doc.getRoot().search({ 'type': 'geometry' });
            resolve(viewer.loadDocumentNode(doc, viewables[0]));
        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });
        }
        viewer.setLightPreset(0);
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
