export interface IMap<T> {
    [key: string]: T;
}

export interface ISection {
    id: string;
    menuTitle?: string;
    title: string;
    subtitle?: string;
}

export interface IJob {
    product: string;
    company: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface IProject {
    title: string;
    description: string;
    imageUrl: string;
    sourceCodeUrl: string;
    demoUrl?: string;
}

export interface IAboutSection extends ISection {
    greeting: string;
    backgroundImage: string;
}

export interface IWorkSection extends ISection {
    jobs: IJob[];
}

export interface IProjectsSection extends ISection {
    projects: IProject[];
}

export interface ISkill {
    skillName: string;
    url?: string;
}

export interface ISkillsGroup {
    title: string;
    skills: ISkill[];
}

export interface ISkillsSection extends ISection {
    skillGroups: ISkillsGroup[];
}

export interface ISocialMedia {
    id: string;
    label: string;
    url: string;
    icon: string;
}

export interface ISocialMediaMap extends IMap<ISocialMedia> { }
export interface ISectionMap extends IMap<ISection> { }

export interface IConnectSection extends ISection {
    hireMe: string[]; // ISocialMediaIds
    followMe: string[]; // ISocialMediaIds
    emailMe: string; // ZackMFleischman@gmail.com
}

export default interface IStoreModel {
    sectionsToRender: string[];
    sections: ISectionMap;
    socialMedia: ISocialMediaMap;
}

export const emptyStore: IStoreModel = {
    sectionsToRender: [],
    sections: {},
    socialMedia: {}
};
