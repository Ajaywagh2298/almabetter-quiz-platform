import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CreateQuizPage from "./createQuizPage";


// Popup modal code for selecting question type

const SelectQuizType = () => {
  const [popup, setPopup] = useState(true); 
 
  //Function will be executed when MCQ  will be choosed
  const popupfunc = () => {  
    setPopup(false);
  };

  return (
    <div style={{marginTop:"100px"}}>
   

      {
      /*popup= true(initial state) then a dialoguebox will pop up. false, <NewQuizForm/> will be rendered */}
      {popup ? 
        <div className="container" >
            <Dialog
        open={true}
        aria-labelledby="responsive-dialog-title" 
        PaperProps={{
          style: {
           borderRadius:"20px",
           padding:"5px",
           border:"2px solid #868686",
           outline: "none",
           boxShadow: "0 0 10px  #868686",
           width:"30%",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" style={{color:"#868686",marginLeft:"5%"}}>
          {"Select Question Type to Proceed"}
        </DialogTitle>
               <DialogActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   <Button onClick={popupfunc} variant="outlined" 
                   style={{color:"#868686", 
                   border:"2px solid #1ABC9C", fontWeight:"500", 
                  boxShadow: "0 0 10px  #1ABC9C",
                  padding:"0 0 0 0",width:"70%"}}>
                   </Button>
        </DialogActions>
      </Dialog>
        
         </div>
       : <CreateQuizPage/>
      }
    </div>
  );
};

export default SelectQuizType;
