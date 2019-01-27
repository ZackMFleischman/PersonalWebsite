import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IConnectSection, ISocialMedia, ISocialMediaMap } from "@Redux/IModels";
import SocialMediaList from "@React/SocialMediaList";
import Section, { ISectionProps } from "@React/Section";
import CSS from "@Sass/styles.scss";

interface IConnectProps extends ISectionProps<IConnectSection> {
    socialMediaMap: ISocialMediaMap;
}

export class ConnectComponent extends Section<IConnectSection, IConnectProps> {
    private static readonly _splitUpHireMeAndFollowMe: boolean = false;

    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        if (ConnectComponent._splitUpHireMeAndFollowMe)
            return this._getHireMeAndFollowMe();
        else
            return this._getSimpleListOfAllSocialMedia();
    }

    private _getHireMeAndFollowMe(): JSX.Element {
        return (
            <div className={ CSS.connectContainer }>
                <SocialMediaList
                    key="hireMe"
                    title="Hire Me:"
                    socialMediaList={ this._getSocialMediaFromIds(this.props.model.hireMe) }
                />
                <SocialMediaList
                    key="followMe"
                    title="Follow Me:"
                    socialMediaList={ this._getSocialMediaFromIds(this.props.model.followMe) }
                />
                { this._getEmailMeButton() }
            </div>
        );
    }

    private _getSimpleListOfAllSocialMedia(): JSX.Element[] {
        const socialMediaList: ISocialMedia[] = this._getSocialMediaFromIds(this.props.model.followMe)
            .concat(this._getSocialMediaFromIds(this.props.model.hireMe));

        return [
            (
                <SocialMediaList
                    title=""
                    socialMediaList={ socialMediaList }
                />
            ),
            (
                this._getEmailMeButton()
            )
        ];
    }

    private _getSocialMediaFromIds(socialMediaIDs: string[]): ISocialMedia[] {
        return socialMediaIDs.map(id => this.props.socialMediaMap[id]);
    }

    private _getEmailMeButton(): JSX.Element {
        return (
            <a
                className={ CSS.emailMeButton }
                href={ `mailto:${this.props.model.emailMe}` }
            >
                Email Me
            </a >
        );
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["connect"] as IConnectSection,
        socialMediaMap: state.socialMedia
    };
};

export const Connect = connect(mapStateToProps)(ConnectComponent);
