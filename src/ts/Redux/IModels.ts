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
    demoUrl?: string;
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

export interface IApp {
    slug: string;
    name: string;
    description: string;
    embedUrl: string;
    githubUrl?: string;
    thumbnailUrl?: string;
    thumbnailGradient?: [string, string];
    tags?: string[];
    // When true, the app opens in its own tab instead of being embedded in an
    // iframe. Required for full PWAs whose sign-in (e.g. Firebase Google OAuth)
    // breaks under a cross-origin iframe's partitioned third-party storage.
    external?: boolean;
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
    apps: IApp[];
}

export const emptyStore: IStoreModel = {
    sectionsToRender: [],
    sections: {},
    socialMedia: {},
    apps: []
};
