import * as React from "react";
import CSS from "@Sass/apps.scss";

interface IBackChipState {
    visible: boolean;
}

const IDLE_FADE_MS = 2500;

export class BackChip extends React.Component<{}, IBackChipState> {
    private _idleTimer: number | undefined;

    public state: IBackChipState = {
        visible: true
    };

    public componentDidMount() {
        window.addEventListener("mousemove", this._wake);
        window.addEventListener("touchstart", this._wake);
        window.addEventListener("keydown", this._wake);
        this._scheduleIdle();
    }

    public componentWillUnmount() {
        window.removeEventListener("mousemove", this._wake);
        window.removeEventListener("touchstart", this._wake);
        window.removeEventListener("keydown", this._wake);
        if (this._idleTimer !== undefined) {
            window.clearTimeout(this._idleTimer);
        }
    }

    public render() {
        const className = [
            CSS.backChip,
            this.state.visible ? CSS.backChipVisible : CSS.backChipIdle
        ].join(" ");

        return (
            <a
                href="/apps/"
                className={ className }
                onMouseEnter={ this._onHover }
                onFocus={ this._onHover }
                aria-label="Back to all apps"
            >
                <span className={ CSS.backChipArrow }>{"←"}</span>
                <span className={ CSS.backChipLabel }>Apps</span>
            </a>
        );
    }

    private _wake = () => {
        if (!this.state.visible) {
            this.setState({ visible: true });
        }
        this._scheduleIdle();
    }

    private _onHover = () => {
        this.setState({ visible: true });
        this._scheduleIdle();
    }

    private _scheduleIdle = () => {
        if (this._idleTimer !== undefined) {
            window.clearTimeout(this._idleTimer);
        }
        this._idleTimer = window.setTimeout(() => {
            this.setState({ visible: false });
        }, IDLE_FADE_MS);
    }
}
