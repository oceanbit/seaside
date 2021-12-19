const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    {
        name: 'seaside-react-native',
        entry: './src/index.tsx',
        externals: {
            "react-native": "react-native",
            "react": "react",
            "react-dom": "react-dom"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    "@babel/preset-flow"
                                ]
                            }
                        },
                        {loader: 'ts-loader'}
                    ],
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            library: 'Seaside',
        }
    },
    {
        name: 'declaration-files',
        entry: './noop.js',
        plugins: [
            new CopyPlugin({
                patterns: [
                    {
                        from: "src/**/*.d.ts", to: () => {
                            return '[name][ext]'
                        }
                    }
                ],
            }),
        ],
        output: {
            filename: 'noop.js',
            path: path.resolve(__dirname, 'dist'),
        },
        dependencies: ['seaside-react-native']
    },
    {
        name: 'seaside-react',
        entry: './src/index.tsx',
        externals: {
            "react": "react",
            "react-dom": "react-dom"
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                "react-native$": "react-native-web/dist/index.js"
            }
        },
        output: {
            filename: 'react.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            library: 'Seaside',
        }
    },
    {
        name: 'seaside-compat',
        entry: './src/compat.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.preact.json'
                        }
                    },
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                "react-native$": "react-native-web/dist/index.js",
                // Use Preact aliases
                react$: 'preact/compat',
                'react-dom$': 'preact/compat',
                // Fix the responder system which react-native-web depends on
                'react-dom/unstable-native-dependencies$': 'preact-responder-event-plugin',
            }
        },
        output: {
            filename: 'compat.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'umd',
            library: 'Seaside',
        }
    }
];

module.exports.parallelism = 3;
