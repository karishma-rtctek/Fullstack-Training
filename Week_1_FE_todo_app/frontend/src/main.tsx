import React from "react";
import ReactDOM from "react-dom/client";  // ReactDOM = pckg which connects react js code to browser's DOM
import { App } from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);



// createRoot(document.getElementById("root")!) = it finds the "id" root in index.html file 
// & stores the entire react app inside that "root" div
// ! = used to tell typescript that this element will never be null