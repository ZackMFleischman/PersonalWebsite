import * as React from "react";
import CSS from "@Sass/styles.scss";

export default class Footer extends React.Component {
    public render() {
        return (
            <div className={ CSS.footer } >
                <span>©  Zack M Fleischman (2019) - </span>
                <a href="https://github.com/ZackMFleischman/PersonalWebsite">source code</a>
            </div>
        );
    }
}
