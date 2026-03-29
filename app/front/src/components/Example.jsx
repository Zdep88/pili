import { useState } from "react";
import { useEffect } from "react";
// import "./example.css";

function Example() {
  async function getData() {
    const data = await fetch("http://localhost:3004/api/");
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

export default Example;
