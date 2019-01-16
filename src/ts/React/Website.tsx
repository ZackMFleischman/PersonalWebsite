import * as React from "react";
import { connect } from "react-redux";
import IStoreModel from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IWebsiteProps {
    model: IStoreModel;
}

export class WebsiteComponent extends React.Component<IWebsiteProps> {
    public static buttonText: string = "[Button Text]";
    public render() {
        return (
            <div className={ CSS.websiteClass }>
                { this._getButton(1) }
                { this._getButton(2) }
                { this._getButton(3) }
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

    // <ClientBrandingLogoView key={ "ClientBrandingLogo" } />,
    // <NavigationPane key={ "NavigationBar" } />,
    // <CategoryPane key={ "Categories" } uiModel={ this.props.ui } dispatch={ this.props.dispatch } />,
    // (// <---- This linter rule sucks.
    //     <OptionPaneContainerView
    //         key={ "optionPaneContainer" }
    //         uiModel={ this.props.ui }
    //         dispatch={ this.props.dispatch }
    //     />
    // ),
    // <CartPreviewPane key={ "Checkout" } cartPriceTotal={ this._getDummyPrice() } />,
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state
    };
};

export const Website = connect(mapStateToProps)(WebsiteComponent);
