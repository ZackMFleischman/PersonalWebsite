import CSS from "@Sass/styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "@Redux/ReduxStore";
import { Website } from "@React/Website";
import { AppsGrid } from "@Apps/AppsGrid";
import { AppEmbed } from "@Apps/AppEmbed";
import "@Sass/styles"; // Pull in the CSS
import "@Sass/apps.scss"; // Apps page styles

function pickRoot(): JSX.Element {
    const path = window.location.pathname.replace(/\/+$/, "");

    const embedMatch = path.match(/^\/apps\/([^/]+)$/);
    if (embedMatch) {
        return <AppEmbed slug={ embedMatch[1] } />;
    }

    if (path === "/apps") {
        return <AppsGrid />;
    }

    return <Website />;
}

createStore()
    .then(store => {
        ReactDOM.render(
            <Provider store={ store } >
                { pickRoot() }
            </Provider>,
            document.getElementById(CSS.idMain)
        );
    });
