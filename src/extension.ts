"use strict";

import * as vscode from 'vscode';

import { Container } from './container';

export function activate(context: vscode.ExtensionContext) {
	const extensionRoot = vscode.Uri.file(context.extensionPath);

	context.subscriptions.push(vscode.window.registerWebviewEditorProvider(
		"htmlaser.container",
		{ async resolveWebviewEditor(resource: vscode.Uri, editor: vscode.WebviewEditor): Promise<void> {
			new Container(extensionRoot, resource, editor);
		} },
		{ retainContextWhenHidden: true }
	));
}

export function deactivate() {}
