
import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { ISection } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface IMenuItem {
    id: string;
    title: string;
    url?: string;
}

interface IMenuProps {
    menuItems: IMenuItem[];
}

interface IMenuState {
    menuOpen: boolean;
}

export class MenuComponent extends React.Component<IMenuProps, IMenuState> {
    constructor(props: IMenuProps) {
        super(props);

        this.state = {
            menuOpen: false
        };
    }

    public render() {
        return (
            <div>
                <div className={ CSS.menu }>
                    { this._getMenuItems() }
                    { this._getHamburgerMenu() }
                    { this._getHamburgerIcon() }
                </div>
            </div>
        );
    }

    private _getHamburgerMenu(): JSX.Element {
        return (
            <div className={ `${CSS.hamburgerMenuContainer} ${this.state.menuOpen ? CSS.menuOpen : ""}` }>
                { this._getMenuItems() }
            </div >

        );
    }

    private _getHamburgerIcon(): JSX.Element {
        return (
            <div className={ CSS.hamburgerIcon } onClick={ this._toggleHamburgerMenu }>
                <div />
                <div />
                <div />
            </div>
        );
    }

    private _toggleHamburgerMenu = () => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }

    private _collapseMenu = () => {
        this.setState({
            menuOpen: false
        });
    }

    private _getMenuItems(): JSX.Element[] {
        return this.props.menuItems.map((item, index) => {
            return (
                <a
                    href={ item.url ? item.url : "#" + item.id }
                    key={ index }
                    className={ CSS.menuItem }
                    onClick={ this._collapseMenu }
                >
                    { item.title }
                </ a>
            );
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    const sectionMenuItems = state.sectionsToRender.map(sectionID => {
            const section: ISection = state.sections[sectionID];
            return {
                id: section.id,
                title: section.menuTitle
            };
        }).filter(menuItem => menuItem.title !== undefined) as IMenuItem[];

    const resumeMenuItem = {
      id: "resume",
      title: "Resumé",
      url: "../../assets/pdfs/ZackMFleischmanResume.pdf"
    };

    return {
        menuItems: [
          ...sectionMenuItems,
          resumeMenuItem
        ]
    };
};

export const Menu = connect(mapStateToProps)(MenuComponent);
