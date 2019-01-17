import * as React from "react";
import { connect } from "react-redux";
import IStoreModel from "../Redux/IModels";
import CSS from "@Sass/styles.scss";
import { About } from "@React/About";
import { Menu } from "@React/Menu";
import { Work } from "@React/Work";
import { Projects } from "@React/Projects";
import { Skills } from "@React/Skills";

interface IWebsiteProps {
    model: IStoreModel;
}

export class WebsiteComponent extends React.Component<IWebsiteProps> {
    public static buttonText: string = "[Button Text]";
    public render() {
        return (
            <div>
                <Menu />
                <About />
                <Work />
                <Projects />
                <Skills />
                <div className={ CSS.websiteClass }>
                    { this._getButton(1) }
                    { this._getButton(2) }
                    { this._getButton(3) }
                </div>
            </div>
        );
    }

    private _getButton(num: number): JSX.Element {
        return (
            <button className={ CSS.buttonClass } onClick={ this._onClick }>
                { WebsiteComponent.buttonText + num }
            </button>
        );
    }

    protected _onClick = (mouseEvent?: React.MouseEvent<HTMLElement>) => {
        console.log("Button Pressed");
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state
    };
};

export const Website = connect(mapStateToProps)(WebsiteComponent);
