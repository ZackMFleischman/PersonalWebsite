import * as React from "react";
import { connect } from "react-redux";
import IStoreModel from "../Redux/IModels";
import { About } from "@React/About";
import { Menu } from "@React/Menu";
import { Work } from "@React/Work";
import { Projects } from "@React/Projects";
import { Skills } from "@React/Skills";
import { Connect } from "@React/Connect";
import Footer from "@React/Footer";

interface IWebsiteProps {
    model: IStoreModel;
}

export class WebsiteComponent extends React.Component<IWebsiteProps> {
    public render() {
        return (
            <div>
                <Menu />
                { this._getSections() }
                <Footer />
            </div>
        );
    }

    private _getSections(): JSX.Element[] {
        return this.props.model.sectionsToRender.map(this._getSection);
    }

    private _getSection(sectionID: string): JSX.Element {
        switch (sectionID) {
            case "about": return (<About />);
            case "work": return (<Work />);
            case "projects": return (<Projects />);
            case "skills": return (<Skills />);
            case "connect": return (<Connect />);
            default: return <div />;
        }
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state
    };
};

export const Website = connect(mapStateToProps)(WebsiteComponent);
