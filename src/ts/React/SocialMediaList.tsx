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
                <span className={ CSS.socialMediaListTitle }>{ this.props.title }</span>
                { this._getSocialMediaComponents() }
            </div>
        );
    }

    private _getSocialMediaComponents(): JSX.Element[] {
        return this.props.socialMediaList.map((socialMedia, index) => {
            return (
                <a key={ index } href={ socialMedia.url } >
                    <img className={ CSS.socialMediaIcon } src={ `${socialMedia.icon}` } alt={ socialMedia.label } />
                </a >
            );
        });
    }
}
