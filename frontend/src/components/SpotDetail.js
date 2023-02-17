import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import * as sessionActions from "../store/session";
import OpenModelButton from "./AppHeader/SignupLoginMenuButton/OpenModalButton";
import ReviewFormModal from "./ReviewFormModal";

function SpotDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  const params = useParams();
  const { spotId } = params;
  let spots = useSelector((state) => state.spots);
  //const spot = spots.singleSpot[spotId];
  //const [spotId, setSpotId] = useState("");

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  console.log("SpotDetail spotId,spots: ", spotId, spots);

  useEffect(() => {
    // restore session user thunk action, if success
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);
  let postReviewButton;
  if (sessionUser) {
    postReviewButton = (
      <OpenModelButton
        buttonText="Post Your Review"
        modalComponent={<ReviewFormModal spotId={spotId} />}
      />
    );
    // postReviewButton = <button>Post Your Review</button>;
  }

  if (spots !== {} && spots !== null && spots !== undefined)
    return (
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
        <div>
          <div>{`review count: ${spots.singleSpot[spotId]?.numReviews}`}</div>
          {postReviewButton}
        </div>
      </>
    );
  else return null;
}

export default SpotDetail;
