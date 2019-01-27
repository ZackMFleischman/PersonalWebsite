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
                <img className={ CSS.projectImage } src={ this.props.projectModel.imageUrl } />
                <div className={ CSS.projectTextContainer }>
                    <div>
                        <h2 className={ CSS.projectTitle }>{ project.title }</h2>
                        <span className={ CSS.projectDescription }>{ project.description }</span>
                    </div>
                    <div className={ CSS.projectLinksContainer }>
                        <a href={ project.demoUrl }>Demo</a>
                        <span>   |   </span>
                        <a href={ project.sourceCodeUrl }>Source</a>
                    </div>
                </div>
            </div>
        );
    }
}
