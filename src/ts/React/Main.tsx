import CSS from "@Sass/styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Switch, Route, RouteComponentProps } from "react-router-dom";
import { createStore } from "@Redux/ReduxStore";
import Environment from "@Environment/Environment";
import { Website } from "@React/Website";
import { AppsGrid } from "@Apps/AppsGrid";
import { AppEmbed } from "@Apps/AppEmbed";
import "@Sass/styles"; // Pull in the CSS
import "@Sass/apps.scss"; // Apps page styles

interface IAppRouteParams {
    slug: string;
}

const renderEmbed = (props: RouteComponentProps<IAppRouteParams>) => (
    <AppEmbed slug={ props.match.params.slug } />
);

createStore()
    .then(store => {
        ReactDOM.render(
            <Provider store={ store } >
                <BrowserRouter basename={ Environment.getBasePath() }>
                    <Switch>
                        <Route path="/apps/:slug/" render={ renderEmbed } />
                        <Route path="/apps/:slug" render={ renderEmbed } />
                        <Route path="/apps" render={ () => <AppsGrid /> } />
                        <Route render={ () => <Website /> } />
                    </Switch>
                </BrowserRouter>
            </Provider>,
            document.getElementById(CSS.idMain)
        );
    });
