import { ExtendableError } from "ts-error";

export class FetchError extends ExtendableError {
    constructor(responseCode: number, url: string) {
        super(`Fetch request unsuccessful! \nResponse Code: ${responseCode} \nResponse URL: ${url}`);
    }
}

export class FetchConnectionError extends ExtendableError {
    constructor(message: string, url: string) {
        super(`Fetch failed due to network error/server did not respond. \nUrl: ${url} \nError: ${message}`);
    }
}

export class FileSystemFetchError extends ExtendableError {
    constructor(url: string, error: Error) {
        super(`FileSystem fetch unsuccessful!\nURL: ${url}, Error: ${error.message}`);
    }
}
