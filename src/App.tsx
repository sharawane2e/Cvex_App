import { Introduction } from "./components/Introduction/index";
import Login from "./components/Login/index";
import GI from "./components/GI";
import ThankYou from "./components/ThankYou";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="ui container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cvex-intro" element={<Introduction />} />
          {/* <Route path="/general-information" element={<GI />} /> */}
          <Route path="/Thank-You" element={<ThankYou />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
