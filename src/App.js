import React, { useEffect } from "react";
import MainPage from "./Pages/MainPage/MainPage";


function App() {
  useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);
  return (
    <MainPage />
  );
}

export default App;
