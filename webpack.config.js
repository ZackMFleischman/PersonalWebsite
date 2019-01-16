const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ip = require("ip");

// Grab this machines current IP Address so we can build for LAN testing easily.
const webpackDevServerIP = ip.address();
const webpackDevServerPort = 9000;

const lanLoggerServerIP = ip.address();
const lanLoggerServerPort = 5005;

const webtoolBundleName = "webtool";
const webtoolEmbedderBundleName = "webtoolEmbedder";
const strypesWebtoolForClientBundleName = "strypesWebtoolClient"
const vendorsBundleName = "vendors";
const bundleSuffix = ".bundle.js";

module.exports = (env, argv) => {
    const mode = getMode(argv);
    const shouldUseHTTPS = useHTTPS(argv);

    const config = {
        mode: mode,

        entry: {
            [webtoolBundleName]: path.join(__dirname, "./src/ts/WebtoolMain.ts"),
            [webtoolEmbedderBundleName]: path.join(__dirname, "./src/ts/WebtoolEmbedderMain.ts"),
            [strypesWebtoolForClientBundleName]: path.join(__dirname, "./src/ts/WebtoolForClientMain.ts"),
        },

        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "",
            filename: chunkData => getBundleFilename(chunkData.chunk.name)
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: vendorsBundleName,
                        filename: getBundleFilename(vendorsBundleName),
                        // Prevents webpack from trying to pull any chunks out of webtoolForClient entry/bundle,
                        // so that this chunk's output is only a single script (and not broken into multiple bundles).
                        chunks: chunk => chunk.name != strypesWebtoolForClientBundleName
                    }
                }
            }
        },

        module: {
            rules: [
                {
                    // TypeScript
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true     // This is used with ForkTSCheckerWebpackPlugin to speed up builds.
                        }
                    }
                },
                {
                    // Sass + CSS
                    test: /\.(s*)css$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "style-loader" },
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                namedExport: true,
                                camelCase: "only",
                                modules: true,
                                localIdentName: "[local]"
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                }
            ]
        },

        resolve: {
            extensions: [".tsx", ".ts", ".js", ".css", ".scss"],

            // NOTE: You should make an entry in tsconfig.json as well for each of these entries.
            alias: {
                "@Constants": path.resolve(__dirname, "src/ts/Constants.ts"),
                "@Sass": path.resolve(__dirname, "src/sass/"),
                "@WebtoolStarter": path.resolve(__dirname, "src/ts/WebtoolStarter/"),
                "@WebtoolEmbedder": path.resolve(__dirname, "src/ts/WebtoolEmbedder/"),
                "@Logging": path.resolve(__dirname, "src/ts/Logging/"),
                "@ModelLayer": path.resolve(__dirname, "src/ts/ModelLayer/"),
                "@Scenes": path.resolve(__dirname, "src/ts/Scenes/"),
                "@Startup": path.resolve(__dirname, "src/ts/Startup/"),
                "@RenderLoop": path.resolve(__dirname, "src/ts/RenderLoop/"),
                "@Utility": path.resolve(__dirname, "src/ts/Utility/"),
                "@Systems": path.resolve(__dirname, "src/ts/Systems/"),
                "@Events": path.resolve(__dirname, "src/ts/ModelLayer/Events/"),
                "@HTML": path.resolve(__dirname, "src/ts/HTML/"),
                "@Views": path.resolve(__dirname, "src/ts/Views/"),
                "@Serialization": path.resolve(__dirname, "src/ts/Serialization/"),
                "@Inversify": path.resolve(__dirname, "src/ts/Inversify/"),
                "@Requests": path.resolve(__dirname, "src/ts/Requests/"),
                "@DebugTools": path.resolve(__dirname, "src/ts/DebugTools/"),
                "@Configs": path.resolve(__dirname, "src/ts/Configs/"),
                "@Urls": path.resolve(__dirname, "src/ts/Urls/"),
                "@Environment": path.resolve(__dirname, "src/ts/Environment/"),
                "@Tests": path.resolve(__dirname, "tests/"),
                "@Profiler": path.resolve(__dirname, "src/ts/Profiler/"),
                "@Algorithms": path.resolve(__dirname, "src/ts/Algorithms/"),
                "@DataStructures": path.resolve(__dirname, "src/ts/DataStructures/"),
                "@CommunicationChannelForIFrame": path.resolve(__dirname, "src/ts/CommunicationChannelForIFrame/"),
                "@Localization": path.resolve(__dirname, "src/ts/Localization/"),
                "@Bootstrapper": path.resolve(__dirname, "src/ts/Bootstrapper/"),
                "@Materials": path.resolve(__dirname, "src/ts/Materials"),
                "@Customization": path.resolve(__dirname, "src/ts/Customization"),
                "@Redux": path.resolve(__dirname, "src/ts/Redux"),
                "@Loaders": path.resolve(__dirname, "src/ts/Loaders"),
                "@Effects": path.resolve(__dirname, "src/ts/Effects"),
            },
        },

        // NOTE: Changing the devtool source map type to anything except `source-map` will break global error logging.
        //       (Only reports "Script Error" for each log). Approach with caution.
        devtool: "source-map",

        devServer: {
            headers: { "Access-Control-Allow-Origin": "*" },
            host: webpackDevServerIP,
            port: webpackDevServerPort,
            hot: true,
            open: true,
            openPage: "devClientIndex.html",
            inline: true,
            https: shouldUseHTTPS
        },

        watchOptions: {
            aggregateTimeout: 500,
            poll: 1000
        },

        plugins: [
            new webpack.HotModuleReplacementPlugin(),

            new HtmlWebpackPlugin({
                hash: true,
                filename: "index.html",
                template: __dirname + "/src/html/index.html",
                favicon: __dirname + "/assets/images/favicon.ico",
                environment: mode,
                // These chunks are excluded because we don't want to inject them into our index.html as they're part of
                // a different codepath that is used to ultimately embed this exact index.html into another page.
                excludeChunks: [strypesWebtoolForClientBundleName, webtoolEmbedderBundleName]
            }),

            new HtmlWebpackPlugin({
                hash: true,
                filename: "devClientIndex.html",
                template: __dirname + "/src/html/devClientIndex.html",
                favicon: __dirname + "/assets/images/favicon.ico",
                environment: mode,
                strypesScriptTagSource: getWebtoolCodeServer(mode) + strypesWebtoolForClientBundleName + ".js",
                inject: false
            }),

            // These variables are essentially #define's accessible in Typescript.
            // Go add a declaration for them in WebpackEnvironmentVariables.ts.
            new webpack.DefinePlugin(getWebpackEnvironmentVariables(mode, shouldUseHTTPS)),

            // Ignore the changes in any auto-created d.ts files for TypeScript (like typings-for-css-loader makes).
            new webpack.WatchIgnorePlugin([/\.d\.ts$/]),

            // Speeds up bundle compilation time by forking the type-checking process to run in parallel.
            new ForkTsCheckerWebpackPlugin({ reportFiles: ['src/**/*.{ts,tsx}'] }),
        ],

        node: {
            fs: "empty"
        },

        externals: {
            // These are here because we aren't using any Babylon physics engines.
            oimo: "OIMO",
            cannon: "CANNON",
            earcut: "EARCUT"
        }
    };

    return config;
};

