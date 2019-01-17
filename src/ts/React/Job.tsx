import * as React from "react";
import { IJob } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IJobProps {
    jobModel: IJob;
}

export default class Job extends React.Component<IJobProps> {
    public render() {
        const job: IJob = this.props.jobModel;
        return (
            <div className={ CSS.job } >
                <span>{ job.product }, { job.company }</span>
                <span>{ job.title }</span>
                <span>{ job.description }</span>
            </div>
        );
    }
}
