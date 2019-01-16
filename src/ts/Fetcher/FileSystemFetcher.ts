import * as fs from "fs";
import { injectable } from "inversify";
import Fetcher from "@Fetcher/Fetcher";
import { FileSystemFetchError } from "@Fetcher/FetchErrors";

@injectable()
export default class FileSystemFetcher extends Fetcher {

    protected _fetchYaml(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => this._readFile(url, resolve, reject));
    }

    private _readFile(filepath: string, resolve: (data: string) => void, reject: (error: Error) => void) {
        fs.readFile(filepath, {}, (error: NodeJS.ErrnoException, data: Buffer) => {
            if (error === null)
                resolve(data.toString());
            else
                reject(new FileSystemFetchError(filepath, error));
        });
    }
}
