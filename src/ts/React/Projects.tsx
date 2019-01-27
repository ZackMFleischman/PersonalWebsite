import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IProjectsSection } from "@Redux/IModels";
import Project from "@React/Project";
import CSS from "@Sass/styles.scss";
import Section from "@React/Section";

export class ProjectsComponent extends Section<IProjectsSection> {
    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        const allComponents = this._getProjectsComponents();
        allComponents.push(this._getSeeMoreProjects());
        return allComponents;
    }

    private _getProjectsComponents(): JSX.Element[] {
        return this.props.model.projects.map((projectModel, index) => {
            return (<Project key={ index } projectModel={ projectModel } />);
        });
    }

    private _getSeeMoreProjects(): JSX.Element {
        return (
            <a
                className={ CSS.seeMoreButton }
                href="https://www.github.com/ZackMFleischman"
            >
                See more on Github
            </a>
        );
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["projects"] as IProjectsSection,
    };
};

export const Projects = connect(mapStateToProps)(ProjectsComponent);
