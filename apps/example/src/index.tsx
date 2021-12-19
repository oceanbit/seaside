import {h} from 'preact';
import {register} from 'ui-compat';

const App = () => {
    return <sea-button text="Hello"/>
}

typeof window !== 'undefined' && register();

export default App;
