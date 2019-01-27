import * as React from "react";
import { ISection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";

export interface ISectionProps<T> {
    model: T;
}

export default abstract class Section<T extends ISection, S extends ISectionProps<T> = ISectionProps<T>>
    extends React.Component<S> {
    public render() {
        return (
            <div id={ this.props.model.id } className={ CSS.section }>
                <Title title={ this.props.model.title } />
                { this._getSectionContent() }
            </div>
        );
    }

    protected abstract _getSectionContent(): JSX.Element | JSX.Element[];
}
