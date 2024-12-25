import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Homepage from "./components/Homepage";
import AdminPanel from "./components/Adminpanel";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/admin/pussy" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;