import "./App.css";

import Header from "./Commons/Header/Header";
import Footer from "./Commons/Footer/Footer";

import Router from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import Navegacion from "./Commons/Navegacion/Navegacion";

function App() {
  return (
    <div className="App">
      <Header />
      <Navegacion />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
