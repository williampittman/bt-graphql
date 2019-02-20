import React, { useState } from "react";

import "./App.css";

const App = () => {
  const [string, setString] = useState("");
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => setString("Hello")} />
      <div>{string}</div>
    </div>
  );
};

export default App;
