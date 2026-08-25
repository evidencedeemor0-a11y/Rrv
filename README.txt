USD Account Demo App
====================

Files
-----
index.html    Main app entry point.
style.css     App styling and responsive layout.
script.js     App interactions and local demo logic.
manifest.json PWA manifest.
README.txt    This file.

Run
---
Open index.html in a modern browser.

For full PWA/manifest behavior, serve the folder through a local web server instead of file://.

Controls
--------
- Add Cash: adds a USD amount to the balance and ledger.
- Send Money: subtracts a USD amount, with insufficient-balance validation.
- Exchange: shows a local exchange-rate preview.
- Menu / Back: local demo feedback.
- Press T: toggle light/dark app appearance.
- Escape or Cancel: close the amount dialog.

All financial actions are local demo interactions only. No real transactions or network calls are made.
