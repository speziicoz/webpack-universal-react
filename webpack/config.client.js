const webpack = require("webpack")
const path = require("path")

module.exports = {
    devtool: "source-map",
    context: __dirname,
    entry: {
        client: path.resolve(__dirname, "../src/client/index.js")
    },
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "../public/static")
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(true),
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
}