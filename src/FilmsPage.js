import React, { useEffect, useState } from "react";
import "./FilmsPage.css";

// Setting up our states
function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [curPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [filmInfo, setFilmInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filmsOnPage = 20;

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/filmsTable?page=${curPage}`)
      .then((res) => res.json())
      .then((data) => {
        setFilms(data.films);
        setTotal(data.total);
      })
      .catch((err) => console.error(err));
  }, [curPage]);

  const maxPage = Math.ceil(total / filmsOnPage);

  const filmClicked = (film) => {
    setSelectedFilm(film);
    setShowModal(true);
    fetch(`http://127.0.0.1:5000/film/${film.film_id}`)
      .then((res) => res.json())
      .then((data) => setFilmInfo(data))
      .catch((err) => console.error(err));
  };

  // Modal is clicked close, no film is selected or film info
  const modalClose = () => {
    setShowModal(false);
    setSelectedFilm(null);
    setFilmInfo(null);
  };

  return (
    <div className="filmsPage">
      <h1>All Films</h1>
      <table className="filmsTable">
        <thead>
          <tr>
            <th>Film ID</th>
            <th>Title</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr 
              key={film.film_id} 
              onClick={() => filmClicked(film)}
              className="filmRowClicked"
            >
              <td>{film.film_id}</td>
              <td>{film.title}</td>
              <td>{film.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Area, we want pages to be gray when they cannot go back/forward */}
      <div className="pagination">
        <button onClick={() => setPage(1)} disabled={curPage === 1}>First</button>
        <button onClick={() => setPage(curPage - 1)} disabled={curPage === 1}>Previous</button>
        <span> Page {curPage} of {maxPage} </span>
        <button onClick={() => setPage(curPage + 1)} disabled={curPage === maxPage}>Next</button>
        <button onClick={() => setPage(maxPage)} disabled={curPage === maxPage}>Last</button>
      </div>

      {/* Modal with film details */}
      {selectedFilm && showModal && filmInfo && (
        <div className="modalOutside" onClick={modalClose}>
          <div
            className="modalContent"
            onClick={(inside) => inside.stopPropagation()}
          >
            <button className="closeButton" onClick={modalClose}>X</button>

            <h2>{filmInfo.film.title}</h2>
            <p><b>Film ID:</b> {filmInfo.film.film_id}</p>
            <p><b>Category:</b> {filmInfo.film.category}</p>
            <p><b>Release Year:</b> {filmInfo.film.release_year}</p>
            <p><b>Length:</b> {filmInfo.film.length} minutes</p>
            <p><b>Rating:</b> {filmInfo.film.rating}</p>
            <p><b>Language:</b> {filmInfo.film.language}</p>
            <p><b>Rental Rate:</b> ${filmInfo.film.rental_rate}</p>
            <p><b>Replacement Cost:</b> ${filmInfo.film.replacement_cost}</p>
            { /*<p><b>Rentals:</b> {filmInfo.film.rental_count}</p> */ }
            <p><b>Description:</b> {filmInfo.film.description}</p>

            <h2>Actors:</h2>
            <ul className="actorsList">
              {filmInfo.actors.map((actor) => (
                <li key={actor.actor_id}>
                  {actor.first_name} {actor.last_name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilmsPage;