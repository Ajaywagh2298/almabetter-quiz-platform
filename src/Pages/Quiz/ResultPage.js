import React, { useRef } from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {resetQuiz} from "../../ReduxController/Actions/ActionsScript";
import "../CSS/ResultPage.css"
import MilitaryTechSharpIcon from '@mui/icons-material/MilitaryTechSharp';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import RotateLeftOutlinedIcon from '@mui/icons-material/RotateLeftOutlined';
import {Button} from "@mui/material";
function ResultPage(props) {
    // const results = useSelector((state) => state.reducer.answers);
    const results = useSelector((state) => state.reducer.answers) || []
    const mapped = results.map((el) => el.isCorrect); //array of isCorrect values(either true or false)

    const navigate = useNavigate();
    const disptach = useDispatch();
    const printRef = useRef(null);

    const resetQuizHandler = () => {
        disptach(resetQuiz());
        navigate("/");
    };
    const printCertificate = () => {
        const printStylesheet = document.createElement("link");
        printStylesheet.setAttribute("rel", "stylesheet");
        printStylesheet.setAttribute("type", "text/css");
        printStylesheet.setAttribute("href", "../CSS/PrintView.css");

        // Append the print stylesheet to the document head
        document.head.appendChild(printStylesheet);

        // Print the page
        window.print();

        // Remove the print stylesheet after printing
        document.head.removeChild(printStylesheet);
    };
    return (
        <div>
            <div className="result-container" ref={printRef}>
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
            <div className={'footer-btn'}>
                    <Button className={'btn'} variant="outlined" color="warning" style={{color:'#283747',marginRight:'2%'}}
                        onClick={() => resetQuizHandler()}>
                       <RotateLeftOutlinedIcon /> Reset Quiz
                    </Button>
                <Button className={'btn-print'} variant="outlined" color="success" style={{color:'#283747'}} onClick={() => printCertificate()}>
                   <LocalPrintshopOutlinedIcon/> Print Certificate
                </Button>
            </div>
        </div>
    );
}

export default ResultPage;
