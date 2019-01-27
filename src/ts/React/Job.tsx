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
                <img className={ CSS.jobImage } src={ this.props.jobModel.imageUrl } alt="IMAGE URL NOT FOUND" />
                <div className={ CSS.jobDetailsContainer }>
                    <div>
                        <span className={ CSS.jobProduct }>{ job.company }</span>
                        <span className={ CSS.jobCompany }>  -  { job.product }</span>
                    </div>
                    <span className={ CSS.jobTitle }>{ job.title }</span>
                    <pre className={ CSS.jobDescription }>{ job.description }</pre>
                </div>
            </div>
        );
    }
}
