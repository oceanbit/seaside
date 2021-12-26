import type { NextPage } from "next";
import { Switch } from "@seaside/components/react";
import { useState } from "react";

const Home: NextPage = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      enabled={enabled}
      disabled={false}
      onToggle={() => setEnabled(!enabled)}
    />
  );
};

export default Home;
