import * as yamlJS from "js-yaml";
import IFetcher from "@Fetcher/IFetcher";
import { FetchError, FetchConnectionError } from "@Fetcher/FetchErrors";
import Environment from "@Environment/Environment";

export default class Fetcher implements IFetcher {
    public fetchYamlAsInterface<I>(url: string): Promise<I> {
        return this._fetchYaml(url)
            .then(yaml => yamlJS.safeLoad(yaml) as I);
    }

    protected _fetchYaml(url: string): Promise<string> {
        const fullUrl: string = Environment.getConfigServer() + url;
        return window.fetch(fullUrl)
            .then(this._handleFetchResponse)
            .catch(error => this._throwFetchError(error, url));
    }

    private _handleFetchResponse(response: Response): Promise<string> {
        if (response.ok)
            return response.text();
        else
            throw new FetchError(response.status, response.url);
    }

    protected _throwFetchError(error: Error, url: string): never {
        let errorToThrow: Error = error;

        if (!(error instanceof FetchError))
            errorToThrow = new FetchConnectionError(error.message, url);

        throw errorToThrow;
    }
}
