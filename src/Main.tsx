import CSS from "@Sass/styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";
import { MainUIComponentContainer } from "@Views/UIViews/MainUI";
import { createStore } from "./ReduxStore";

createStore()
    .then(store => {
        ReactDOM.render(
            <Provider store={ store } >
                <MainUIComponentContainer />
            </Provider>,
            document.getElementById(CSS.idMainUiRoot)
        );
    });