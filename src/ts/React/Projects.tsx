import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection, IProjectsSection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";
import Job from "@React/Job";
import Project from "@React/Project";

interface IProjectsProps {
    projectsModel: IProjectsSection;
}

export class ProjectsComponent extends React.Component<IProjectsProps> {
    public render() {
        return (
            <div className={ CSS.work } >
                <Title title={ this.props.projectsModel.title } />
                { this._getProjectsComponents() }
            </div>
        );
    }

    private _getProjectsComponents(): JSX.Element[] {
        return this.props.projectsModel.projects.map((projectModel, index) => {
            return (<Project key={ index } projectModel={ projectModel } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        projectsModel: state.sections["projects"] as IProjectsSection,
    };
};

export const Projects = connect(mapStateToProps)(ProjectsComponent);
