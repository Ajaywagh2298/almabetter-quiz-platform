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
            
           outline: "none",
           borderRadius: "10px",
           boxShadow: "2px 2px 4px white",
           width:"30%",
          },
        }}
      >
        <DialogTitle id="responsive-dialog-title" style={{marginLeft:"5%"}}>
          {"Select Question Type to Proceed"}
        </DialogTitle>
               <DialogActions sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                   <Button onClick={popupfunc} variant="outlined" 
                   style={{color:"#868686", 
                         border:"2px solid #CDB7F6", fontWeight:"500", 
                          boxShadow: "2px 2px 4px #F4E3FF",
                           marginBottom:"6px",
                           padding:"0 0 0 0px",width:"70%"}}>
                    MCQ(Single Correct)
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
