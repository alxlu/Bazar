# Bazar Setup Instructions

## Node.js and npm
Make sure you have a somewhat recent version of node.js and npm installed.

## Installing Dependencies
If you only want to run the app, you can save some time and disk space by running `npm install --production` inside the \Bazar\app folder and \Bazar\extension folder. If you want to modify the source, you may want to install the dev dependencies. Just run `npm install`. The project uses gulp as a build system for both the extension and the app.

## App

### Developer Unlock
Before getting started, please developer unlock your machine if it isn't already (I'm not sure if this is necessary on newer builds). If needed, you can use the included unlock.reg file.

### Custom URL Protocol Handler
If you've extracted the files to `C:\Bazar`, you can just run the included `handler.reg`. Otherwise, you need to edit the file and replace the entries under `[HKEY_CLASSES_ROOT\Bazar\shell\open\command]` and `[HKEY_CLASSES_ROOT\Bazar\DefaultIcon]` to point to the \Bazar\app\nw.exe file. (Make sure the `\`'s are escaped).

### Verify
Once you are finished registering the protocol handler and installing the depenedencies, try running nw.exe to see if it loads properly. (It should only display the splash screen). You can also try launching it using the custom protocol handler by launching chrome and typing in bazar:// into the url bar.

## Extension

### Chrome Developer Unlock
In Chrome, enter `chrome://extensions` in the url bar. Then in the top right enable `Developer Mode`. Click on 'load unpacked extension...' and locate the \Bazar\extension\build folder.
