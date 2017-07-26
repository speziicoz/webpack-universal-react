const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = {
    devtool: "source-map",
    context: __dirname,
    entry: {
        client: path.resolve("src/client/index.js")
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("public/static")
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: "raw-loader"
            },
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
                    use: ["css-loader?sourceMap", "fast-sass-loader"]
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("src/views/index.ejs"),
            filename: "index.ejs",
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(true),
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
}