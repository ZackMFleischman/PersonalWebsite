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
                <img className={ CSS.jobImage } src={ this.props.jobModel.imageUrl } />
                <div className={ CSS.jobDetailsContainer }>
                    <div>
                        <span className={ CSS.jobProduct }>{ job.company }</span>
                        <span className={ CSS.jobCompany }>  -  { job.product }</span>
                    </div>
                    <span className={ CSS.jobTitle }>{ job.title }</span>
                    <pre
                        className={ CSS.jobDescription }
                        dangerouslySetInnerHTML={ { __html: job.description } }
                    />

                    { this._getJobDemo() }
                </div>
            </div>
        );
    }

    private _getJobDemo(): JSX.Element {
        if (this.props.jobModel.demoUrl !== undefined)
            return (
                <div className={ CSS.linksContainer }>
                    <a href={ this.props.jobModel.demoUrl }>Demo</a>
                </div>
            );
        else
            return <div />;
    }
}
