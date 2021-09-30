import "./App.css";
import Login from "./Pages/Login/Login";
import Header from "./Commons/Header/Header";
import Footer from "./Commons/Footer/Footer";
import CreateUser from "./Pages/CreateUser/CreateUser";
import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Router/>
      <Footer />
    </div>
  );
}

export default App;
