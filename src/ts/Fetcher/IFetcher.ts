export default interface IFetcher {
    fetchYamlAsInterface<I>(url: string): Promise<I>;
}
