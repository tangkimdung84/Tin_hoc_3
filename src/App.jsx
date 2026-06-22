import "./firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Achievements from "./pages/Achievements";
import LessonDetail from "./pages/LessonDetail";
import MouseGame from "./pages/MouseGame";
import TypingGame from "./pages/TypingGame";
import LessonStudy from "./pages/LessonStudy";
import Quiz from "./pages/Quiz";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Practice1 from "./pages/Practice1";
import QuizList from "./pages/QuizList";
import QuizMenu from "./pages/QuizMenu";




function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/lessons" element={<Lessons />} />

        <Route
          path="/achievements"
          element={<Achievements />}
        />
        
        <Route
          path="/lesson-detail"
           element={<LessonDetail />}
           />
        <Route
          path="/mouse-game"
          element={<MouseGame />}
        />
        <Route
          path="/typing-game"
            element={<TypingGame />}
        />

                
        
        <Route
          path="/profile"
            element={<Profile />}
/>

        <Route  path="/register"
          element={<Register />}
/>
<Route
  path="/lesson/:id"
  element={<LessonDetail />}
/>

<Route
  path="/practice/1"
  element={<Practice1 />}
/>

<Route
  path="/quizzes"
  element={<QuizList />}
/>

<Route
  path="/quiz"
  element={<QuizMenu />}
/>


<Route
  path="/quiz/:id"
  element={<Quiz />}
/>



      </Routes>

    </BrowserRouter>
  );
}

export default App;