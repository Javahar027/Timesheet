import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./context/UserProvider";
import AppRouter from "./routes";

function App() {

  return (
    <UserProvider>
      <Router>
        <AppRouter/>
      </Router>
    </UserProvider>
  );
}

export default App;
