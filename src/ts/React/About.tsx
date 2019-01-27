import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IAboutSection, ISection } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IAboutProps {
    aboutModel: IAboutSection;
}

export class AboutComponent extends React.Component<IAboutProps> {
    public render() {
        const backgroundImageStyle = {
            backgroundImage: `url(${this.props.aboutModel.backgroundImage})`
        };

        return (
            <div className={ CSS.about } style={ backgroundImageStyle } >
                <div className={ CSS.aboutImage }>
                    <div className={ CSS.aboutBlurb }>
                        <span className={ CSS.aboutGreeting + " " + CSS.aboutBlurbItem }>
                            { this.props.aboutModel.greeting }</span>
                        <span className={ CSS.aboutTitle + " " + CSS.aboutBlurbItem }>
                            { this.props.aboutModel.title }</span>
                        <span className={ CSS.aboutSubtitle + " " + CSS.aboutBlurbItem }>
                            { this.props.aboutModel.subtitle }</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        aboutModel: state.sections["about"] as IAboutSection,
    };
};

export const About = connect(mapStateToProps)(AboutComponent);
