const { app, BrowserWindow } = require("electron");

const path = require("node:path");

// Function to make the main window.
const createWindow = () => {
  const win = new BrowserWindow({
    width: 600,
    height: 700,

    maxWidth: 600,
    minWidth: 500,
    maxHeight: 700,
    minHeight: 600,

    center: true,
    resizable: true,
    maximizable: false,

    titleBarStyle: "hidden",
    titleBarOverlay: {
        color: "#2b2d30",
        symbolColor: "#dfe1e5",
        height: 40,
    },

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  win.loadFile("src/web/index.html");
};

// Quit the app when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Launch the app when everything is ready.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
