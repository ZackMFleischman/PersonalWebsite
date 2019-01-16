// import CSS from "@Sass/styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "@Redux/ReduxStore";
import { Website } from "@React/Website";

createStore()
    .then(store => {
        ReactDOM.render(
            <Provider store={ store } >
                <Website />
            </Provider>,
            document.getElementById("idMain")
        );
    });
