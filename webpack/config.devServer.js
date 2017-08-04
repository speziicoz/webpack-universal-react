const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

module.exports = {
    entry: {
        devServer: path.resolve("src/client/index.js"),
        vendor: ["react", "react-dom", "react-router"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("dist")
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "ejs-html-loader",
                        options: {
                            markup: null
                        }
                    },
                    {
                        loader: "raw-loader"
                    }
                ]
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
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "fast-sass-loader"]
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
    devServer: {
        contentBase: path.resolve("dist"),
        compress: true,
        hot: true,
        stats: "errors-only",
        open: true,
        openPage: "",
        host: "192.168.100.134",
        port: "3001",
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve("src/views/index.ejs"),
            minify: {
                collapseWhitespace: false
            }
        }),
        new ExtractTextPlugin({
            filename: "bundle.css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(true),
            "process.env.NODE_ENV": JSON.stringify("development")
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
