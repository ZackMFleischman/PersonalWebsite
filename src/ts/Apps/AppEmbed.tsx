import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
        if (this.props.app) {
            document.title = `${this.props.app.name} · Zack M Fleischman`;
        }
    }

    public render() {
        const app = this.props.app;
        if (!app) {
            return (
                <div className={ CSS.appEmbedRoot }>
                    <div className={ CSS.appsEmpty } style={ { padding: 48, color: "#f0ece4" } }>
                        Unknown app “{ this.props.slug }”. <Link to="/apps/" style={ { color: "#b68d4c" } }>Back to all apps</Link>.
                    </div>
                </div>
            );
        }
        // Full PWAs (e.g. Firebase-auth games) can't run in a cross-origin
        // iframe — their sign-in breaks under partitioned third-party storage —
        // so they open in their own tab from the grid. If someone lands here by
        // a direct URL, offer a launch button rather than a broken embed.
        if (app.external) {
            return (
                <div className={ CSS.appEmbedRoot }>
                    <div className={ CSS.appLaunchScreen }>
                        <h1 className={ CSS.appLaunchTitle }>{ app.name }</h1>
                        <p className={ CSS.appLaunchDesc }>{ app.description }</p>
                        <a
                            className={ CSS.appLaunchButton }
                            href={ app.embedUrl }
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Open { app.name } ↗
                        </a>
                    </div>
                    <BackChip />
                </div>
            );
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
