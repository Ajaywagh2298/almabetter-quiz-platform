import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswer} from "../../../ReduxController/Actions/ActionsScript";
import {useState} from "react";
import ResultPage from "../../Quiz/ResultPage";
import "../../CSS/QuizCard.css";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const QuizCard = () => {
    const [count, setcount] = useState(0); // count for question number.
    const [showModal, setshowModal] = useState(false); //for showing result if showModal is true
    const [finalAnswer, setfinalAnswer] = useState({});//for storing the answer selected
    const [disable, setDisable] = useState(true); //for disabling and enaling the next question button
    const quiz = useSelector((state) => state.reducer.playQuiz).questions; //for retreiving the quiz questions and answers from redux store
    const title = useSelector((state) => state.reducer.title);//for retrieving the title of the quiz from redux store

    const name = useSelector((state) => state.reducer.name);//for retrieving the name of the user from redux store
    const dispatch = useDispatch(); //for dispatching action

    const question = quiz[count].question; //questions of the selected quiz
    const answers = quiz[count].answers; //answers of the selected quiz's question


    //nexQuestionHAndler function will run when next question button is clicked
    const nextQuestionHandler = () => {
        dispatch(getAnswer(finalAnswer));
        setDisable(true);
        if (count >= quiz.length - 1) {
            setshowModal(true);
            setcount((prev) => prev);
        } else {
            setcount((prev) => prev + 1);

        }
    };

    //onClickHandler will run when option is clicked
    const onclickHandler = (el) => {
        getAnswerHandler(el.answer, el.correct, el.id);
        setDisable(false);
    };

    // when any option/answer is clicked the getAnswerHAndler function will run and store the value of the selected answer
    const getAnswerHandler = (answer, correct, id) => {
        const Answer = {
            answer: answer,
            isCorrect: correct,
            id: id,
        };
        setfinalAnswer(Answer);
    };


    return (
        <div className="outer">
            {showModal ? (
                <ResultPage name={name} title={title}/>
            ) : (
                <div id="container">
                    <div>
                        <h2 className={'quiz-title'}>
                            {title}
                        </h2>
                    </div>
                    <div className={'question-container'}>

                        <div className={'question-index'}>
                            {count + 1}
                        </div>
                        <div className={'question-name'}>{question} </div>
                    </div>
                    <div
                        style={{
                            height: "200px",
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "20px",
                        }}
                    >

                        {answers.map((el, i) => (
                            (i % 2 === 0) ? (
                                <div className="quiz-options-row" key={i} style={{
                                    height: "80px",
                                    display: "flex",
                                    flexDirection: "row",
                                }}>
                                    <div
                                        className="quiz-option-container"
                                        onClick={() => onclickHandler(el)}
                                        style={{
                                            borderColor: `${finalAnswer.id === el.id ? "#2ECC71" : "#5DADE1"}`,
                                            backgroundColor: `${finalAnswer.id === el.id ? "#2ECC71" : "white"}`,
                                            color: `${finalAnswer.id === el.id ? "white" : "black"}`,
                                        }}
                                    >
                                        <p
                                            style={{
                                                margin: "0 10px",
                                                width: "95%",
                                                overflowWrap: "break-word",
                                            }}
                                        >
                                            {el.answer}
                                        </p>
                                    </div>
                                    {/* Check if the next element exists in the array */}
                                    {answers[i + 1] && (
                                        <div
                                            className="quiz-option-container"
                                            onClick={() => onclickHandler(answers[i + 1])}
                                            style={{
                                                borderColor: `${finalAnswer.id === answers[i + 1].id ? "#2ECC71" : "#5DADE1"}`,
                                                backgroundColor: `${finalAnswer.id === answers[i + 1].id ? "#2ECC71" : "white"}`,
                                                color: `${finalAnswer.id === answers[i + 1].id ? "white" : "black"}`,
                                            }}
                                        >
                                            <p
                                                style={{
                                                    margin: "0 10px",
                                                    width: "95%",
                                                    overflowWrap: "break-word",
                                                }}
                                            >
                                                {answers[i + 1].answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : null
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginTop: "20px",
                        }}
                    >
                        <div className={'question-list'}>
                            <h3>
                                {" "}
                                Question {count + 1} / {quiz.length}
                            </h3>
                        </div>
                        <div className="next-question">
                            {disable ? (
                                <button
                                    className={"next-button"}
                                    disabled
                                ><span className={'btn-name'}> Next Question </span> <ArrowCircleRightIcon/>
                                </button>
                            ) : (
                                <button
                                    className={"next-button"}
                                    onClick={nextQuestionHandler}
                                >
                                    <span className={'btn-name'}> Next Question </span> <ArrowCircleRightIcon/>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default QuizCard;