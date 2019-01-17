import * as React from "react";
import { ISkillsGroup } from "../Redux/IModels";
import CSS from "@Sass/styles.scss";

interface ISkillsGroupProps {
    skillsGroup: ISkillsGroup;
}

export default class SkillsGroup extends React.Component<ISkillsGroupProps> {
    public render() {
        const skillsGroup: ISkillsGroup = this.props.skillsGroup;
        return (
            <div className={ CSS.skillsGroup } >
                <span className={ CSS.skillGroupTitle }>{ skillsGroup.title }</span>
                <ul key="skillList">
                    { this._getSkills() }
                </ul>
            </div>
        );
    }

    private _getSkills(): JSX.Element[] {
        return this.props.skillsGroup.skills.map((skill, index) => {
            return (<li key={ index } className={ CSS.skill }>{ skill.skillName }</li>);
        });
    }
}
