import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IAboutSection, ISection } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IAboutProps {
    aboutModel: IAboutSection;
}

export class AboutComponent extends React.Component<IAboutProps> {
    public render() {
        return (
            <div className={ CSS.about } >
                <span className={ CSS.aboutGreeting }>{ this.props.aboutModel.greeting }</span>
                <span className={ CSS.aboutTitle }>{ this.props.aboutModel.title }</span>
                <span className={ CSS.aboutSubtitle }>{ this.props.aboutModel.subtitle }</span>
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
