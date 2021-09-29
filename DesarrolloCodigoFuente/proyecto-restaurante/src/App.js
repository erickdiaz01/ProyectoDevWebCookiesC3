import "./App.css";
import Login from "./Pages/Login/Login";
import Header from "./Commons/Header/Header";
import Footer from "./Commons/Footer/Footer"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Login />
      <Footer/>
    </div>
  );
}

export default App;
