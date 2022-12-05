import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('webpack').Configuration} */
export default {
  mode: "development",
  entry: "./src/app.ts",
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    port: 4269,
    hot: true
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      handlebars: "handlebars/dist/cjs/handlebars.js",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: resolve(__dirname, "./src/index.html")
  }), new MiniCssExtractPlugin()],
}
