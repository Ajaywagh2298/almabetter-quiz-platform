import React from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {resetQuiz} from "../../ReduxController/Actions/ActionsScript";
import "../CSS/ResultPage.css"
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';
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
    setTimeout(() => {
        resetQuizHandler();
    }   , 5000);
    return (
        <div>
            <div className="result-container">
                <div className="outer-border">
                    <div className="inner-dotted-border">
                        <div className={'result-header'}>
                            <MilitaryTechSharpIcon style={{fontSize:'70px',color:'#EC7063'}}/>
                            <p>
                                Certificate of Completion
                            </p>
                        </div>
                        <div>
                            <div className={'result-body'}>
                                <div >
                                    <p className={'body-text'}>
                                        This Is To Certify That
                                    </p>
                                    <p className={'player-name'}>
                                        {props.name}
                                    </p>
                                    <p className={'body-text'} style={{margin:'2%'}}>
                                        Has Successfully Completed The Quiz.
                                    </p>
                                    <p className={'quiz-title-1'}>
                                       " {props.title} "
                                    </p>
                                    <p className={'body-text'}>
                                        With Score Of {mapped.filter((el) => el === true).length} Out Of {mapped.length}
                                        with {mapped.filter((el) => el === true).length / mapped.length * 100}%
                                        Accuracy.
                                    </p>
                                </div>
                            </div>
                            <div className={'result-footer'}>
                                <p className={'footer-text'}>
                                    Date: {new Date().toLocaleDateString()}
                                </p>
                                <p className={'footer-text-2'}>
                                    <span style={{fontSize:'16px',fontFamily:'monospace'}}>
                                        ALMA-BEETER QUIZ APP
                                    </span> <br/>
                                    Signature
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;
