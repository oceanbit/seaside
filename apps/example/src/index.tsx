import {h} from 'preact';
const {register} = require('ui/compat');

const App = () => {
    return <sea-button text="Hello"/>
}

typeof window !== 'undefined' && register();

export default App;
