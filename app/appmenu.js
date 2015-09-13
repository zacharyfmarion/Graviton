var remote = require('remote');
var Menu = remote.require('menu');
var BrowserWindow = remote.require('browser-window');
var app = remote.require('app');
var wrapper = document.querySelector('webview-wrapper');

exports.generateMenu = function(){
	return Menu.buildFromTemplate([
		// App menu
		{
			label: 'Graviton',
			submenu: [
				{
					label: 'Preferences',
					click: function(){
						// open tab with preferences page
						console.log('preferences');
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					click: function(){
						app.quit();
					},
					accelerator: 'Command+Q'
				}
			]
		},
		// File Menu
		{
			label: 'File',
			submenu: [
				{
					label: 'New Tab',
					click: function(){
						wrapper.newTab();
					}
				},
				{
					label: 'New Window',
					click: function(){
						var newWindow = new BrowserWindow({width: 1200, height: 800, 'min-width': 800, 'min-height': 500, frame: false});
						newWindow.loadUrl('file://' + __dirname + '/index.html');
					},
					accelerator: 'Command+Shift+N'
				},
				{
					type: 'separator'
				},
				{
					label: 'Print',
					submenu: [
						{
							label: 'Print Webpage',
							click: function(){
								wrapper.printWebPage();
							},
							accelerator: 'Command+P'
						},
						{
							label: 'Print to PDF',
							click: function(){
								wrapper.printToPdf();
							},
							accelerator: 'Command+Shift+P'
						}
					]
				}
			]
		},
		// Edit Menu
		{
			label: 'Edit',
			submenu: [
				{
					label: 'Undo',
					click: function(){
						wrapper.undo();
					},
					accelerator: 'Command+Shift+Z'
				},
				{
					label: 'Redo',
					click: function(){
						wrapper.redo();
					},
					accelerator: 'Command+Z'
				},
				{
					type: 'separator'
				},
				{
					label: 'Cut',
					click: function(){
						wrapper.cut();
					},
					accelerator: 'Command+X'
				},
				{
					label: 'Copy',
					click: function(){
						wrapper.copy();
					},
					accelerator: 'Command+C'
				},
				{
					label: 'Paste',
					click: function(){
						wrapper.paste();
					},
					accelerator: 'Command+V'
				},
				{
					label: 'Paste to match style',
					click: function(){
						wrapper.pasteAndMatchStyle();
					},
					accelerator: 'Command+Shift+V'
				},
				{
					label: 'Delete',
					click: function(){
						wrapper.delete();
					}
				},
				{
					label: 'Select All',
					click: function(){
						wrapper.selectAll();
					},
					accelerator: 'Command+A'
				},
			]
		},
		// View Menu
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					click: function(){
						wrapper.reload();
					},
					accelerator: 'Command+R'
				},
				{
					label: 'Stop',
					click: function(){
						wrapper.stop();
					}
				}
			]
		},
		// History
		{
			label: 'History',
			submenu: [
				{
					label: 'Clear History',
					click: function(){
						wrapper.clearHistory();
					}
				}
			]
		},
		// Window
		{
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					click: function(){
						BrowserWindow.getFocusedWindow().minimize();
					}
				}
			]
		},
		{
			label: 'Developer',
			submenu: [
				{
					label: 'Toggle Graviton DevTools',
					click: function(){
						BrowserWindow.getFocusedWindow().openDevTools();
					}
				},
				{
					label: 'Toggle Chrome DevTools',
					click: function(){
						wrapper.toggleConsole();
					}
				}
			]
		}
	]);
};

exports.setMenu = function(menu){
	Menu.setApplicationMenu(menu);
};
