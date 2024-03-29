const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
  mode: "production",
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/container/latest/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`, // /marketing/remoteEntry.js ---> Assumption
        auth: `auth@${domain}/auth/latest/remoteEntry.js`, // /marketing/remoteEntry.js ---> Assumption
        dashboard: `dashboard@${domain}/dashboard/latest/remoteEntry.js`, // /marketing/remoteEntry.js ---> Assumption
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
