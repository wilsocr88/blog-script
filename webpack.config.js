const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "" }],
        }),
    ],
};
