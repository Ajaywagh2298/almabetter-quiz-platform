import React from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getName, playQuiz } from '../../ReduxController/Actions/ActionsScript';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {CardActionArea, TextField} from '@mui/material';
import "../CSS/PlayQuiz.css"
import queFound from "../Image/queFound.png"
const PlayQuizPage = () => {

   const quiz = useSelector((state) => state.reducer.quiz);

    const name = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const play = (id) => {  //this function will run when the card is clicked.
        if (name.current.value === "") {
            //alert("Please enter a name!");

            return (
                <div id="InfoBanner">
                    <span className="reversed reversedRight">
                        <span>&#9888;</span>
                    </span>
                    <span className="reversed reversedLeft">
                            Please enter a name!
                    </span>
            </div>);
        }
        if(name.current.value.length<5 || name.current.value>50){
            return alert("Enter a valid name between 5 and 50 characters!")
        }
        else{
            dispatch(getName(name.current.value));
            dispatch(playQuiz(id));
            navigate("/quiz");
        }
    }

   return (

        <div style={{marginTop:"100px"}} >
            <div className="mainContainer">
                <div className="heading" sx={{marginBottom:'2%'}}>
                    <h1 >PLAY QUIZ</h1>
                </div>
                <div className="quiz-description" style={{textAlign:"center",fontFamily:"sans-serif"}}>
                    <h4>Enter your name and select the quiz you want to play.</h4>
                    <div className="input-name">
                        <div className="quiz-name">
                            <TextField
                                required
                                className="user-name"
                                id="outlined-required"
                                label="Enter Player Name"
                                placeholder={"....."}
                                autoFocus
                                ref={name}
                            />
                        </div>
                    </div>
                    <div className="created-quiz">
                        {quiz.length === 0
                            ?
                            <img src={queFound} className={'question-found'} alt={'Question Not Found'}/>
                            :<div style={{display:"flex", flexDirection:"row",justifyContent:"space-around",flexWrap:"wrap"}}>
                                {quiz.filter((el) => el.isActive === true)
                                    .map((el) => (
                                        <Card onClick={()=>{play(el.id)}} sx={{ width: 250, marginTop:"20px", textDecoration:"none", borderRadius:"10px", boxShadow:"2px 2px 4px black" }} key={el.id}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center"}}>
                                                        <h4>{el.title}</h4>
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>

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
