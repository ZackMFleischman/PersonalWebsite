import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection, IConnectSection, ISocialMedia, ISocialMediaMap } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";
import SocialMediaList from "@React/SocialMediaList";

interface IConnectProps {
    connectModel: IConnectSection;
    socialMediaMap: ISocialMediaMap;
}

export class ConnectComponent extends React.Component<IConnectProps> {
    public render() {
        return (
            <div className={ CSS.connect } >
                <Title title={ this.props.connectModel.title } />
                <SocialMediaList
                    key="hireMe"
                    title="Hire Me:"
                    socialMediaList={ this._getSocialMediaFromIds(this.props.connectModel.hireMe) }
                />
                <SocialMediaList
                    key="followMe"
                    title="Follow Me:"
                    socialMediaList={ this._getSocialMediaFromIds(this.props.connectModel.followMe) }
                />
                <a href={ "mailto:" + this.props.connectModel.emailMe }>Email Me</a>
            </div>
        );
    }

    private _getSocialMediaFromIds(socialMediaIDs: string[]): ISocialMedia[] {
        return socialMediaIDs.map(id => this.props.socialMediaMap[id]);
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        connectModel: state.sections["connect"] as IConnectSection,
        socialMediaMap: state.socialMedia
    };
};

export const Connect = connect(mapStateToProps)(ConnectComponent);
