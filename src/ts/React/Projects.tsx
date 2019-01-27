import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IProjectsSection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";
import Project from "@React/Project";
import Section from "@React/Section";

export class ProjectsComponent extends Section<IProjectsSection> {
    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        return this._getProjectsComponents();
    }

    private _getProjectsComponents(): JSX.Element[] {
        return this.props.model.projects.map((projectModel, index) => {
            return (<Project key={ index } projectModel={ projectModel } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["projects"] as IProjectsSection,
    };
};

export const Projects = connect(mapStateToProps)(ProjectsComponent);
