import React,{ useState} from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getName, playQuiz } from '../../ReduxController/Actions/ActionsScript';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Dialog} from '@mui/material';
import {Alert,AlertTitle} from '@mui/material';
import "../CSS/PlayQuiz.css"
import queFound from "../Image/queFound.png"
import CourseCard from "../Component/Other/CourseCard";
import {ColorsArray}from "../Component/Other/Properties";
const PlayQuizPage = () => {

   const quiz = useSelector((state) => state.reducer.quiz);

    const name = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(true);

    const play = (id) => {  //this function will run when the card is clicked.
        if (name.current.value === "") {
            alert("Please enter a name!");
        }
        if(name.current.value.length<5 || name.current.value>50){
            return alert("Enter a valid name between 5 and 50 characters!")
        }
        else{
            dispatch(getName(name.current.value));
            dispatch(playQuiz(id));
           navigate("/quiz-run");
        }
    }
    setTimeout(() => {
        setShowAlert(false);
    }, 5000);
   return (
        <div style={{marginTop:"100px"}} >
            <div className="mainContainer">
                <Dialog open={showAlert} sx={{padding:'10px'}}>
                    <Alert severity="info" className={'quiz-info'} ><AlertTitle style={{color:'#3498DB',margin:'5px'}}>Info</AlertTitle> <p >Enter your name and select the quiz you want to play.</p> </Alert>
                </Dialog>
                <div className="heading" sx={{marginBottom:'2%'}}>
                    <h1 >PLAY QUIZ</h1>
                </div>
                <div className="quiz-description" style={{textAlign:"center",fontFamily:"sans-serif"}}>
                    <div className="input-name">
                        <div className="quiz-name 2">
                            <input
                                required
                                className="user-name"
                                placeholder="Enter Player Name"
                                autoFocus
                                ref={name} />
                        </div>
                    </div>
                    <div className="created-quiz">
                        {quiz.length === 0
                            ?
                            <img src={queFound} className={'question-found'} alt={'Question Not Found'}/>
                            :<div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
                                {quiz.filter((el) => el.isActive === true)
                                    .map((el, index) => (
                                       <CourseCard onClick={()=>{play(el.id)}} key={el.id} data={el} color={ColorsArray[index % ColorsArray.length]} />
                                    ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlayQuizPage;
