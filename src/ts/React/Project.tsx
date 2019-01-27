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
                        { this._getProjectLinks() }
                    </div>
                </div>
            </div>
        );
    }

    private _getProjectLinks(): JSX.Element {
        if (this.props.projectModel.demoUrl !== undefined) {
            return (
                <div className={ CSS.projectLinksContainer }>
                    <a href={ this.props.projectModel.demoUrl }>Demo</a>
                    <span>   |   </span>
                    <a href={ this.props.projectModel.sourceCodeUrl }>Source</a>
                </div>
            );
        } else {
            return (
                <div className={ CSS.projectLinksContainer }>
                    <a href={ this.props.projectModel.sourceCodeUrl }>Source</a>
                </div>
            );
        }

    }
}
