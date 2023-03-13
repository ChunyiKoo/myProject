import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSpots } from "../../store/spots";
import SpotTile from "../SpotTile";

function LandingPage() {
  const dispatch = useDispatch();
  const return_spots = useSelector((state) => state.spots.allSpots);
  console.log("LandingPage useSelector return_spots: ", return_spots);

  const spots = Object.values(return_spots);

  useEffect(() => {
    console.log("LandingPage fetchAllSpots useEffect: ");
    dispatch(fetchAllSpots());
  }, [dispatch]);

  console.log("LandingPage spots: ", spots);
  if (!return_spots)
    return <h1>Unable to retrieve spots. Please try again shortly.</h1>;
  return (
    <div className="Landing-page-container">
      {console.log("LandingPage render: ", spots)}
      <div className="Landing-page">
        {spots.map((spot) => (
          <div className="Spots-info-container" key={`${spot.id}`}>
            <SpotTile spot={spot} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
