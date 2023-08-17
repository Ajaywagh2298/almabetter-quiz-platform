import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addQuiz} from '../../ReduxController/Actions/ActionsScript';
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "../CSS/CreateQuizPage.css";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

/*created React functional component named CreateQuizPage*/
const CreateQuizPage = () => {

  /*useRef hook to collect input data*/
  const titleRef = useRef();
  const descriptionRef = useRef();
  const questionRef = useRef();
  const answerRef = useRef();
  const CorrectAnswerRef = useRef();

/*created different states using useState hook*/
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [answerDone, setAnswerDone] = useState(false);
  const [answers, setAnswers] = useState([]);   
  const [question, setQuestion] = useState([]);


  const dispatch = useDispatch(); //to dispatch action
  const navigate = useNavigate(); //to navigate to other component(pages)
  

  useEffect(() => {                     //useEffect hook to run the timout functions when the "added" and "answerDone" changes 
    const addedTimeout = setTimeout(() => {
      if (added) {
        setAdded(false);
      }
    }, 2000);

    const answerDoneTimeout = setTimeout(() => {
      if (answerDone) {
        setAnswerDone(false);
      }
    }, 2000);

    return () => {
      clearTimeout(addedTimeout);
      clearTimeout(answerDoneTimeout);
    };
  }, [added, answerDone]);


    //this function will run when addOption button is clicked

    const addOptionHandler = (event) => {
      event.preventDefault();
      
      if (answerRef.current.value === "") {
        return;
      }
    
      // Check if a correct answer is already added
      const hasCorrectAnswer = answers.some(answer => answer.correct);
      
      if (!hasCorrectAnswer && CorrectAnswerRef.current.checked) {
        const newAnswer = {
          answer: answerRef.current.value,
          correct: true,
          id: Math.random(),
        };
        setAnswers((prev) => [...prev, newAnswer]);
      } else if (!CorrectAnswerRef.current.checked) {
        const newAnswer = {
          answer: answerRef.current.value,
          correct: false,
          id: Math.random(),
        };
        setAnswers((prev) => [...prev, newAnswer]);
      }
    
      answerRef.current.value = "";
      CorrectAnswerRef.current.checked = false;
    };
    

  //this function will run when addQuestion button is clicked

    const addQuestionHandler = (e) => {
      e.preventDefault();
      
      if (questionRef.current.value === "") {
        return alert("Enter question!");
      }
      if (questionRef.current.value.length < 10) {
        return alert("Question must be at least 10 characters long!");
      }
      if (answers.length === 0) {
        return alert("Enter options!");
      }
      
      const hasCorrectAnswer = answers.some(answer => answer.correct);
      
      if (hasCorrectAnswer && answers.length >= 2) {
        const newQuestion = {
          question: questionRef.current.value,
          answers: answers,
          id: count,
        };
        setCount(count + 1);
        setAdded(true);
        setQuestion((prev) => [...prev, newQuestion]);
        setAnswers([]);
        questionRef.current.value = "";
      } else if (!hasCorrectAnswer) {
        return alert("Add a correct answer!");
      } else {
        setAnswerDone(true);
      }
    };
    
  const onSaveHandler = (event) => {     // this function will run when saveButton is clicked
event.preventDefault();
    
    if (titleRef.current.value === "" || descriptionRef.current.value === "") {
      return alert("Enter title and description");
    }
    if(question.length === 0){
      return alert("Add questions!")
    }
    
    const Quiz = {
      description: descriptionRef.current.value,
      questions: question,
      title: titleRef.current.value,
      id: Math.random(),
      createdOn: new Date(),
      isActive: true,
    };

    dispatch(addQuiz(Quiz));
    setCount(1);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    navigate("/play-quiz")
  };

  const deleteHandler = (id) => {     // this function will run when delete button inside options is clicked and return the new filtered array
    const newAnswers = answers.filter((el) => el.id !== id);   
    setAnswers(newAnswers); 
  };

  return (
    <>
      <div className="heading">
        <h1>CREATE NEW QUIZ</h1>
      </div>
      <div className="outline">
        <div className="quizForm">
          <form action="" onSubmit={onSaveHandler}>
            <div className="upper">
                {/*input for Title*/}
              <input
                type="text"
                placeholder="Add Title"
                name="title"
                className="title"
                maxLength={30}
                minLength={10}
                required
                ref={titleRef}
                variant="outlined"
              /> <br/>
              {/*input for description*/}                           
              <input
                type="text"
                className="description"
                placeholder="Add Description"
                required
                ref={descriptionRef}
                variant="outlined"
              />                          
            </div>
           <hr/>
           <h4>ADD QUIZ QUESTIONS</h4>
            <div className="QA">
              <label htmlFor="question">Question {count}:-</label><br/><br/>
              <input
                type="text "
                className="question"
                placeholder="Enter your question "
                 maxLength={200}
                ref={questionRef}
                
              />
              {added && <p> Your question is added! </p>}{/*if added is true show <p>Your question is added!</p>*/}
              {answerDone && <p>Add atleast 2 options!</p>}    {/*if answerDone is true show <p>Add atleast 2 answers!</p>*/} 
            </div>     

            <div className="answerSection">
              
              {/*input for options*/}
              <input        
                type="text"
                className="option"
                placeholder="Enter options "
                ref={answerRef}
                variant="outlined"
              />

              {/*check box for selecting correct answer */}
              <div className="checkBox"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                           
              <input
                  type="checkbox"
                  id="check"
                  name="correct"
                  ref={CorrectAnswerRef}
                style={{marginRight:"10px",border:"none"}}
                variant="outlined"
                />  
                <h3 style={{color:"#DC7AC5"}}>Correct</h3>
                <Button sx={{marginLeft:"10px",cursor:"pointer"}}  onClick={addOptionHandler}>
                <AddCircleOutlineOutlinedIcon fontSize="large" variant="contained" style={{color:"#DC7AC5"}}/>
                </Button>
              </div>
            </div>
            <div className="viewAnswer">
              {answers.map((el,i) => {        //Mapped the element of array "answers"
                return (
                  <div
                    className="option" key={i}
                    style={
                      el.correct
                        ? { background: "#32a84e" }
                        : { background: "#DC7AC5" }   
                      } //if correct is checked then show the option's bakcground as green color else grey.
                      
                  >
                    <p style={{overflowWrap:"break-word", width:"100px"}}>{el.answer} </p>
                    <Button
                      size="small"
                      onClick={() => deleteHandler(el.id)}
                      sx={{ height: "50%", color: "black" }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="questionBtn">
              <Button  onClick={addQuestionHandler}>Add Question </Button>
            </div>
            <hr/>
               <input style={{cursor:"pointer"}} id="submitBtn" type="submit" value="Submit" variant="outlined"/>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuizPage;
