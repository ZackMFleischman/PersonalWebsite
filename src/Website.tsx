import { IUIModel } from "@ModelLayer/Models/UIModels/MainUIModels";
import CategoryPane from "@Views/UIViews/CategoryPane";
import ClientBrandingLogoView from "@Views/UIViews/ClientBrandingLogoView";
import NavigationPane from "@Views/UIViews/NavigationPaneView";
import OptionPaneContainerView from "@Views/UIViews/OptionPane/OptionPaneContainer";
import * as React from "react";
import CartPreviewPane from "@Views/UIViews/CartPreviewPane";
import IWorldModel from "@Redux/Models/IWorldModel";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import IActionWithPayload from "@Redux/Actions/ActionInterfaces/IActionInterfaces";
import IStoreModel from "./IStoreModel";

interface IWebsiteProps {
    model: IStoreModel;
    dispatch: Dispatch<IActionWithPayload>;
}

export class WebsiteComponent extends React.Component<IWebsiteProps, IUIModel> {
    public render() {
        return [
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
        ];
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state
    };
};

export const Website = connect(mapStateToProps)(WebsiteComponent);