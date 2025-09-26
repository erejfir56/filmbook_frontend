import React, { useEffect, useState } from "react";
import "./TopFiveMovies.css";

// Setting up our states
function TopFiveMovies() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetches top five movies, throws err if it can't
  useEffect(() => {
    fetch("http://127.0.0.1:5000/topFiveMovies")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  // Sets the selected movie, modal will pop up
  const movieClicked = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  // Modal is clicked close, no movie is selected
  const modalClose = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  // returns the Top Five Movies and their rental count
  return (
    <div>
      <h1>Top Five Movies</h1>

      <div className="moviesContainer">
        {movies.map((movie, i) => (
          <div
            key={i}
            className="moviesBox"
            onClick={() => movieClicked(movie)}
          >
            <h3>{movie.title}</h3>
            <p>{movie.rentals} rentals</p>
          </div>
        ))}
      </div>


      {/* When both states are true, show modal and display all attributes about the movie and rental. */}
      {selectedMovie && showModal && (
        <div className="modalOutside" onClick={modalClose}>
          <div
            className="modalContent"
            onClick={(inside) => inside.stopPropagation()}
          >
            <button onClick={modalClose}>X</button>
            <h2>{selectedMovie.title}</h2>
            <p><b>Rentals:</b> {selectedMovie.rentals}</p>
            <p><b>Rating:</b> {selectedMovie.rating}</p>
            <p><b>Length:</b> {selectedMovie.length} minutes</p>
            <p><b>Release Year:</b> {selectedMovie.release_year}</p>
            <p><b>Description:</b> {selectedMovie.description}</p>
            <p><b>Language ID:</b> {selectedMovie.language_id}</p>
            <p><b>Replacement Cost:</b> {selectedMovie.replacement_cost}</p>
            <p><b>Rental Rate:</b> {selectedMovie.rental_rate}</p>
            <p><b>Special Features:</b> {selectedMovie.special_features}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopFiveMovies;
