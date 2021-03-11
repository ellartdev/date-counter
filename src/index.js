import React from "react";
import ReactDOM from "react-dom";
import Timer from "./Timer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Timer />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
