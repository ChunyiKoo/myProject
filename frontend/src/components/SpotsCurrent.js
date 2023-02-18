import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrentSpots } from "../store/spots";

function SpotsCurrent() {
  const dispatch = useDispatch();

  const return_spots = useSelector((state) => state.spots.allCurrent);

  const spots = Object.values(return_spots);

  useEffect(() => {
    dispatch(fetchAllCurrentSpots());
  }, [dispatch]);

  console.log("SpotsCurrent spots: ", spots);

  return (
    <div className="SpotCurrent-container">
      <div className="SpotCurrent-header-text">
        <div className="SpotCurrent-header-box">
          <h2>Manage Your Spots</h2>
          <NavLink
            style={{ textDecoration: "none", color: "blue" }}
            exact
            to="/spots/new"
            //activeClassName="AppHeader-create-a-spot-link"
          >
            <button>Create a New Spot</button>
          </NavLink>
        </div>
      </div>
      <div className="Landing-page">
        {spots.map((spot) => (
          <div className="Spots-info-container" key={`${spot.id}`}>
            <NavLink exact to={`/spots/${spot.id}`}>
              <div className="Spots-photo-container">
                <img className="Spots-photo" src={`${spot.previewImage}`} />
              </div>
            </NavLink>
            <div className="Spots-info-text-container">
              <div className="small-text">{`${spot.city}, ${spot.state}`}</div>
              <div className="small-text">
                <i className="fa-sharp fa-solid fa-star"></i>
                {`${spot.avgRating}`}
              </div>
            </div>
            <div className="Spots-current-price small-text">
              {`$${spot.price}`}
              <button>Update</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotsCurrent;
