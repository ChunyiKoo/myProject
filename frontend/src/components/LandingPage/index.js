import React, { useEffect } from "react";
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
            <img className="Spots-photo" src={`${spot.previewImage}`} />
            <div className="Spots-info-text-container">
              <div className="small-text">{`${spot.city}, ${spot.state}`}</div>
              <div className="small-text">{`${spot.avgRating}`}</div>
            </div>
            <div className="Spots-price small-text">{`$${spot.price}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
