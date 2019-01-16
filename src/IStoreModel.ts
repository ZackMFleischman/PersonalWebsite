interface IMap<T> {
    [key: string]: T;
}

interface ISection {
    id: string;
    menuTitle: string;
    title: string;
    subtitle?: string;
}

interface IJob {
    product: string;
    company: string;
    title: string
    description: string;
    imageUrl: string;
}

interface IProject {
    title: string
    description: string
    imageUrl: string
    sourceCodeUrl: string
}

interface IAboutSection extends ISection {
    greeting: string;
    backgroundImage: string;
}

interface IWorkSection extends ISection {
    jobs: IJob[];
}

interface IProjectsSection extends ISection {
    projects: IProject[];
}

interface ISkill {
    skillName: string;
    url?: string;
}

interface ISkillsGroup {
    title: string;
    skills: ISkill[];
}

interface ISkillsSection extends ISection {
    skillGroups: ISkillsGroup[]
}

interface ISocialMedia {
    id: string;
    label: string;
    url: string;
    icon: string;
}

interface ISocialMediaMap extends IMap<ISocialMedia> { }
interface ISectionMap extends IMap<ISection> { }


interface IConnectSection extends ISection {
    hireMe: string[]; // ISocialMediaIds
    followMe: string[]; // ISocialMediaIds
    emailMe: string; // ZackMFleischman@gmail.com
}

export default interface IStoreModel {
    sectionsToRender: string[];
    sections: ISectionMap;
    socialMedia: ISocialMediaMap;
}



