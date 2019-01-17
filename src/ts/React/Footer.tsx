import * as React from "react";
import CSS from "@Sass/styles.scss";

export default class Footer extends React.Component {
    public render() {
        return (
            <div className={ CSS.footer } >
                <span>Copyright: Zack M Fleischman (2019)</span>
            </div>
        );
    }
}
