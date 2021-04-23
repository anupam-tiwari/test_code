import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

const countEl = document.getElementById("count");

updateVisitCount();

function updateVisitCount() {
  fetch("https://api.countapi.xyz/update/covid/anupam/?amount=1")
    .then((res) => res.json())
    .then((res) => {
      countEl.innerHTML = res.value;
    });
}
