const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('openhands-hello-world.helloWorld', function () {
        vscode.window.showInformationMessage('Hello from TheGhost!');
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
