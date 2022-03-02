import BaseService from "./BaseService";
import {FetchError, FormObject, QuestionObject} from "../typings";
import {useDispatch} from "react-redux";

const URL = 'http://httpbin.org/post'



export default class QuestionsService extends BaseService {
    static async postQuestion(question: FormObject, date: Date): Promise<Response | FetchError> {
        question.date = date;
        const options = {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(question)
        };
        return this.request(URL, options)
    }
}
