const path = require('path');

module.exports = {
    entry: './index.ts',
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
            "react-native$": "react-native-web/dist/index.js",
            // Use Preact aliases
            react$: 'preact/compat',
            'react-dom$': 'preact/compat',
            // Fix the responder system which react-native-web depends on
            'react-dom/unstable-native-dependencies$': 'preact-responder-event-plugin',
        }
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    }
};
