import * as React from "react";
import CSS from "@Sass/styles.scss";

interface ITitleProps {
    title: string;
}

export default class Title extends React.Component<ITitleProps> {
    public render() {
        return (
            <span className={ CSS.title }>{ this.props.title }</span>
        );
    }
}
