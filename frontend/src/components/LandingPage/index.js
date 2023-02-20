import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";

function LandingPage() {
  const dispatch = useDispatch();

  const return_spots = useSelector((state) => state.spots.allSpots);

  const spots = Object.values(return_spots);

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  console.log("LandingPage spots: ", spots);

  return (
    <div className="Landing-page-container">
      <div className="Landing-page">
        {spots.map((spot) => (
          <div className="Spots-info-container" key={`${spot.id}`}>
            <NavLink exact to={`/spots/${spot.id}`}>
              <div className="Spots-photo-container">
                <img className="Spots-photo" src={`${spot.previewImage}`} />
              </div>
            </NavLink>
            <div className="Spots-info-text-container">
              <div className="small-text">{`${spot.name}`}</div>
              <div className="small-text">
                <i className="fa-sharp fa-solid fa-star fa-sm"></i>
                {`${spot.avgRating}`}
              </div>
            </div>
            <div className="Spots-price small-text">{`$${spot.price} night`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
