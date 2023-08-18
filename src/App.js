import './App.css';
import {Route, Routes} from "react-router-dom";
import Home from "./Pages/Home/HomePage";
import NavbarComponent from "./Pages/Component/Navbar/NavbarComponent";
import PlayQuizPage from "./Pages/Quiz/playQuizPage";
import SelectQuizType from "./Pages/Quiz/selectQuizType";

function App() {
  return (
      <div  >
          <NavbarComponent/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/play-quiz" element={<PlayQuizPage/>} />
          <Route path='/create-new' element={<SelectQuizType/>}/>
        </Routes>
      </div>
  );
}

export default App;
