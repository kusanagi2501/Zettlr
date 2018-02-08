// Main menu file

const {Menu} = require('electron');
const electron = require('electron');
const app = electron.app
const {trans} = require('../common/lang/i18n.js');

class ZettlrMenu
{
    constructor(parent)
    {
        this.parent = parent;
        this.template = [
            {
                label: trans('menu.labels.file'),
                submenu: [
                    {
                        label: trans('menu.new_file'),
                        accelerator: 'CmdOrCtrl+N',
                        click (item, focusedWindow) {
                            // Trigger new file in current directory
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'file-new'});
                        }
                    },
                    {
                        label: trans('menu.new_dir'),
                        accelerator: 'CmdOrCtrl+Shift+N',
                        click (item, focusedWindow) {
                            // Trigger new folder in current directory
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'dir-new'});
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.open'),
                        accelerator: 'CmdOrCtrl+O',
                        click (item, focusedWindow) {
                            // Trigger open folder action
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'dir-open'});
                        }
                    },
                    {
                        label: trans('menu.save'),
                        accelerator: 'CmdOrCtrl+S',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'file-save'});
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.export'),
                        accelerator: 'CmdOrCtrl+E',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'export'});
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.rename_file'),
                        accelerator: 'CmdOrCtrl+R',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'file-rename'});
                        }
                    },
                    {
                        label: trans('menu.rename_dir'),
                        accelerator: 'CmdOrCtrl+Shift+R',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'dir-rename'});
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.delete_file'),
                        accelerator: (process.platform === 'darwin') ? 'Cmd+Backspace': 'Delete',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'file-delete'});
                        }
                    }, {
                        label: trans('menu.delete_dir'),
                        accelerator: (process.platform === 'darwin') ? 'Cmd+Shift+Backspace': 'Ctrl+Delete',
                        click(item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'dir-delete'});
                        }
                    }
                ]
            },
            {
                label: trans('menu.labels.edit'),
                submenu: [
                    { label: trans('menu.undo'), role: 'undo' },
                    { label: trans('menu.redo'), role: 'redo' },
                    { type: 'separator' },
                    { label: trans('menu.cut'), role: 'cut' },
                    { label: trans('menu.copy'), role: 'copy' },
                    { label: trans('menu.paste'), role: 'paste' },
                    { label: trans('menu.select_all'), role: 'selectall' },
                    { type: 'separator' },
                    {
                        label: trans('menu.find_file'),
                        accelerator: 'CmdOrCtrl+F',
                        click(item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'file-find'});
                        }
                    },
                    {
                        label: trans('menu.find_dir'),
                        accelerator: 'CmdOrCtrl+Shift+F',
                        click(item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', { 'command': 'dir-find'});
                        }
                    }
                ]
            },
            {
                label: trans('menu.labels.view'),
                submenu: [
                    {
                        label: trans('menu.reload'),
                        accelerator: 'CmdOrCtrl+Y',
                        click (item, focusedWindow) {
                            if (focusedWindow) focusedWindow.reload();
                        }
                    },
                    {
                        label: trans('menu.toggle_devtools'),
                        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
                        click (item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.toggle_theme'),
                        accelerator: 'CmdOrCtrl+Alt+L',
                        type: 'checkbox',
                        checked : this.parent.parent.config.get('darkTheme'),
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.send('message', { 'command': 'toggle-theme'});
                        }
                    },
                    {
                        label: trans('menu.toggle_snippets'),
                        accelerator: 'CmdOrCtrl+Alt+S',
                        type: 'checkbox',
                        checked: this.parent.parent.config.get('snippets'),
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.send('message', { 'command': 'toggle-snippets'});
                        }
                    },
                    { type: 'separator' },
                    {
                        label: trans('menu.toggle_directories'),
                        accelerator: 'CmdOrCtrl+1',
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.send('message', { 'command': 'toggle-directories'});
                        }
                    },
                    {
                        label: trans('menu.toggle_preview'),
                        accelerator: 'CmdOrCtrl+2',
                        click(item, focusedWindow) {
                            if (focusedWindow) focusedWindow.webContents.send('message', { 'command': 'toggle-preview'});
                        }
                    },
                    { type: 'separator' },
                    { label: trans('menu.reset_zoom'), role: 'resetzoom' },
                    { label: trans('menu.zoom_in'), role: 'zoomin' },
                    { label: trans('menu.zoom_out'), role: 'zoomout' },
                    { type: 'separator' },
                    { label: trans('menu.toggle_fullscreen'), role: 'togglefullscreen' }
                ]
            },
            {
                label: trans('menu.labels.window'),
                role: 'window',
                submenu: [
                    { label: trans('menu.win_minimize'), role: 'minimize' },
                    { label: trans('menu.win_close'), role: 'close' }
                ]
            },
            {
                label: trans('menu.labels.help'),
                role: 'help',
                submenu: [
                    {
                        label: trans('menu.learn_more'),
                        click () { require('electron').shell.openExternal('https://www.zettlr.com/') }
                    }
                ]
            }
        ];
        // END TEMPLATE

        if(process.platform != 'darwin') {
            // On windows and linux add a quit option.
            // On macOS this is automatically added to the "name"-submenu, which will
            // be added in the next step.
            this.template[0].submenu.push({
                type: 'separator',
            },{
                label: trans('menu.preferences'),
                accelerator: 'CmdOrCtrl+,',
                click (item, focusedWindow) {
                    if(focusedWindow) focusedWindow.webContents.send('message', {'command': 'open-preferences'});
                }
            },
            { type: 'separator' },
            { accelerator: 'Ctrl+Q', label: trans('menu.quit'), role: 'quit' });
        }
        // END WIN/LINUX AMENDMENTS

        if (process.platform === 'darwin') {
            this.template.unshift({
                label: app.getName(),
                submenu: [
                    { label: trans('menu.about', app.getName()), role: 'about' },
                    {
                        label: trans('menu.preferences'),
                        accelerator: 'CmdOrCtrl+,',
                        click (item, focusedWindow) {
                            if(focusedWindow) focusedWindow.webContents.send('message', {'command': 'open-preferences'});
                        }
                    },
                    { type: 'separator' },
                    { label: trans('menu.services'), role: 'services', submenu: [] },
                    { type: 'separator' },
                    { label: trans('menu.hide'), role: 'hide' },
                    { label: trans('menu.hide_others'), role: 'hideothers' },
                    { label: trans('menu.unhide'), role: 'unhide' },
                    { type: 'separator' },
                    { label: trans('menu.quit'), role: 'quit' }
                ]
            });
            // Edit menu.
            this.template[2].submenu.push(
                { type: 'separator' },
                {
                    label: trans('menu.speech'),
                    submenu: [
                        { label: trans('menu.start_speaking'), role: 'startspeaking' },
                        { label: trans('menu.stop_speaking'), role: 'stopspeaking' }
                    ]
                }
            )
            // Window menu.
            this.template[4].submenu = [
                {
                    label: trans('menu.win_close'),
                    accelerator: 'CmdOrCtrl+W',
                    role: 'close'
                },
                {
                    label: trans('menu.win_minimize'),
                    accelerator: 'CmdOrCtrl+M',
                    role: 'minimize'
                },
                { label: trans('menu.zoom'), role: 'zoom' },
                { type: 'separator' },
                { label: trans('menu.all_front'), role: 'front' }
            ]
        }
        // END macOS AMENDMENTS

        // Set menu
        Menu.setApplicationMenu(Menu.buildFromTemplate(this.template));
    }
}

module.exports = ZettlrMenu;