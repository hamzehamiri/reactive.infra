'use strict';

// const path = require('path');
// const JavaScriptObfuscator = require('webpack-obfuscator');
//
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//
// const webpack = require('webpack');
// const WebpackBar = require('webpackbar');
//
// const JscramblerWebpack = require('jscrambler-webpack-plugin');

// module.exports = {
//     entry: {
//         bundle: './JS/MainEntry.js'
//     },
//     optimization: {
//         minimizer: [new UglifyJsPlugin({
//             uglifyOptions: {
//                 warnings: false,
//                 parse: {},
//                 compress: {},
//                 mangle: true, // Note `mangle.properties` is `false` by default.
//                 output: null,
//                 toplevel: false,
//                 nameCache: null,
//                 ie8: false,
//                 keep_fnames: false,
//             },
//         })]
//     },
//     plugins: [
//         new WebpackBar()
//     ]
// };

// module.exports = {
//     entry: {
//         bundle: './JS/MainEntry.js'
//     },
//     mode: 'none',
//     // optimization: {
//     //     mangleWasmImports: true
//     // },
//     devtool: 'cheap-module-eval-source-map',
//     performance: {
//         hints: false
//     },
//     optimization: {
//         namedModules: true,
//         namedChunks: true,
//         nodeEnv: 'none',
//         flagIncludedChunks: false,
//         occurrenceOrder: false,
//         sideEffects: true,
//         usedExports: false,
//         concatenateModules: false,
//         splitChunks: {
//             hidePathInfo: false,
//             minSize: 10000,
//             maxAsyncRequests: Infinity,
//             maxInitialRequests: Infinity,
//         },
//         noEmitOnErrors: false,
//         checkWasmTypes: false,
//         minimize: true,
//     }
// };

// module.exports = [
//     // "cheap-eval-source-map",
//     // "cheap-module-eval-source-map",
//     // "cheap-module-source-map",
//     // "cheap-source-map"
//     "eval"
//     // "eval-source-map",
//     // "hidden-source-map",
//     // "inline-source-map",
//     // "nosources-source-map",
//     // "source-map"
// ].map(devtool => ({
//     mode: "development",
//     entry: {
//         bundle: './JS/MainEntry.js'
//     },
//     output: {
//         path: path.join(__dirname, "dist"),
//         filename: `./[name]-${devtool}.js`
//     },
//     devtool,
//     optimization: {
//         runtimeChunk: true
//     }
// }));

// module.exports = {
//     entry: {
//         'abc': './JS/WebSocketSample.js',
//         'cde': './JS/WebSocketSample.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].js' // output: abc.js, cde.js
//     },
//     plugins: [
//         new JavaScriptObfuscator({
//             compact: true,
//             controlFlowFlattening: false,
//             deadCodeInjection: false,
//             debugProtection: false,
//             debugProtectionInterval: false,
//             disableConsoleOutput: true,
//             identifierNamesGenerator: 'hexadecimal',
//             log: false,
//             renameGlobals: false,
//             rotateStringArray: true,
//             selfDefending: true,
//             stringArray: true,
//             stringArrayEncoding: false,
//             stringArrayThreshold: 0.75,
//             unicodeEscapeSequence: false
//         }, ['abc.js']) ,
//         new JavaScriptObfuscator({
//             compact: true,
//             controlFlowFlattening: false,
//             deadCodeInjection: false,
//             debugProtection: false,
//             debugProtectionInterval: false,
//             disableConsoleOutput: true,
//             identifierNamesGenerator: 'hexadecimal',
//             log: false,
//             renameGlobals: false,
//             rotateStringArray: true,
//             selfDefending: true,
//             stringArray: true,
//             stringArrayEncoding: false,
//             stringArrayThreshold: 0.75,
//             unicodeEscapeSequence: false
//         }, ['cde.js'])
//     ]
// };
// module.exports = {
//     entry: {
//         bundle: './JS/MainEntry.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].js' // output: abc.js, cde.js
//     },
//     plugins: [
//         new JavaScriptObfuscator({
//             compact: true,
//             controlFlowFlattening: false,
//             deadCodeInjection: false,
//             debugProtection: false,
//             debugProtectionInterval: false,
//             disableConsoleOutput: true,
//             identifierNamesGenerator: 'hexadecimal',
//             log: true,
//             renameGlobals: true,
//             rotateStringArray: true,
//             selfDefending: true,
//             stringArray: true,
//             stringArrayEncoding: false,
//             stringArrayThreshold: 0.75,
//             unicodeEscapeSequence: false
//         }, [])
//     ]
// };

// module.exports = {
//     entry: {
//         app: './JS/MainEntry.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'),
//         filename: '[name].js' // output: abc.js, cde.js
//     },
//     plugins: [
//         new JscramblerWebpack({
//             enable: true, // optional, defaults to true
//             chunks: ['protected'], // optional, defaults to all chunks
//             params: [],
//             applicationTypes: {}
//         })
//     ]
// };


const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
    entry: {
        bundle: './JS/MainEntry.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js' // output: abc.js, cde.js
    },
    plugins: [
        new JavaScriptObfuscator({
            rotateStringArray: true
        }, ['abc.js'])
    ]
};