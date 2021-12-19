import registerPreact from 'preact-custom-element';

export * from 'ui/index';
import * as ui from 'ui/index';

const register = () => {
    registerPreact(ui.Button, "sea-button");
}
