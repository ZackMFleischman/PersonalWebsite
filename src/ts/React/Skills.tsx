import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { ISkillsSection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import SkillsGroup from "@React/SkillsGroup";
import Section from "@React/Section";

export class SkillsComponent extends Section<ISkillsSection> {
    protected _getSectionContent(): JSX.Element | JSX.Element[] {
        return (
            <div className={ CSS.skillGroupsContainer }>
                { this._getSkillsGroups() }
            </div>
        );
    }

    private _getSkillsGroups(): JSX.Element[] {
        return this.props.model.skillGroups.map((skillsGroup, index) => {
            return (<SkillsGroup key={ index } skillsGroup={ skillsGroup } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        model: state.sections["skills"] as ISkillsSection,
    };
};

export const Skills = connect(mapStateToProps)(SkillsComponent);
