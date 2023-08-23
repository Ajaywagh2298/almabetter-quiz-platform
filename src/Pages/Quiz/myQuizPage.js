import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "../CSS/MyQuiz.css"
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteQuiz,toggleActive } from "../../ReduxController/Actions/ActionsScript";
import { useState } from "react";
import Switch from '@mui/material/Switch';
import queFound from "../Image/queFound.png"
import WarningAmberIcon from '@mui/icons-material/WarningAmber';



//React functional component named MyQuiz
const MyQuiz = () => {

  const dispatch = useDispatch();     //dispatch using for action
  const [modal, setModal] = useState(false);  //this is used for  the delete modal is hide or show.
  const [deleteID, setDeleteID] = useState(); //this is for storing the id of the deleted quiz.


  const handleDelete = (id) => {       //this function is for when delete icon is clicked this function will execute
    setDeleteID(id);
    setModal(true);
  };

  const deleteYes = () => {            //this function will execute when yes button/option is clicked when delete warning Modal is shown
    dispatch(deleteQuiz(deleteID));
    setModal(false);
  };

  const toggleHandler=(id)=>{          //When i clicked the toggle button this function is executed.
 
    dispatch(toggleActive(id))
  }

  const Quiz = useSelector((state) => state.reducer.quiz);   //this function is for getting the data  has stored in redux store

  return (
      <div className="whole" style={{ marginTop: "100px" }}>
        <div className="my-title">
            <p>MY QUIZ</p>
        </div>
        <div className="btn-class">
          <Button
                component={Link}
                to={"/create-new"}
                variant="outlined">
                Create New quiz
              </Button>
        </div>
        {modal === true ? (
            <div className="deleteouter">
              <div className="content">
                <div className="icon" style={{margin:'1%'}}>
                  <WarningAmberIcon style={{color:'#E74C3C',fontSize:'10vh'}}/>
                </div>
                <div className="text">
                  <p className={'title-para'}>Do you really want to delete this!</p>
                  <p> Deleting this would lead to permanent loss of the quiz.</p>
                </div>
              </div>
              <div className={'btn-box'} >
                <button className={'war-btn'} style={{backgroundColor:'#E74C3C',color: '#fff'}} onClick={() => deleteYes()}>Yes</button>
                <button className={'war-btn'}  onClick={() => setModal(false)}>No</button>
              </div>
            </div>
        ) : (
            <div>
              {Quiz.length === 0 ? (
                    <img src={queFound} className={'question-found'} alt={'Question Not Found'}/>
              ) : ( <div className="container-main">
                    <ul className="responsive-table">
                      <li className="table-header">
                        <div className="col">Quiz No.</div>
                        <div className="col col-4">Title</div>
                        <div className="col">Status</div>
                        <div className="col">Created On</div>
                        <div className="col">Actions</div>
                      </li>
                      {Quiz.map((el, i) => (
                          <ul key={i}>
                            <li className="table-row">
                              <div className="col " data-label="Quiz No.">{i + 1} </div>
                              <div className="col col-4" data-label="Title">{ el.title }</div>
                              <div className="col" data-label="Status">
                                  <button style={{backgroundColor:'#fff',border: "none"}} onClick={()=>toggleHandler(el.id)} >{el.isActive?<span><Switch style={{color:'#16A085'}} checked={true}/></span>:<span><Switch style={{color:'#E74C3C'}} checked={false} /></span>}  </button>
                              </div>
                              <div className="col" data-label="Created On">
                                {el.createdOn.getDate()} / {el.createdOn.getMonth()} / {el.createdOn.getFullYear()} {el.createdOn.getHours()}:
                                {el.createdOn.getMinutes()}
                              </div>
                              <div className="col" data-label="Actions">
                                <Button variant="text" onClick={() => handleDelete(el.id)} >
                                  <DeleteIcon style={{color:'#E74C3C'}}/>
                                </Button>
                              </div>
                            </li>
                          </ul>
                      ))}
                    </ul>
                  </div>
              )}
            </div> )}
            </div>
  );
};

export default MyQuiz;