function useHTTPS(argv) {
    let https = true;

    if (argv !== undefined && argv.https !== undefined) {
        https = argv.https;
    }

    return https;
}

function getMode(argv) {
    let mode = "development";

    if (argv !== undefined && argv.mode !== undefined) {
        mode = argv.mode;
    }

    return mode;
}

function getBundleFilename(chunkName) {
    return chunkName === strypesWebtoolForClientBundleName ?
        chunkName + ".js" :
        chunkName + bundleSuffix;
}

// NOTE: All values in the returned map should likely be run through `JSON.stringify`.
//       This holds true EVEN if they are already strings. This is a `webpack.DefinePlugin` thing.
//
// From the docs (https://webpack.js.org/plugins/define-plugin/):
//      If the value is a string it will be used as a code fragment.
//      If the value isn't a string, it will be stringified (including functions).
//      If the value is an object all keys are defined the same way.
//      If you prefix typeof to the key, it's only defined for typeof calls.
function getWebpackEnvironmentVariables(mode, useHTTPS) {
    let webpackDevServerUrl = buildUrl(webpackDevServerIP, webpackDevServerPort, useHTTPS);
    let lanLoggerServerUrl = buildUrl(lanLoggerServerIP, lanLoggerServerPort, useHTTPS);

    let environmentVariableMap = {
        "Webpack.ENVIRONMENT": JSON.stringify(mode),
        "Webpack.WEBTOOL_EMBEDDER_BUNDLE": JSON.stringify(getBundleFilename(webtoolEmbedderBundleName)),
        "Webpack.VENDORS_BUNDLE": JSON.stringify(getBundleFilename(vendorsBundleName)),
    };

    switch (mode) {
        case "development":
            environmentVariableMap['Webpack.WEBPACK_DEV_SERVER_URL'] = JSON.stringify(webpackDevServerUrl);
            environmentVariableMap['Webpack.LAN_LOGGER_SERVER_URL'] = JSON.stringify(lanLoggerServerUrl);
            break;

        case "production":
            // Currently we don't have production servers, so we'll leave this here for now for testing.
            environmentVariableMap['Webpack.WEBPACK_DEV_SERVER_URL'] = JSON.stringify(webpackDevServerUrl);
            break;
    }

    return environmentVariableMap;
}

function getWebtoolCodeServer(mode) {
    switch (mode) {
        case "development": return "";
        case "production": return "https://s3-us-west-1.amazonaws.com/code.webtool.strypes.co/";
        default: return "";
    }
}

function buildUrl(ip, port, useHTTPS) {
    return `http${useHTTPS ? "s" : ""}://` + ip + ":" + port + "/";
}