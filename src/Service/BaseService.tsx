import {FetchError} from "../typings";

export default class BaseService {
    static async parseResponse(response: Response): Promise<any | FetchError> {
        const { status }: { status: number } = response;
        const realResp = await response.json();
        if (status < 200 || status >= 300) {
            if (status === 401) {
                console.error("bad response", status)
            }
            return { error: { status, message: JSON.stringify(realResp.detail) } };
        }
        return realResp;
    }

    static request(url: string, options?: object) {
        return fetch(url, options).then(response => this.parseResponse(response));
    }
}