# vscode-weather README

about the vscode-weather

## 开发环境准备

  - [Visual Studio Code](https://code.visualstudio.com/)

  - [Node.js](https://nodejs.org/zh-cn/)

  - [npm](https://www.npmjs.com/)

  - Git

  - 官方脚手架工具 [Yeoman](https://yeoman.io/) 和 [generator-code](https://www.npmjs.com/package/generator-code)
    ```npm install -g yo generator-code```

  - 插件打包和发布工具 [vsce](https://github.com/microsoft/vscode-vsce)
    ```npm install -g vsce```

## 脚手架使用

  1. 执行以下命令
  ```
  yo code

  # ? What type of extension do you want to create? New Extension (TypeScript)
  # ? What's the name of your extension? HelloWorld
  ### Press <Enter> to choose default for all options below ###

  # ? What's the identifier of your extension? helloworld
  # ? What's the description of your extension? LEAVE BLANK
  # ? Initialize a git repository? Yes
  # ? Bundle the source code with webpack? No
  # ? Which package manager to use? npm
  ```

  2. 选择 New Extension 类型，然后依次填写插件名称、描述、包管理工具等基础信息。
  > PS：脚手架工具支持创建插件（New Extension）、主题（New Color Theme）、新语言支持（New Language Support）、代码片段（New Code Snippets）、键盘映射（New Keymap）、插件包（New Extension Pack）。以上不同类型的脚手架模板只是侧重的预设功能不同，其本质还是 VSCode 插件。

  3. 运行
  ```
  code ./helloworld
  ```
  在编辑器中，按`F5`。这将在新的“扩展开发主机”窗口中编译并运行扩展。
  在新窗口的命令面板中运行Hello World命令

## 插件基本目录结构

.
├── src
	├── extension.ts  # 插件执行入口文件
├── node_modules
├── package.json  # 声明当前插件相关信息
├── README.md  # 插件使用说明
└── vsc-extension-quickstart.md

1. package.json：插件的声明文件，包含 2 个重要配置项 activationEvents、contributes。

  - activationEvents 用于定义插件何时被加载/激活。例子中用到的是 onCommand，在 Hello World 命令被调用时，插件才会被激活。目前支持 9 种激活事件：

  - onLanguage:${language} 打开特定语言文件时

  - onCommand:${command} 调用某个 VSCode 命令时

  - onDebug Debug 时

  - workspaceContains:${toplevelfilename} 当打开包含某个命名规则的文件夹时

  - onFileSystem:${scheme} 以某个协议（ftp/sftp/ssh 等）打开文件或文件夹时

  - onView:${viewId} 指定 id 的视图展开时

  - onUri 插件的系统级 URI 打开时

  - onWebviewPanel webview 触发时

  - * VSCode 启动时。不建议使用，性能上会受到一定影响。

```
{
	// 插件的名字，应全部小写，不能有空格
	"name": "vscode-plugin",
	// 插件的友好显示名称，用于显示在应用市场，支持中文
	"displayName": "VSCode插件",
	// 描述
	"description": "VSCode插件",
	// 关键字，用于应用市场搜索
	"keywords": ["vscode", "plugin"],
	// 版本号
	"version": "0.0.1",
	// 发布者，如果要发布到应用市场的话，这个名字必须与发布者一致
	"publisher": "CooperL",
	// 表示插件最低支持的vscode版本
	"engines": {
		"vscode": "^1.54.0"
	},
	// 插件应用市场分类，可选值： [Programming Languages, Snippets, Linters, Themes, Debuggers, Formatters, Keymaps, SCM Providers, Other, Extension Packs, Language Packs]
	"categories": [
		"Other"
	],
	// 插件图标，至少128x128像素
	"icon": "images/icon.png",
	// 扩展的激活事件数组
	"activationEvents": [
		"onCommand:vscode-weather.helloWorld",
    "onCommand:yamimeal",
    "onView:weather.guangdong",
    "onCommand:weather.watch"
	],
	// 插件的主入口
	"main": "./out/extension.js",
	// 贡献点，整个插件最重要最多的配置项
	"contributes": {
		// 命令
		"commands": [
      {
        "command": "vscode-weather.helloWorld",
        "title": "Hello World"
      },
      {
        "command": "yamimeal",
        "title": "Hello Yamimeal"
      },
      {
        "command": "weather.watch",
        "title": "查看天气"
      }
    ],
    "viewsContainers": {
      "activitybar": [
        {
          "id": "weather",
          "title": "实时天气",
          "icon": "./images/weather.svg"
        }
      ]
    },
    "views": {
      "weather": [
        {
          "id": "weather.guangdong",
          "name": "广东省"
        }
      ]
    }
	},
	"scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./",
    "watch": "tsc -watch -p ./",
    "pretest": "npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "node ./out/test/runTest.js"
  },
  "devDependencies": {
    "@types/glob": "^7.1.3",
    "@types/mocha": "^8.0.4",
    "@types/node": "^12.11.7",
    "@types/vscode": "^1.54.0",
    "@typescript-eslint/eslint-plugin": "^4.14.1",
    "@typescript-eslint/parser": "^4.14.1",
    "eslint": "^7.19.0",
    "glob": "^7.1.6",
    "mocha": "^8.2.1",
    "typescript": "^4.1.3",
    "vscode-test": "^1.5.0"
  },
  "dependencies": {
    "axios": "^0.21.1"
  },
  "icon": "./images/weather.png",
  "repository": {
    "type": "git",
    "url": "https://github.com/276259822/vscode-weather"
  }
}
```

## 打包、发布、升级

1. 安装```npm install -g vsce```，用于打包，发布和管理VS代码扩展的命令行工具。
```
npm install -g vsce
vsce package
```

2. 发布
  把打包好的vsix文件发布到[应用市场](https://marketplace.visualstudio.com/)

3. 升级
  如果修改了插件代码想要重新发布，只需要修改版本号然后重新执行```vsce package```即可。

