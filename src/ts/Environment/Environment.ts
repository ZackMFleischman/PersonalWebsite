// These are declared in our webpack config under `webpack.DefinePlugin`
declare const Webpack: {
    ENVIRONMENT: string;
    CONFIG_SERVER_URL: string;
    BASE_PATH: string;
};

export default class Environment {
    public static isProd(): boolean {
        return Webpack.ENVIRONMENT === "production";
    }

    public static getConfigServer(): string {
        return Webpack.CONFIG_SERVER_URL;
    }

    // Base path the site is served under, formatted for react-router's
    // `basename` (no trailing slash; "" at the domain root). "/" in production,
    // "/pr-preview/pr-N" for a PR preview deploy.
    public static getBasePath(): string {
        return Webpack.BASE_PATH.replace(/\/$/, "");
    }
}
