const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = {
    target: "node",
    context: __dirname,
    entry: {
        server: path.resolve(__dirname, "../src/server/server.js")
    },
    output: {
        filename: "server.js",
        path: path.join(__dirname, "../build")
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
                test: /\.ejs$/,
                use: "raw-loader"
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
    externals: [nodeExternals()],
    plugins: [
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(false),
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
}