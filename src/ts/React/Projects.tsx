import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IProjectsSection, ISocialMedia } from "@Redux/IModels";
import Project from "@React/Project";
import CSS from "@Sass/styles.scss";
import Section, { ISectionProps } from "@React/Section";

interface IProjectProps extends ISectionProps<IProjectsSection> {
    github?: ISocialMedia;
}

export class ProjectsComponent extends Section<IProjectsSection, IProjectProps> {
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
        if (this.props.github !== undefined)
            return (
                <a
                    className={ CSS.seeMoreButton }
                    href={ this.props.github.url }
                >
                    See more on Github
                </a>
            );
        else
            return <div />;
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["projects"] as IProjectsSection,
        github: "github" in state.socialMedia ? state.socialMedia["github"] : undefined
    };
};

export const Projects = connect(mapStateToProps)(ProjectsComponent);
