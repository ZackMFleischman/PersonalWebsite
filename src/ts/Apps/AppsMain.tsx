import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppsGrid } from "./AppsGrid";
import { AppEmbed } from "./AppEmbed";
import { getAppBySlug } from "./AppsManifest";
import "@Sass/apps.scss";

function getAppSlugFromPath(): string | undefined {
    const path = window.location.pathname.replace(/\/+$/, "");
    const match = path.match(/\/apps\/([^/]+)$/);
    return match ? match[1] : undefined;
}

function render() {
    const container = document.getElementById("idAppsRoot");
    if (!container) {
        return;
    }

    const slug = getAppSlugFromPath();
    if (slug === undefined) {
        ReactDOM.render(<AppsGrid />, container);
        return;
    }

    const app = getAppBySlug(slug);
    if (app === undefined) {
        ReactDOM.render(<AppsGrid />, container);
        return;
    }

    ReactDOM.render(<AppEmbed app={ app } />, container);
}

render();
