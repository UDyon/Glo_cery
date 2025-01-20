import { StrictMode } from "react";
import ReactDOM from "react-dom";

import Test from "./test";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <Test />
    </StrictMode>,
    rootElement
);
