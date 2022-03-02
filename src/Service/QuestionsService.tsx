import BaseService from "./BaseService";
import {FetchError, FormObject} from "../typings";

const URL = 'http://httpbin.org/post'
export default class AboutService extends BaseService {
    static async postQuestion(question: FormObject, date: Date): Promise<Response | FetchError> {
        const options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(question)
        };
        return this.request(URL, options)
    }
}
