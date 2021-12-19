/**
 * Function that mutates the original webpack config.
 * Supports asynchronous changes when a promise is returned (or it's an async function).
 *
 * @param {import('preact-cli').Config} config - original webpack config
 * @param {import('preact-cli').Env} env - current environment and options pass to the CLI
 * @param {import('preact-cli').Helpers} helpers - object with useful helpers for working with the webpack config
 * @param {Record<string, unknown>} options - this is mainly relevant for plugins (will always be empty in the config), default to an empty object
 */
export default (config, env, helpers, options) => {
    config.resolve.alias = {
        ...config.resolve.alias,
        "react-native$": "react-native-web/dist/index.js",
        // Use Preact aliases
        react$: 'preact/compat',
        'react-dom$': 'preact/compat',
        // Fix the responder system which react-native-web depends on
        'react-dom/unstable-native-dependencies$': 'preact-responder-event-plugin',
    };

    return config;
};
