import React from "react";
import MainPage from "./containers/MainPage";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
  }
}

export default App;
