import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loginpb from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";
import ProfilePage from "./screens/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/login" element={<Loginpb />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
