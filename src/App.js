import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopFiveMovies from "./TopFiveMovies";
import TopFiveActors from "./TopFiveActors";
import FilmsPage from "./FilmsPage";
import CustomersPage from "./CustomersPage";

function App() {
  return (
    <Router>
      <div className="Homepage">
        <header className="Header">
          <div className="CenterLogo">
            <img src="filmbookLogo.png" className="filmbookLogo" alt="logo"></img>
            <div classname= "LogoName">
              <h1><b>filmbook</b></h1>
            </div>
          </div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/films">Films</Link>
            <Link to="/customers">Customers</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={
            <>
              <div className="HomeImage">
                <div className="box1">
                  <img src="movieClapper.png" className="movieClapper" alt="movieClapper"></img>
                </div>
                <div className="box2">
                  <p><b>Top films. Favorite Actors. All in one place.</b></p>
                </div>
              </div>

              <h2>Featured</h2>
              <TopFiveMovies />
              <TopFiveActors />
              <></>
            </>
          } />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/customers" element={<CustomersPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;