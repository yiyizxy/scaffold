const { merge } = require("webpack-merge")

const { baseConfig } = require("./webpack.config.base")
module.exports = merge(baseConfig, {
    mode: "development",
    // mode: process.env.NODE_ENV, // 这种方式需要package.json中设置："webpack --env development"
    devtool: "source-map", // 开启source-map模式，便于开发调试，打包后会另外生成main.js.map文件
    devServer: {
        open: true, // 编译完自动打开浏览器
        host: "127.0.0.1",
        port: 8000,
        hot: true,
    },
})
