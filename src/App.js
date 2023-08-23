import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/HomePage";
import NavbarComponent from "./Pages/Component/Navbar/NavbarComponent";
import PlayQuizPage from "./Pages/Quiz/playQuizPage";
import SelectQuizType from "./Pages/Quiz/selectQuizType";
import Error from "./Pages/Error/ErrorPage";
import QuizCard from "./Pages/Component/Quiz/QuizCard";
import MyQuiz from "./Pages/Quiz/myQuizPage";

function App() {
    return (
        <div>
            <NavbarComponent/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/play-quiz" element={<PlayQuizPage/>}/>
                <Route path='/create-new' element={<SelectQuizType/>}/>
                <Route path='/quiz-run' element={<QuizCard/>} />
                <Route path="/my-quiz" element={<MyQuiz />} />
                <Route path="*" element={<Error/>}/>
            </Routes>
        </div>
    );
}

export default App;