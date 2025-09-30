import React, { useEffect, useState } from "react";
import "./TopFiveActors.css"

// TO DO: Rentals is not working rn on the actor modal finish another day.


// Setting up our states
function TopFiveActors() {
  const [actors, setActors] = useState([]);
  const [selectedActor, setSelectedActor] = useState(null);
  const [actorInfo, setActorInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetches top five actors, throws err if it can't
  useEffect(() => {
    fetch("http://127.0.0.1:5000/topFiveActors")
      .then((res) => res.json())
      .then((data) => setActors(data))
      .catch((err) => console.error(err));
  }, []);

  // Sets the selected actor, modal will pop up and fetches actor info 
  const actorClicked = (actor) => {
    setSelectedActor(actor);
    setShowModal(true);
    fetch(`http://127.0.0.1:5000/actor/${actor.actor_id}`)
      .then((res) => res.json())
      .then((data) => setActorInfo(data))
      .catch((err) => console.error(err));
  };

  // Modal is clicked close, no actor is selected or actor info
  const modalClose = () => {
    setShowModal(false);
    setSelectedActor(null);
    setActorInfo(null);
  };

  // returns the Top Five Actors first + last name, their movie count
  return (
    <div className="Actors">
      <h1>Top Five Actors</h1>

      <div className="actorsContainer">
        {actors.map((actor, i) => (
          <div
            key={i}
            className="actorsBox"
            onClick={() => actorClicked(actor)}
          >
            <h3>{actor.first_name} {actor.last_name}</h3>
            <p>{actor.film_count} films</p>
          </div>
        ))}
      </div>

      {/* When all states are true, show modal and actor ID and Rentals */}
      {selectedActor && showModal && actorInfo && (
        <div className="modalOutside" onClick={modalClose}>
          <div
            className="modalContent"
            onClick={(inside) => inside.stopPropagation()}
          >
            <button onClick={modalClose}>X</button>

            <h2>{actorInfo.actor.first_name} {actorInfo.actor.last_name}</h2>
            <p><b>Actor ID:</b> {actorInfo.actor.actor_id}</p>
            

            {/* Modal will also display top 5 films the actor is in and the movies rental count. */}
            <h3>Top 5 Films:</h3>
            <ol className="filmsList">
              {actorInfo.top_films.map((film, i) => (
                <li key={i}>
                  {film.title} - Rentals: {film.rentals}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopFiveActors;