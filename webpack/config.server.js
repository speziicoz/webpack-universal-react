const nodeExternals = require("webpack-node-externals")
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
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.BROWSER": JSON.stringify(false),
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ],
    externals: [nodeExternals()]
}