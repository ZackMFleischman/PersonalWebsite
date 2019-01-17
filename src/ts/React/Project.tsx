import * as React from "react";
import { IProject } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IProjectProps {
    projectModel: IProject;
}

export default class Project extends React.Component<IProjectProps> {
    public render() {
        const project: IProject = this.props.projectModel;
        return (
            <div className={ CSS.project } >
                <span>{ project.title }</span>
                <span>{ project.description }</span>
                <a href={ project.sourceCodeUrl }>Source Code</a>
            </div>
        );
    }
}
