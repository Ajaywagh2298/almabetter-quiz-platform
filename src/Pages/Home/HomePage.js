import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import { Link } from "react-router-dom";
import create from "../Image/p3.jpg";
import  myQuiz  from "../Image/p2.jpg";
import play  from "../Image/p1.jpg";
import "../CSS/Home.css"
import InfoPage from "../Component/Other/InfoPage";

const HomePage = () => {
    return (
        <>
        <div>
            <div style={{marginTop:"13%"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",flexWrap:"wrap"}}>
                    <Card className={'btn-card'} sx={{ maxWidth: 350, marginTop:"20px",textDecoration:"none", borderRadius:"20px", boxShadow:"2px 2px 4px #34495E"} } component={Link} to={"/create-new"}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={create}
                                alt="create quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif",color:'#34495E'}} >
                                    Create New Quiz
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card  className={'btn-card'} sx={{ maxWidth: 350,marginTop:"20px",textDecoration:"none",borderRadius:"20px", boxShadow:"2px 2px 4px #34495E" }} component={Link} to={"/my-quiz"}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={myQuiz}
                                alt="my quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif",color:'#34495E'}}>
                                    My Quizzes
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card className={'btn-card'} sx={{ maxWidth: 350, marginTop:"20px",textDecoration:"none", borderRadius:"20px", boxShadow:"2px 2px 4px #34495E"}} component={Link} to={"/play-quiz"}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={play}
                                alt="play quiz"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{textAlign:"center",fontFamily:"sans-serif",color:'#34495E'}}>
                                    Play Quiz
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </div>
        </div>
    <div className={'bgAnimation'}>
       <InfoPage/>
    </div>
    </>
    )
}
export default HomePage;