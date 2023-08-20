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
import { styled } from '@mui/material/styles';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';
import queFound from "../Image/queFound.png"


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));



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
      <div className="head">
        <h2>MY QUIZ</h2>
        <Button 
          component={Link}
          to={"/create-new"}
          variant="outlined" 
          
        >
          Create New quiz
        </Button>
      </div>
    
    {/*If modal is true then show the warning popup message*/}
      {modal === true ? (      
        <div className="deleteouter">
        <div className="deleteModal" >
          <h2>Do you really want to delete this!?</h2>
          <p>Deleting this would lead to permanent loss of the quiz.</p>
          <div className="delbtn">
          <Button variant="contained" onClick={() => deleteYes()}>Yes</Button>{" "}  {/**if i clicked yes button then delete the quiz */}
          <Button sx={{marginLeft:"10px"}} variant="contained" onClick={() => setModal(false)}>No</Button>{/**if i clicked the no button then set the modal value to false which will close the modal */}
          </div>
        </div>
        </div>
      ) : (
        <div className="all-quiz-container">
          {Quiz.length === 0 ? (          //show this message when there are no quiz otherwise show the list of quizzes.
           <img src={queFound} className={'question-found'} alt={'Question Not Found'}/>
          ) : (
            <div className="table">
              <table>
                <thead>

                <tr className="tre tableHead">
                  <th>Quiz No.</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Created On</th>
                  <th>Actions</th>
                </tr>
              
                </thead>
                {Quiz.map((el, i) => (
                  <tbody key={i}>
                  <tr className="tre">
                    <td >{i + 1}</td>
                    <td className="ti">{el.title}</td>
                  <td>
                    <div className="switch" onClick={()=>toggleHandler(el.id)} >{el.isActive?<span>{<FormControlLabel control={<Android12Switch defaultChecked />} label="Android 12"/>}</span>:<span>{<FormControlLabel control={<Android12Switch defaultChecked />} label="Android 12"/>}</span>}  </div>
            </td>
               <td>
                      {el.createdOn.getDate()}/{el.createdOn.getMonth()}/
                      {el.createdOn.getFullYear()} {el.createdOn.getHours()}:
                      {el.createdOn.getMinutes()}
                    </td>
                    <td>
                      <Button
                        variant="text"
                        onClick={() => handleDelete(el.id)}
                      >
                        <DeleteIcon color="error"/>
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                ))}
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyQuiz;
