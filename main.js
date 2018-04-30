const {app, BrowserWindow} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain}=require('electron')

let win

function createWindow() {
   win = new BrowserWindow({width: 800, height: 600})
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))

   win.openDevTools()
}

ipcMain.on('client-sender',(event,arg)=>{
  console.log(arg);

  event.sender.send('server-sender','async hello client')

})

ipcMain.on('synchronous-message',(event,arg)=>{
  console.log(arg);

  //Synchronous event emmision
  event.returnValue='sync hello client'
})


app.on('ready', createWindow)
