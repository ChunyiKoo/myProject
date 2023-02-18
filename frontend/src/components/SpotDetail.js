import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import { fetchAllReviews } from "../store/reviews";
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

  //console.log("SpotDetail spotId,spots: ", spotId, spots);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    // restore session user thunk action, if success
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(fetchAllReviews(spotId));
  }, [dispatch, spotId]);

  const reviews = useSelector((state) => state.reviews);
  const spotReviews = Object.values(reviews.spot);
  const isReviewed = spotReviews.find(
    (review) => review.userId === sessionUser.id
  );

  let postReviewButton;
  if (
    sessionUser &&
    sessionUser.id !== spots.singleSpot.ownerId &&
    isReviewed === undefined
  ) {
    postReviewButton = (
      <OpenModelButton
        buttonText="Post Your Review"
        modalComponent={<ReviewFormModal spotId={spotId} />}
      />
    );
    // postReviewButton = <button>Post Your Review</button>;
  }

  if (!spots.singleSpot || !spots.singleSpot.SpotImages) {
    return null;
  }

  if (spots !== {} && spots !== null && spots !== undefined)
    return (
      <>
        <div>
          <div className="SpotDetail-all-outer-container">
            <h1>{`${spots.singleSpot?.name}`}</h1>
            <div className="SpotDetail-all-photo-container">
              <div className="SpotDetail-all-photo-box">
                {spots.singleSpot.SpotImages?.map((image, idx) => (
                  <div
                    key={idx}
                    className={
                      idx === 0
                        ? `SpotDetail-photo-big-box`
                        : `SpotDetail-photo-small-box-${idx}`
                    }
                  >
                    <img
                      key={idx}
                      className={
                        idx === 0 ? `Spots-photo-big` : `Spots-photo-small`
                      }
                      src={`${image.url}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>{`$${spots.singleSpot?.price}`}</div>
            <div>
              <div>{`review count: ${spots.singleSpot?.numReviews}`}</div>
              {postReviewButton}
            </div>
            {spotReviews.map((el, idx) => (
              <div key={idx}>
                <div>{el.User.firstName}</div>
                <div>{el.createdAt}</div>
                <div>{el.review}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  else return null;
}

export default SpotDetail;
