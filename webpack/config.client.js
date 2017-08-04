const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = {
    devtool: "source-map",
    context: __dirname,
    entry: {
        client: path.resolve("src/client/index.js"),
        vendor: ["react", "react-dom", "react-router"]
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
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?name=public/images/[name].[ext]",
                    "image-webpack-loader?bypassOnDebug"
                ]
            },
            {
                test: /\.(woff2?)$/,
                use: "url-loader?limit=10000&name=public/fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot)$/,
                use: "file-loader?name=public/fonts/[name].[ext]"
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
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}