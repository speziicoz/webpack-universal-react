const nodeExternals = require("webpack-node-externals")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = {
    target: "node",
    context: __dirname,
    entry: {
        server: path.resolve("src/server/server.js")
    },
    output: {
        filename: "server.js",
        path: path.resolve("build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react", "es2015"]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "fast-sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(false),
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    externals: [nodeExternals()]
}