import React from "react";
import App from "./components/general/App";
import ReactDOM  from "react-dom";
import { RecoilRoot } from 'recoil';
import "./styles/index.css";

ReactDOM.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
    document.getElementById("root")
);