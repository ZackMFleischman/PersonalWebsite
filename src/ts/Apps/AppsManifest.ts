export interface IAppEntry {
    slug: string;
    name: string;
    description: string;
    embedUrl: string;
    githubUrl?: string;
    thumbnailUrl?: string;
    thumbnailGradient?: [string, string];
    tags?: string[];
}

const APPS: IAppEntry[] = [
    {
        slug: "mandelbrot-explorer",
        name: "Mandelbrot Explorer",
        description: "Interactive zoomable visualizer for the Mandelbrot Set fractal.",
        embedUrl: "https://zack-fleischman-org.github.io/mandelbrot-explorer/",
        githubUrl: "https://github.com/zack-fleischman-org/mandelbrot-explorer",
        thumbnailUrl: "../../assets/images/mandelbrot.jpg",
        tags: ["fractal", "math", "visualization", "webgl"]
    },
    {
        slug: "radials",
        name: "Radials",
        description: "A generative geometric drawing toy.",
        embedUrl: "https://radials.net",
        thumbnailGradient: ["#222244", "#6f42c1"],
        tags: ["generative", "art", "drawing"]
    }
];

export function getApps(): IAppEntry[] {
    return APPS;
}

export function getAppBySlug(slug: string): IAppEntry | undefined {
    return APPS.find(a => a.slug === slug);
}
