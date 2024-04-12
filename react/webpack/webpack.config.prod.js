const { merge } = require("webpack-merge")
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

const { baseConfig } = require("./webpack.config.base")
module.exports = merge(baseConfig, {
    mode: "production",
    plugins: [new CssMinimizerWebpackPlugin()],
})
