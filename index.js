const electron = require("electron");
const { shell, app, BrowserWindow, session } = electron;
const HOMEPAGE = "https://web.whatsapp.com/";

app.on("ready", () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders["User-Agent"] =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36";
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  window = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: false,
    },
  });
  window.setMenuBarVisibility(false);
  window.loadURL(HOMEPAGE);

  window.webContents.on("new-window", (ev, url) => {
    parts = url.split("/");
    if (parts[0] + "//" + parts[2] != HOMEPAGE) {
      ev.preventDefault();
      shell.openExternal(url);
    }
  });

  window.on("closed", () => {
    window = null;
  });
});
