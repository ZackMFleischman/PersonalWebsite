
import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { ISection } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IMenuProps {
    menuItems: string[];
}

export class MenuComponent extends React.Component<IMenuProps> {
    public render() {
        return (
            <div className={ CSS.menu }>
                { this._getMenuItems() }
            </div>
        );
    }
    private _getMenuItems(): JSX.Element[] {
        return this.props.menuItems.map((item, index) => {
            return (<span key={ index } className={ CSS.menuItem }> { item }</ span>);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        menuItems: state.sectionsToRender.map(sectionID => {
            const section: ISection = state.sections[sectionID];
            return section.menuTitle;
        })
    };
};

export const Menu = connect(mapStateToProps)(MenuComponent);
