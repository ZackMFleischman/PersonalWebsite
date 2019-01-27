import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection } from "@Redux/IModels";
import Job from "@React/Job";
import Section from "@React/Section";

export class WorkComponent extends Section<IWorkSection> {
    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        return this.props.model.jobs.map((jobModel, index) => {
            return (<Job key={ index } jobModel={ jobModel } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["work"] as IWorkSection,
    };
};

export const Work = connect(mapStateToProps)(WorkComponent);
