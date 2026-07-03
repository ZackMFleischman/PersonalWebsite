import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IApp } from "../Redux/IModels";
import { BackChip } from "./BackChip";
import CSS from "@Sass/apps.scss";

interface IAppEmbedOwnProps {
    slug: string;
}

interface IAppEmbedProps extends IAppEmbedOwnProps {
    app: IApp | undefined;
}

export class AppEmbedComponent extends React.Component<IAppEmbedProps> {
    public componentDidMount() {
        this._syncApp();
    }

    // The store loads configs/store.yaml asynchronously, so the app prop can
    // arrive after mount.
    public componentDidUpdate() {
        this._syncApp();
    }

    private _syncApp() {
        const app = this.props.app;
        if (app) {
            document.title = `${app.name} · Zack M Fleischman`;
        }
        // External-only apps never render in the iframe page: a hand-typed
        // /apps/{slug}/ URL redirects out instead of showing an empty frame.
        if (app && !app.embedUrl && app.externalUrl) {
            window.location.replace(app.externalUrl);
        }
    }

    public render() {
        const app = this.props.app;
        if (!app) {
            return (
                <div className={ CSS.appEmbedRoot }>
                    <div className={ CSS.appsEmpty } style={ { padding: 48, color: "#f0ece4" } }>
                        Unknown app “{ this.props.slug }”. <a href="/apps/" style={ { color: "#b68d4c" } }>Back to all apps</a>.
                    </div>
                </div>
            );
        }
        if (!app.embedUrl) {
            return null; // redirecting out (componentDidMount)
        }
        return (
            <div className={ CSS.appEmbedRoot }>
                <iframe
                    className={ CSS.appEmbedFrame }
                    src={ app.embedUrl }
                    title={ app.name }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; xr-spatial-tracking"
                    allowFullScreen={ true }
                />
                <BackChip />
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreModel, ownProps: IAppEmbedOwnProps) => ({
    app: state.apps.find(a => a.slug === ownProps.slug)
});

export const AppEmbed = connect(mapStateToProps)(AppEmbedComponent);
