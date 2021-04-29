const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        home: "./src/home/app.js",
        editor: "./src/editor/app.js",
        game: "./src/game/app.js",
    },
    output: {
        filename: "[name]/bundle.js",
        path: path.resolve(__dirname, "public"),
    },
    mode: "development", // none, development, production

    devServer: {
        port: 8080,
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ["home"],
            template: "./src/home/index.html",
            filename: "./home/index.html",
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ["editor"],
            template: "./src/editor/index.html",
            filename: "./editor/index.html",
        }),
        new HtmlWebpackPlugin({
            hash: true,
            chunks: ["game"],
            template: "./src/game/index.html",
            filename: "./game/index.html",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8000, // Convert images < 8kb to base64 strings
                            name: "images/[hash]-[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(md2)$/i,
                type: "asset/resource",
            },
        ],
    },
};
