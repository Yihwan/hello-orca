# Hello Orca 
```
git clone 
cd hello-orca 
yarn && yarn start
```

## 🐞 React Native + Node Debugging 
### Observed Issue 
* Expo runs on web, but not on iOS or Android. 
* On both iOS and Android, Expo fails silently (stuck on initial splash screen)but occasionally shows opaque errors without helpful stack trace. 
  * For iOS, tested on simulator + iPhone 11 Pro hardware. 
  * For Android, on Pixel 5 API 30 (Android 11.0, x86) simulator. 

### Hypothesis 
I think the root cause/fix is due to how core node modules are not available in RN. I've listed some attempted band-aid solutions below, but I wonder if somehow instructing webpack to use the "browser" config on various deps could be an option (e.g., [`solana-web3.js`](https://github.com/solana-labs/solana-web3.js/blob/master/rollup.config.js)).

### 🤕 Band-aid Solutions Attempted

**Can't handle .mjs files**
```
ERROR
21:09
./node_modules/@solana/buffer-layout-utils/lib/esm/web3.mjs 10:19-28
Can't import the named export 'PublicKey' from non EcmaScript module (only default export is available)

// and so on ...
```
* 🩹 Account for `.mjs` files in [webpack.config.js](./webpack.config.js).


**Can't handle .cjs files**
```
ERROR
21:14
While trying to resolve module `superstruct` from file `/Users/yihwankim/Desktop/hello-orca/node_modules/@solana/web3.js/lib/index.browser.cjs.js`, the package `/Users/yihwankim/Desktop/hello-orca/node_modules/superstruct/package.json` was successfully found. However, this package itself specifies a `main` module field that could not be resolved (`/Users/yihwankim/Desktop/hello-orca/node_modules/superstruct/lib/index.cjs`. 
```
* 🩹 Account for `.cjs` files in [metro.config.js](./metro.config.js).

**Core node modules unavailable**

```
ERROR
21:16
Unable to resolve module http from /Users/yihwankim/Desktop/hello-orca/node_modules/@orca-so/stablecurve/node_modules/@solana/web3.js/lib/index.cjs.js: http could not be found within the project or in these directories:
  node_modules/@orca-so/stablecurve/node_modules/@solana/web3.js/node_modules
  node_modules/@orca-so/stablecurve/node_modules
  node_modules
  21 | var superstruct = require('superstruct');
  22 | var rpcWebsockets = require('rpc-websockets');
> 23 | var http = require('http');
     |                     ^
  24 | var https = require('https');
  25 | var secp256k1 = require('secp256k1');
  26 | var createKeccakHash = require('keccak');
  ```
  * 🩹 Installed `node-libs-react-native` and configured in `metro.config.js`. Not sure where to include ` node-libs-react-native/globals`, tried in [`Main.tsx`](./Main.tsx), but that did not work. 

**Other misc/ephemeral errors I haven't dug into yet**
* All seem to be related to unavailable node modules though

```
TypeError: undefined is not an object (evaluating 'process.version.slice')
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:95:4 in reportException
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:141:19 in handleException
at node_modules/react-native/Libraries/Core/setUpErrorHandling.js:24:6 in handleError
at node_modules/@react-native/polyfills/error-guard.js:49:36 in ErrorUtils.reportFatalError
at node_modules/metro-runtime/src/polyfills/require.js:203:6 in guardedLoadModule
at http://192.168.1.196:19000/node_modules/expo/AppEntry.bundle?platform=android&dev=true&hot=false&strict=false&minify=false:337356:3 in global code

Invariant Violation: "main" has not been registered. This can happen if:
* Metro (the local dev server) is run from the wrong folder. Check if Metro is running, stop it and restart it in the current project.
* A module failed to load due to an error and `AppRegistry.registerComponent` wasn't called.
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:95:4 in reportException
at node_modules/react-native/Libraries/Core/ExceptionsManager.js:141:19 in handleException
at node_modules/react-native/Libraries/Core/setUpErrorHandling.js:24:6 in handleError
at node_modules/@react-native/polyfills/error-guard.js:49:36 in ErrorUtils.reportFatalError
info Opening /Users/yihwankim/Desktop/hello-orca/node_modules/readable-stream/lib/_stream_writable.js with code
```
* Something about readonly values being accessed? 
### Notes

* https://github.com/facebook/react-native/issues/30654
* https://medium.com/@generalpiston/how-to-react-native-w-web3-0x-js-0xconnect-39b3d6a4dca
* https://github.com/solana-labs/solana-web3.js/blob/master/rollup.config.js
* https://gist.github.com/parshap/e3063d9bf6058041b34b26b7166fd6bd