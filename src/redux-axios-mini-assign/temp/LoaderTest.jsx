import { useEffect, useState } from "react";

const LoaderTest = () => {
  const [data, setData] = useState([]);

  const apiCall = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  useEffect(() => {
    apiCall();
  }, []);
};
