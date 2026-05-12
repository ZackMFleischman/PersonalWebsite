import * as React from "react";
import { IAppEntry } from "./AppsManifest";
import { BackChip } from "./BackChip";
import CSS from "@Sass/apps.scss";

interface IAppEmbedProps {
    app: IAppEntry;
}

export class AppEmbed extends React.Component<IAppEmbedProps> {
    public componentDidMount() {
        document.title = `${this.props.app.name} · Zack M Fleischman`;
    }

    public render() {
        return (
            <div className={ CSS.appEmbedRoot }>
                <iframe
                    className={ CSS.appEmbedFrame }
                    src={ this.props.app.embedUrl }
                    title={ this.props.app.name }
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; xr-spatial-tracking"
                    allowFullScreen={ true }
                />
                <BackChip />
            </div>
        );
    }
}
