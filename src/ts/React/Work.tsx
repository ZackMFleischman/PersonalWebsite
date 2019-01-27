import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection } from "@Redux/IModels";
import Job from "@React/Job";
import Section from "@React/Section";
import CSS from "@Sass/styles.scss";

export class WorkComponent extends Section<IWorkSection> {
    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        const content: JSX.Element[] = this._getJobs();
        content.push(this._getSeeMoreJobs());
        return content;
    }

    protected _getJobs(): JSX.Element[] {
        return this.props.model.jobs.map((jobModel, index) => {
            return (<Job key={ index } jobModel={ jobModel } />);
        });
    }

    private _getSeeMoreJobs(): JSX.Element {
        return (
            <a
                className={ CSS.seeMoreButton }
                href="https://www.linkedin.com/in/ZackMFleischman"
            >
                See more on LinkedIn
            </a>
        );
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["work"] as IWorkSection,
    };
};

export const Work = connect(mapStateToProps)(WorkComponent);
