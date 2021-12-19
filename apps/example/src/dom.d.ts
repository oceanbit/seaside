import {h} from 'preact';

declare module 'preact/src/jsx' {
    namespace JSXInternal {
        // We're extending the IntrinsicElements interface which holds a kv-list of
        // available html-tags.
        interface IntrinsicElements {
            'sea-button': {
                text: string
            };
        }
    }
}
