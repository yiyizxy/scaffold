const { merge } = require("webpack-merge")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

const devConfig = require("./webpack.config.dev")
module.exports = merge(devConfig, {
    plugins: [
        new BundleAnalyzerPlugin()
    ]
})
