const { app, Menu, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

let win

const template = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Game', click() {
                    win.webContents.send('New Game', '')
                }
            }
        ]
    }
]

function createWindow() {
    win = new BrowserWindow({ width: 600, height: 600 })

    win.loadURL(url.format({
        pathname: path.join(__dirname, '../index.html'),
        protocol: 'file:',
        slashes: true
    }))

    win.setMenu(null)
    var menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
