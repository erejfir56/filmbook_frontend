import React, { useEffect, useState } from "react";
import "./FilmsPage.css";

// Setting up our states
function FilmsPage() {
  const [films, setFilms] = useState([]);
  const [curPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
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
            <tr key={film.film_id}>
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
    </div>
  );
}

export default FilmsPage;
