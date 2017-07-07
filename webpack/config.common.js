const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require("webpack")
const path = require("path")

const isProd = process.env.NODE_ENV === "production"
const cssDev = ["style-loader", "css-loader?sourceMap", "fast-sass-loader"]
const cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ["css-loader", "fast-sass-loader"]
})
const cssConfig = isProd ? cssProd : cssDev

module.exports = {
    entry: {
        common: path.resolve(__dirname, "../src/client/index.js")
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "../dist")
    },
    module: {
        rules: [
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: "webpack2-ejs-render-loader",
                        options: {
                            markup: null,
                            bundleJS: null
                        }
                    },
                    {
                        loader: "raw-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    "file-loader?name=images/[name].[ext]",
                    "image-webpack-loader?bypassOnDebug"
                ]
            },
            {
                test: /\.(woff2?)$/,
                use: "url-loader?limit=10000&name=fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot)$/,
                use: "file-loader?name=fonts/[name].[ext]"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        hot: true,
        stats: "errors-only",
        open: true,
        host: "192.168.100.134",
        port: "3001",
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../src/views/index.ejs"),
            minify: {
                collapseWhitespace: true
            }
        }),
        new ExtractTextPlugin({
            filename: "bundle.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(true),
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
