import {h} from 'preact';
const {register} = require('@seaside/components/compat');

const App = () => {
    return <sea-switch enabled={true}/>
}

typeof window !== 'undefined' && register();

export default App;
