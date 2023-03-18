import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrentSpots } from "../store/spots";
import OpenModalButton from "./AppHeader/SignupLoginMenuButton/OpenModalButton";
import DeleteSpotModal from "./DeleteSpotModal";
import SpotTile from "./SpotTile";

function SpotsCurrent() {
  const dispatch = useDispatch();

  const return_spots = useSelector((state) => state.spots.allCurrent);

  const spots = Object.values(return_spots);

  useEffect(() => {
    dispatch(fetchAllCurrentSpots());
  }, [dispatch]);

  console.log("SpotsCurrent spots: ", spots);
  if (!spots) {
    return (
      <div className="SpotDetail-all-container">
        <div className="lag-load">
          <h2>Unable to retrieve spots. Please try again shortly.</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="SpotCurrent-container">
      <div className="SpotCurrent-header-text">
        <div className="SpotCurrent-header-box">
          <h2>Manage Spots</h2>
          {spots.length === 0 && (
            <NavLink
              exact
              to="/spots/new"
              //activeClassName="AppHeader-create-a-spot-link"
            >
              <button className="create-a-spot">Create a New Spot</button>
            </NavLink>
          )}
        </div>
      </div>
      <div className="Landing-page">
        {spots.map((spot) => (
          <div className="Spots-info-container" key={`${spot.id}`}>
            <SpotTile spot={spot} />
            <div className="spot-buttons-box">
              <div>
                <NavLink exact to={`/spots/${spot.id}/edit`}>
                  <button className="spot-button-left spot-buttons">
                    Update
                  </button>
                </NavLink>
              </div>
              <div>
                <OpenModalButton
                  someN="spot-button-right spot-buttons"
                  buttonText="Delete"
                  modalComponent={<DeleteSpotModal spotId={spot.id} />}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpotsCurrent;
