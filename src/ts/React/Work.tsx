import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IWorkSection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";
import Job from "@React/Job";

interface IWorkProps {
    workModel: IWorkSection;
}

export class WorkComponent extends React.Component<IWorkProps> {
    public render() {
        return (
            <div id={ this.props.workModel.id } className={ CSS.work } >
                <Title title={ this.props.workModel.title } />
                { this._getJobComponents() }
            </div>
        );
    }

    private _getJobComponents(): JSX.Element[] {
        return this.props.workModel.jobs.map((jobModel, index) => {
            return (<Job key={ index } jobModel={ jobModel } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        workModel: state.sections["work"] as IWorkSection,
    };
};

export const Work = connect(mapStateToProps)(WorkComponent);
