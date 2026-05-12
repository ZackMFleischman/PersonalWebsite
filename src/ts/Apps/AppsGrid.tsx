import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { IApp } from "../Redux/IModels";
import CSS from "@Sass/apps.scss";

interface IAppsGridProps {
    apps: IApp[];
}

interface IAppsGridState {
    query: string;
}

export class AppsGridComponent extends React.Component<IAppsGridProps, IAppsGridState> {
    public state: IAppsGridState = {
        query: ""
    };

    public componentDidMount() {
        document.title = "Apps · Zack M Fleischman";
    }

    public render() {
        const filtered = this._getFilteredApps();

        return (
            <div className={ CSS.appsPage }>
                <header className={ CSS.appsHeader }>
                    <a href="/" className={ CSS.appsHome }>← Home</a>
                    <h1 className={ CSS.appsTitle }>Apps</h1>
                    <input
                        type="search"
                        className={ CSS.appsSearch }
                        placeholder="Search apps…"
                        value={ this.state.query }
                        onChange={ this._onSearch }
                        autoFocus={ true }
                    />
                </header>

                { filtered.length === 0
                    ? <div className={ CSS.appsEmpty }>No apps match “{ this.state.query }”.</div>
                    : (
                        <ul className={ CSS.appsGrid }>
                            { filtered.map(app => this._renderCard(app)) }
                        </ul>
                    )
                }
            </div>
        );
    }

    private _renderCard(app: IApp): JSX.Element {
        const thumbStyle: React.CSSProperties = app.thumbnailUrl
            ? { backgroundImage: `url(${app.thumbnailUrl})` }
            : app.thumbnailGradient
                ? { background: `linear-gradient(135deg, ${app.thumbnailGradient[0]}, ${app.thumbnailGradient[1]})` }
                : { background: "linear-gradient(135deg, #444, #888)" };

        return (
            <li key={ app.slug } className={ CSS.appCardItem }>
                <a href={ `/apps/${app.slug}/` } className={ CSS.appCardLink }>
                    <div className={ CSS.appCardThumb } style={ thumbStyle }>
                        { !app.thumbnailUrl && (
                            <span className={ CSS.appCardThumbLabel }>{ app.name }</span>
                        ) }
                    </div>
                    <div className={ CSS.appCardBody }>
                        <h3 className={ CSS.appCardName }>{ app.name }</h3>
                        <p className={ CSS.appCardDesc }>{ app.description }</p>
                    </div>
                </a>
                { app.githubUrl && (
                    <a
                        href={ app.githubUrl }
                        className={ CSS.appCardGithub }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={ this._stopPropagation }
                        aria-label={ `${app.name} on GitHub` }
                    >
                        GitHub
                    </a>
                ) }
            </li>
        );
    }

    private _onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ query: event.target.value });
    }

    private _stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    }

    private _getFilteredApps(): IApp[] {
        const query = this.state.query.trim().toLowerCase();
        if (query.length === 0) {
            return this.props.apps;
        }
        return this.props.apps.filter(app => {
            const haystack = [
                app.name,
                app.description,
                app.slug,
                ...(app.tags || [])
            ].join(" ").toLowerCase();
            return haystack.indexOf(query) !== -1;
        });
    }
}

const mapStateToProps = (state: IStoreModel) => ({
    apps: state.apps
});

export const AppsGrid = connect(mapStateToProps)(AppsGridComponent);
