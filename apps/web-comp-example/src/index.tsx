import { h } from "preact";
import { useState } from "preact/compat";
const { register } = require("@seaside/components/compat");

const App = () => {
  const [enabled, setEnabled] = useState(true);
  return (
    <sea-switch
      key={`${enabled}`}
      enabled={enabled}
      onToggle={() => setEnabled(!enabled)}
    />
  );
};

typeof window !== "undefined" && register();

export default App;
