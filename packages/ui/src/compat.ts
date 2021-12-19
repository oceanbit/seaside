import registerPreact from 'preact-custom-element';

import * as ui from './index';
export * from './index';

export function register() {
    registerPreact(ui.Button, "sea-button", ['text']);
}
