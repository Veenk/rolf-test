import BaseService from "./BaseService";
import {FetchError, FormObject} from "../typings";
import {request} from "http";

// const postComments = () => {
//     return new Promise<Response | FetchError>((resolve, reject) => {
//         this.request()
//     });
// };
const URL = 'http://httpbin.org/post'
export default class AboutService extends BaseService {
    static async postQuestion(question: FormObject, date: Date): Promise<Response | FetchError> {
        const options = {
            method: 'POST',
            mode: 'cors',
        };
        return this.request(URL, options)
    }
}
