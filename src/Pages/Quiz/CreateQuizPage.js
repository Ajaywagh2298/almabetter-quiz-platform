import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {addQuiz} from '../../ReduxController/Actions/ActionsScript';
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import "../CSS/CreateQuizPage.css";
import Container from '@mui/material/Container';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
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
    
    const onSaveHandler = (event) => {
      event.preventDefault();
    
      if (titleRef.current.value === "" || descriptionRef.current.value === "") {
        return alert("Enter title and description of the quiz!");
      }
      if (question.length === 0) {
        return alert("Add question!");
      }
    
      const Quiz = {
        description: descriptionRef.current.value,
        questions: question,
        title: titleRef.current.value,
        id: Math.random(),
        createdOn: new Date(),
        isActive: true,
      };
    
      const confirmPopup = window.confirm(`Quiz saved successfully!\n\nClick on OK to play the quiz!\nCancel it to view the quiz!`);
      
      if (confirmPopup) {
        // User chose to navigate to "Play Quiz" page
        dispatch(addQuiz(Quiz));
        setCount(1);
        titleRef.current.value = "";
        descriptionRef.current.value = "";
        navigate("/play-quiz");
      } else {
        // User chose to close the pop-up
        dispatch(addQuiz(Quiz));
        setCount(1);
        titleRef.current.value = "";
        descriptionRef.current.value = "";

        //This will redirect the page to create page again(change the code after geting my quiz code)
        navigate("/create-new");
              }
    };

  const deleteHandler = (id) => {     // this function will run when delete button inside options is clicked and return the new filtered array
    const newAnswers = answers.filter((el) => el.id !== id);   
    setAnswers(newAnswers); 
  };

  return (
    <> <div style={{display:'flex',justifyContent:'right'}}>
      { added &&
          <div style={{margin:'10px',height:'60px',width:'200px',justifyContent:'center',alignItems:'center',textAlign:'center',display:'flex',flexDirection:'row'}}>
            <CheckCircleIcon style={{color:'#33CC99',fontSize:'3vh',marginRight:'1%'}}/>
            <span style={{color:'#33CC99',fontSize:'2.0vh'}}>Question Added SuccessFully!</span>
          </div>
      } {/*if added is true show <p>Your question is added!</p>*/}
    </div>
      <div className="heading">
        <h1>CREATE NEW QUIZ</h1>
      </div>
      <div className="outline">
        <div className="quizForm">
          <form action="" onSubmit={onSaveHandler}>
            <div className="upper">
                {/*input for Title*/}
                <Container maxWidth="lg" className="formContainer">
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
              </Container>                      
            </div>
            
          
           <h4>ADD QUIZ QUESTIONS</h4><br/>
           <div className="lower">
           <Container maxWidth="" className="formContainer">
            <div className="QA">
              <label htmlFor="question">QUESTION {count}.</label><br/><br/>
              <input
                type="text "
                className="question"
                placeholder="Enter your question "
                 maxLength={200}
                ref={questionRef}
              />
            </div>     

            <div className="answerSection">
              
              {/*input for options*/}
              <input        
                type="text"
                className="option"
                placeholder="Enter options "
                ref={answerRef}
                variant="outlined"
                style={{outline:"none", height:'40px',border : '2px solid #95A5A6',fontSize: '14px'}}
              />

              {/*check box for selecting correct answer */}
              <div className="checkBox-1"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
              <input
                  type="checkbox"
                  id="cbx"
                  name="correct"
                  className={'checkbox'}
                  ref={CorrectAnswerRef}
                  style={{marginRight:"2%",border:"none", display: "none"}}
                  variant="outlined "
                />
                <label htmlFor="cbx" className="check">
                  <svg width="18px" height="18px" viewBox="0 0 18 18">
                    <path
                        d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                    <polyline points="1 9 7 14 15 4"></polyline>
                  </svg>
                </label>

                <h4 style={{color:"#33CC99",marginLeft:'10px'}}>CORRECT</h4>
                <Button sx={{cursor:"pointer"}}  onClick={addOptionHandler}>
                <AddCircleOutlineOutlinedIcon fontSize="large" variant="contained" style={{color:"#33CC99"}}/>
                </Button>
              </div>
            </div>
             { answerDone &&
                 <div style={{margin:'10px',height:'60px',width:'300px',justifyContent:'center',alignItems:'center',textAlign:'center',display:'flex',flexDirection:'row'}}>
                   <ReportGmailerrorredIcon style={{color:'#E67E22',fontSize:'3vh',marginRight:'1%'}}/>
                   <span style={{color:'#E67E22',fontSize:'2.0vh'}}>Add at Least 2 Options!</span>
                 </div>
             }    {/*if answerDone is true show <p>Add at least 2 answers!</p>*/}
            <div className="viewAnswer">
              {answers.map((el,i) => {        //Mapped the element of array "answers"
                return (
                  <div
                    className="optionlist" key={i}
                    style={
                      el.correct
                        ? { background: "#2ECC71",color:"white",width:"45%",height:'40px', border:"none" }
                        : { background: "white", color:"#282c34",width:"45%" ,height:'40px',border : '2px solid #5DADE1' }
                      } //if correct is checked then show the option's  green otherwise show white
                      
                  >
                    <p style={{overflowWrap:"break-word", width:"100px"}}>{el.answer} </p>
                    <Button
                      size="small"
                      onClick={() => deleteHandler(el.id)}
                      sx={{ height: "50%" }}
                      style={
                      el.correct ? { color :'white'} : { color :'#34495E'}
                      }
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="questionBtn">
              <Button variant="contained #33CC99" onClick={addQuestionHandler}>
      

                ADD QUESTION 
                
                </Button>
            </div>
          </Container>
          </div>
            
               <input style={{cursor:"pointer"}} id="submitBtn" type="submit" value="Submit" variant="contained"/>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateQuizPage;
