import './App.css';
import TopFiveMovies from "./TopFiveMovies";
import TopFiveActors from "./TopFiveActors";

function App() {
  return (
    <div className="Homepage">
      <header className="Header">
        <div className="CenterLogo">
          <img src="filmbookLogo.png" className="filmbookLogo" alt="logo"></img>
          <h1><b>filmbook</b></h1>
        </div>
      </header>

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
    </div>
  );
}

export default App;
