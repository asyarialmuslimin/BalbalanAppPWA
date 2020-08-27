const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                    loader: "style-loader"
                },
                {
                    loader: "css-loader"
                }
            ]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [{
                from: './src/assets/svg/*',
                to: 'assets/svg/',
                flatten: true,
            }, {
                from: './src/icon.png',
                to: 'assets/icons/icon.png'
            }],
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new WebpackPwaManifest({
            name: 'Balbalan App',
            short_name: 'Balbalan',
            description: 'Aplikasi Informasi Sepakbola',
            background_color: '#3498db',
            theme_color: '#2980b9',
            crossorigin: 'use-credentials',
            orientation: 'portrait',
            display: 'standalone',
            start_url: '/index.html',
            gcm_sender_id: '1034765545942',
            ios: {
                'apple-mobile-web-app-title': 'BalbalanApp',
                'apple-mobile-web-app-status-bar-style': 'black-translucent'
            },
            icons: [{
                    src: path.resolve('src/icon.png'),
                    sizes: [120, 152, 167, 180, 1024],
                    destination: path.join('assets', 'icons', 'ios'),
                    ios: true
                },
                {
                    src: path.resolve('src/icon.png'),
                    size: 1024,
                    destination: path.join('assets', 'icons', 'ios'),
                    ios: 'startup'
                },
                {
                    src: path.resolve('src/icon.png'),
                    sizes: [36, 48, 72, 96, 144, 192, 512],
                    destination: path.join('assets', 'icons', 'android')
                }
            ]
        }),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: "./src/sw.js",
            swDest: "sw.js",
            exclude: [
                /\.map$/,
                /manifest$/,
                /sw\.js$/,
            ],
        })
    ]
}