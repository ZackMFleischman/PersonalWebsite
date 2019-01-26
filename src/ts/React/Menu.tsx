
import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { ISection } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IMenuItem {
    id: string;
    title: string;
}

interface IMenuProps {
    menuItems: IMenuItem[];
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
            return (
                <a
                    href={ "#" + item.id }
                    key={ index }
                    className={ CSS.menuItem }
                >
                    { item.title }
                </ a>
            );
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        menuItems: state.sectionsToRender.map(sectionID => {
            const section: ISection = state.sections[sectionID];
            return {
                id: section.id,
                title: section.menuTitle
            };
        }).filter(menuItem => menuItem.title !== undefined) as IMenuItem[]
    };
};

export const Menu = connect(mapStateToProps)(MenuComponent);
