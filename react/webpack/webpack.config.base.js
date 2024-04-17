const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")

const baseConfig = {
    entry: path.resolve(__dirname, "../src/entry/index.tsx"),
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
    },
    resolve: {
        extensions: [".js", ".json", ".jsx", ".ts", ".tsx"],
        alias: {
            "@": path.resolve(__dirname, "../src"),
        },
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
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"], // MiniCssExtractPlugin插件和style-loader冲突，所以这里用MiniCssExtractPlugin插件替换了style-loader
                // less-loader：把less文件解析成css文件,css-loader：把css文件以commonjs的形式引入到js中,style-loader：创建style标签
            },
            // 对图片的处理
            {
                test: /\.(svg|png|jpg|gif)$/,
                type: "asset/resource", // webpack4中需要用到url-loader、file-loader,webpack5就不需要了,原因是webpack5新增资源模块，允许使用资源文件无需额外配置loader
                // asset/resource 发送一个单独的文件并导出 URL。=== file-loader。
                // asset/inline 导出一个资源的 data URI。=== url-loader。
                // asset/source 导出资源的源代码。=== raw-loader 实现。
                // asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

                // use: "url-loader", // webpack5之前可以用file-loader、url-loader解析
                // options: {
                //     limit: 2000,
                //     // 限制打包图片的大小：
                //     // 如果大于或等于2000Byte，则按照相应的文件名和路径打包图片；如果小于2000Byte，则将图片转成base64格式的字符串。
                //     // name: 'img/[name].[hash:8].[ext]',
                //     // img:图片打包的文件夹；
                //     // [name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
                //     // [hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
                // },
                // file-loader ：不仅仅可以处理图片资源，本质是处理文件导入地址并替换成其访问地址，并把文件输出到相应位置，音视频等资源也可以使用它。
                // url-loader：file-loader的升级版，包含 file-loader 的全部功能，并且能够根据配置将符合配置的文件转换成 Base64 方式引入，将小体积的图片 Base64 引入项目可以减少 http 请求，也是一个前端常用的优化方式。
            },
            {
                test: /\.ico$/i,
                use: "asset/inline",
                // use: "url-loader"
            },
            {
                test: /\.text$/,
                type: "asset/source", // webpack4中需要用到url-loader、file-loader,webpack5就不需要了,原因是webpack5新增资源模块，允许使用资源文件无需额外配置loader
                // use: "raw-loader"
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/i,
                type: "asset/resource",
                parser: {
                  dataUrlCondition: {
                    maxSize: 25 * 1024, // 25kb
                  },
                },
                // use: "url-loader"
                generator: {
                    filename: "assets/fonts/[name].[contenthash][ext]",
                },
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
        new MiniCssExtractPlugin({
            // css打包分离
            filename: `[name].[hash:8].css`,
        }),
        new ESLintPlugin({
            fix: true, // 开启ESLint自动修复特性
            extensions: ["js", "json"], // 需要校验的文件
            exclude: "/node_modules/", // 不包括node_module
        }),
    ],
}

module.exports = {
    baseConfig,
}
