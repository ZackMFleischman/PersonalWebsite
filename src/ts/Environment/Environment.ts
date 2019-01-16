// These are declared in our webpack config under `webpack.DefinePlugin`
declare const Webpack: {
    ENVIRONMENT: string;
    CONFIG_SERVER_URL: string;
};

export default class Environment {
    public static isProd(): boolean {
        return Webpack.ENVIRONMENT === "production";
    }

    public static getConfigServer(): string {
        return Webpack.CONFIG_SERVER_URL;
    }
}
