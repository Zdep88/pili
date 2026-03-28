import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  async function getData() {
    const data = await fetch("https://pili.zdep.fr/api");
    const json = await data.json();
    setDataState(json);
  }

  const [dataState, setDataState] = useState(null);
  
  useEffect(() => {
    getData();
  }, []);

	return <>
    <div className="app">
      <h1>{dataState?.message}</h1>
    </div>
  </>;
}

export default App;
