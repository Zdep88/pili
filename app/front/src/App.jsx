import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  async function getData() {
    const data = await fetch("/api/test");
    const json = await data.json();
    setDataState(json);
  }

  const [dataState, setDataState] = useState(null);
  
  useEffect(() => {
    getData();
  }, []);

	return <>
    <div className="app">
      <h1>{dataState?.response}</h1>
    </div>
  </>;
}

export default App;
