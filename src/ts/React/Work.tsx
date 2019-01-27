import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection, ISocialMedia } from "@Redux/IModels";
import Job from "@React/Job";
import Section, { ISectionProps } from "@React/Section";
import CSS from "@Sass/styles.scss";

interface IWorkProps extends ISectionProps<IWorkSection> {
    linkedIn?: ISocialMedia;
}

export class WorkComponent extends Section<IWorkSection, IWorkProps> {
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
        if (this.props.linkedIn !== undefined)
            return (
                <a
                    className={ CSS.seeMoreButton }
                    href={ this.props.linkedIn.url }
                >
                    See more on LinkedIn
                </a >
            );
        else
            return <div />;
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["work"] as IWorkSection,
        linkedIn: "linkedIn" in state.socialMedia ? state.socialMedia["linkedIn"] : undefined
    };
};

export const Work = connect(mapStateToProps)(WorkComponent);
