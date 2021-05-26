import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer"
import { IpcChannelInterface } from "./ipc/ipcChannelInterface"
import {
  ReadEventsDirChannel,
  ReadEventsFileChannel,
} from "./ipc/fileReadWriteChannel"

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// if (require("electron-squirrel-startup")) {
//   app.quit()
// }

class Main {
  private mainWindow?: BrowserWindow

  init(ipcChannels: IpcChannelInterface[]) {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", () => {
      this.installDevtools()
      this.createWindow()
    })
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    app.on("window-all-closed", this.onWindowAllClosed)
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on("activate", this.onActivate)

    this.registerIpcChannels(ipcChannels)
  }

  private createWindow = () => {
    // Create the browser window.
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 600,
      backgroundColor: "#fff",
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        allowRunningInsecureContent: false,
        preload: path.join(__dirname, "editorPreload.js"),
      },
    })
    void this.mainWindow.loadFile(path.join(__dirname, "index.html"))
  }

  private installDevtools = () => {
    installExtension(VUEJS3_DEVTOOLS, {
      loadExtensionOptions: { allowFileAccess: true },
      forceDownload: false,
    })
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log("An error occurred: ", err))
  }

  private onWindowAllClosed = () => {
    if (process.platform !== "darwin") {
      app.quit()
    }
  }

  private onActivate = () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow()
    }
  }

  private registerIpcChannels(ipcChannels: IpcChannelInterface[]) {
    ipcChannels.forEach((channel) =>
      ipcMain.on(channel.name, (event, request) =>
        channel.handle(event, request)
      )
    )
  }
}

new Main().init([new ReadEventsDirChannel(), new ReadEventsFileChannel()])
