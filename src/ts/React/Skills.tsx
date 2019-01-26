import * as React from "react";
import { connect } from "react-redux";
import IStoreModel, { ISkillsSection } from "@Redux/IModels";
import CSS from "@Sass/styles.scss";
import Title from "@React/Title";
import SkillsGroup from "@React/SkillsGroup";

interface ISkillsProps {
    skillsModel: ISkillsSection;
}

export class SkillsComponent extends React.Component<ISkillsProps> {
    public render() {
        return (
            <div id={ this.props.skillsModel.id } className={ CSS.skills } >
                <Title title={ this.props.skillsModel.title } />
                <div className={ CSS.skillGroupsContainer }>
                    { this._getSkillsGroups() }
                </div>
            </div>
        );
    }

    private _getSkillsGroups(): JSX.Element[] {
        return this.props.skillsModel.skillGroups.map((skillsGroup, index) => {
            return (<SkillsGroup key={ index } skillsGroup={ skillsGroup } />);
        });
    }
}

const mapStateToProps = (state: IStoreModel) => {
    return {
        skillsModel: state.sections["skills"] as ISkillsSection,
    };
};

export const Skills = connect(mapStateToProps)(SkillsComponent);
