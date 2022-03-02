import React, {useEffect} from 'react';
import './App.css';
import {SingleComment} from "./Components/SingleComment/SingleComment";
import {Form} from "./Components/Form/Form";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/questionReducer";


function App() {

    const questions = useSelector((state: RootState) => state.questions);

    return (
        <div className="App">
            <div className="wrapper">
                <div className="question_section">
                    {questions && questions.map((question: any) =>(
                        <SingleComment question={question} />
                    ))}
                </div>

                <Form></Form>
            </div>

        </div>
    );
}

export default App;
