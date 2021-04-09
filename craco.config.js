const CracoLessPlugin = require("craco-less");
const { when } = require("@craco/craco");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#00f4a6" },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    plugins: [
      ...when(
        Boolean(process.env.ANALYZE),
        () => [new BundleAnalyzerPlugin()],
        []
      ),
    ],
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
