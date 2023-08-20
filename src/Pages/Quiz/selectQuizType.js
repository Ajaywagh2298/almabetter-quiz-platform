import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import CreateQuizPage from "./CreateQuizPage.js";



//Popup modal code for choosing the type of question

const SelectQuizType = () => {
    const [popup, setPopup] = useState(true);

    //When MCQ is selected, this function will be carried out

    const popupfunc = () => {
        setPopup(false);
    };

    return (
        <div style={{ marginTop: "100px" }}>


            {
      /*If popup=true ( initial state), a dialogue box will appear.
       false, the "CreateQuizPage" will be rendered.
     */}
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
                                width: "35%",
                            },
                        }}
                    >
                        <DialogTitle id="responsive-dialog-title" style={{ marginLeft: "5%" }}>
                            {"Select Question Type to Proceed"}
                        </DialogTitle>
                        <DialogActions sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Button onClick={popupfunc} variant="outlined"
                                style={{
                                    color: "#868686",
                                    border: "2px solid #1ABC9C",
                                    fontWeight: "500",
                                    boxShadow: "2px 2px 4px #F4E3FF",
                                    marginBottom: "6px",
                                    padding: "0 0 0 0px",
                                    width: "70%"
                                }}>
                                MCQ(Single Correct)
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
                : <CreateQuizPage />
            }
        </div>
    );
};

export default SelectQuizType;
