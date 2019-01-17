import * as React from "react";
import { ISocialMedia } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface ISocialMediaListProps {
    title: string;
    socialMediaList: ISocialMedia[];
}

export default class SocialMediaList extends React.Component<ISocialMediaListProps> {
    public render() {
        return (
            <div className={ CSS.socialMediaList } >
                <span>{ this.props.title }</span>
                { this._getSocialMediaComponents() }
            </div>
        );
    }

    private _getSocialMediaComponents(): JSX.Element[] {
        return this.props.socialMediaList.map((socialMedia, index) => {
            return (
                <a key={ index } href={ socialMedia.url }>{ socialMedia.label }</a>
            );
        });
    }
}
