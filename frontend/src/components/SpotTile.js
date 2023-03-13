import { NavLink } from "react-router-dom";

function SpotTile({ spot }) {
  return (
    <>
      <NavLink exact to={`/spots/${spot.id}`}>
        <div className="Spots-photo-container">
          <img className="Spots-photo" src={`${spot.previewImage}`} />
        </div>
      </NavLink>
      <div className="Spots-info-text-container">
        <div className="small-text">{`${spot.city}, ${spot.state}`}</div>
        <div className="small-text">
          <i className="fa-sharp fa-solid fa-star fa-sm"></i>
          {`${spot.avgRating}`}
        </div>
      </div>
      <div className="Spots-current-price small-text">{`$${spot.price} night`}</div>
    </>
  );
}
export default SpotTile;
