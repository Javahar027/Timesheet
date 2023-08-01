import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Login from "./User/login";
import UserLandPage from "./pages/userLandPage";

function App() {
  return (
  
   <Router>
        <Routes>
          <Route path="/" element={<Login/>}/> 
          <Route path="/userLandPage" element={<UserLandPage/>}/> 
          

        </Routes>
      </Router>
  );
}

export default App;
