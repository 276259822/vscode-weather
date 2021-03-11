// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { CityDataProvider, ICity } from './provider';
import { getWeatherData } from './request';

function getWebviewContent(city: ICity, res: any) {
  return `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
          </head>
          <body>
            <div>${city.name} ${res.now.temp}摄氏度</div>
          </body>
          </html>`;
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vscode-weather" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('vscode-weather.helloWorld', () => {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('你好!');
  });

  context.subscriptions.push(disposable);

  context.subscriptions.push(vscode.commands.registerCommand('yamimeal', () => {
    vscode.window.showInformationMessage('Hello Yamimeal!');
  }));

  const barItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
  barItem.show();

  // const panel = vscode.window.createWebviewPanel('weather', '实时天气', vscode.ViewColumn.One, {});

  context.subscriptions.push(vscode.commands.registerCommand('weather.watch', async (city: ICity) => {
    if (city?.id) {
      const res = await getWeatherData(city.id);
      if (res.code * 1 === 200) {
        barItem.text = `${city.name} ${res.now.temp}摄氏度`;
        // panel.webview.html = getWebviewContent(city, res);
      }
    }
  }));

  vscode.window.registerTreeDataProvider('weather.guangdong', new CityDataProvider());
}

// this method is called when your extension is deactivated
export function deactivate() { }
