import './App.css';
import {Route, Routes} from "react-router-dom";
import Error from "./Pages/Error/ErrorPage";
import Home from "./Pages/Home/HomePage";
import NavbarComponent from "./Pages/Component/Navbar/NavbarComponent";
import PlayQuizPage from "./Pages/Quiz/playQuizPage";

function App() {
  return (
      <div  >
          <NavbarComponent/>
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/play-quiz" element={<PlayQuizPage/>} />
          <Route path='*' element={<Error />}/>
        </Routes>
      </div>
  );
}

export default App;
