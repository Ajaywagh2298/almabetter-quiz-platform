import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {resetQuiz} from "../../ReduxController/Actions/ActionsScript";
import "../CSS/ResultPage.css"

function ResultPage(props) {
    const results = useSelector((state) => state.reducer.answers); //retrieving the array of selected answers
    const mapped = results.map((el) => el.isCorrect); //array of isCorrect values(either true or false)

    const navigate = useNavigate(); //to navigate to other route
    const disptach = useDispatch(); //to dispatch action

    //this func will run when "Done" button is clicked
    const resetQuizHandler = () => {
        disptach(resetQuiz());
        navigate("/");
    };
    return (
        <div>
            <div className="result-container">
                <div className="result-heading">
                    <p className={'result-heading-text'}>Certificate Of Completion</p>
                </div>
                <div className="result-body">
                    <p className={'small-text'}>This is Awarded to</p>
                    <p className={'player-name'}>{props.name}</p>
                    <p className={'info-text'}>
                        For Successfully Completing the Quiz
                    </p>
                    <p>{props.title}</p>
                    <p className={'info-text'}>
                        With a Score of {mapped.filter((el) => el === true).length} out
                        of {mapped.length} with {mapped.filter((el) => el === true).length / mapped.length * 100}%
                        accuracy
                    </p>
                    <div className={'issued-name'}>
                        <p className={'date'}>
                            Date : {new Date().toDateString()}
                        </p>
                        <p >
                            Issued By : ALMA BETTER
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ResultPage;
