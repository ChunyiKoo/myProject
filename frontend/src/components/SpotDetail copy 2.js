import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, useState } from "react-redux";
import { fetchSingleSpot } from "../store/spots";

function SpotDetail() {
  const params = useParams();
  const { spotId } = params;
  const dispatch = useDispatch();
  let spots = useSelector((state) => state.spots);
  //const spot = spots.singleSpot[spotId];
  //const [spotId, setSpotId] = useState("");
  const SpotInfo = (
    <>
      <h1>{`${spots.singleSpot[spotId]?.name}`}</h1>
      <div>
        <div className="SpotDetail-big-photo"></div>
        <div>
          <div className="SpotDetail-small-photo"></div>
          <div className="SpotDetail-small-photo"></div>
          <div className="SpotDetail-small-photo"></div>
          {/* <div className="SpotDetail-small-photo"></div> */}
        </div>
      </div>
      <div>{`$${spots.singleSpot[spotId]?.price}`}</div>

      <div>{`review count: ${spots.singleSpot[spotId]?.numReviews}`}</div>
    </>
  );
  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  console.log("SpotDetail spotId,spots: ", spotId, spots);

  if (spots !== {} && spots !== null && spots !== undefined) return SpotInfo;
  else return null;
}

export default SpotDetail;
