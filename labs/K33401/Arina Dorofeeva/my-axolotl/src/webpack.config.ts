import HtmlWebpackPlugin from "html-webpack-plugin"
import { Configuration } from "webpack"
import { createEmotionPlugin } from "emotion-ts-plugin"
import path from "path"

const config: Configuration = {
  entry: "/src/index.ts",
  mode: "development",
  devtool: "source-map",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "../build/public"),
    clean: true
  },
  resolve: {
    extensions: [".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  createEmotionPlugin({
                    autoLabel: true,
                    labelFormat: '[local]',
                    autoInject: true,
                    jsxImportSource: '@emotion/react'
                  })
                ]
              })
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "/src/index.html"
    })
  ]
}

export default config
