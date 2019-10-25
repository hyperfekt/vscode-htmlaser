"use strict";

import * as vscode from 'vscode';
import * as path from 'path';

export class Container implements vscode.Disposable {

    private subscriptions: vscode.Disposable[];

    constructor(
        private readonly extensionRoot: vscode.Uri,
        private readonly resource: vscode.Uri,
        private readonly webviewEditor: vscode.WebviewEditor
    ) {
        this.subscriptions = [];

        const resourceRoot = resource.with({
			path: resource.path.replace(/\/[^\/]+?\.\w+$/, '/'),
        });

        webviewEditor.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                resourceRoot,
                extensionRoot
            ]
        };

        // load HTML appended with a script-injecting tag into webview
        vscode.workspace.openTextDocument(resource).then((document) => {
            webviewEditor.webview.html = document.getText() + `
            <script
                type="text/javascript"
                src="${webviewEditor.webview.asWebviewUri(extensionRoot.with({ path: extensionRoot.path + '/resources/pump.js' }))}"
            </script>`;
        });

        this.register(webviewEditor.onDidDispose(() => this.dispose()));

    }

    register(disposable: vscode.Disposable) {
        this.subscriptions.push(disposable);
    }

    dispose() {
        this.subscriptions.forEach(x => x.dispose());
    }
}
