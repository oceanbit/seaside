import {h} from 'preact';
const {register} = require('@seaside/components/compat');

const App = () => {
    return <sea-button text="Hello"/>
}

typeof window !== 'undefined' && register();

export default App;
