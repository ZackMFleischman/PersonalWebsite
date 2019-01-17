import * as React from "react";
import { connect } from "react-redux";
import IStoreModel from "../Redux/IModels";
import { About } from "@React/About";
import { Menu } from "@React/Menu";
import { Work } from "@React/Work";
import { Projects } from "@React/Projects";
import { Skills } from "@React/Skills";
import { Connect } from "@React/Connect";
import Footer from "@React/Footer";

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
                <Connect />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state
    };
};

export const Website = connect(mapStateToProps)(WebsiteComponent);
