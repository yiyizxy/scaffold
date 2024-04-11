const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const webpackConfig = {
    entry: "./src/entry/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
    },
    // mode: process.env.NODE_ENV, // 这种方式需要package.json中设置："webpack --env development"
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
                // use: [
                //     {
                //         loader: "babel-loader",
                //         options: {
                //             "presets": [
                //                 ["@babel/preset-env", // 指定环境的插件
                //                 {
                //                     corejs: "3", // 指定core.js的版本
                //                     useBuiltIns: "usage", // 使用corejs的方式 “usage” 表示按需加载
                //                 }
                //             ]],
                //             cacheDirectory: true,
                //         },
                //     },
                // ],
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"],
            },
            // 对图片的处理
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack-demo",
            template: "./template/index.html",
            filename: "index.html", // 生成的html的文件名，模版文件中无需插入任何js，webpack会自动插入
            inject: "body", // 'body' | 'head',可以控制js插入<head>还是<body>，如果没有默认插入<head>
        }),
    ],
    // devtool: "source-map", // 便于开发调试 这里开启source-map模式
    devServer: {
        open: true, // 编译完自动打开浏览器
        host: "127.0.0.1",
        port: 8000,
        hot: true,
    },
}

module.exports = webpackConfig
