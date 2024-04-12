const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log('=========', __dirname)
console.log('=========', path.resolve(__dirname, "./entry/index.tsx"))
const baseConfig = {
    entry: path.resolve(__dirname, "../src/entry/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(tsx|js|jsx)$/,
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
                // use: ["style-loader", "css-loader", "less-loader"], // MiniCssExtractPlugin插件和style-loader冲突，所以这里用MiniCssExtractPlugin插件替换了style-loader
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader","less-loader"], // MiniCssExtractPlugin插件和style-loader冲突，所以这里用MiniCssExtractPlugin插件替换了style-loader
            },
            // 对图片的处理
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: "asset/resource", // webpack4中需要用到url-loader、file-loader,webpack5就不需要了,原因是webpack5新增资源模块，允许使用资源文件无需额外配置loader
                // asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
                // asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
                // asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
                // asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。
            },
            {
                test: /\.ico$/i,
                use: 'asset/inline'
            },
            {
                test: /\.text$/,
                type: "asset/source", // webpack4中需要用到url-loader、file-loader,webpack5就不需要了,原因是webpack5新增资源模块，允许使用资源文件无需额外配置loader
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack-demo",
            template: path.resolve(__dirname, "../template/index.html"),
            filename: "index.html", // 生成的html的文件名，模版文件中无需插入任何js，webpack会自动插入
            inject: "body", // 'body' | 'head',可以控制js插入<head>还是<body>，如果没有默认插入<head>
        }),
        new MiniCssExtractPlugin({ // css打包分离
            filename: `[name].[hash:8].css`,
        }),
    ]
}

module.exports = {
    baseConfig
}
