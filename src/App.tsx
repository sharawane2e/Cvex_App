import Route from "./components/Routes/index";
import { Introduction } from "./components/Introduction/index";
import Login from "./components/Login/index";
function App() {
  return (
    <div className="ui container">
      <Route path="/">
        <Login />
      </Route>
      <Route path="/cvex-intro">
        <Introduction />
      </Route>
    </div>
  );
}

export default App;
