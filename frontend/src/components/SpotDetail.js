import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleSpot } from "../store/spots";
import { fetchAllReviews } from "../store/reviews";
import * as sessionActions from "../store/session";
import OpenModelButton from "./AppHeader/SignupLoginMenuButton/OpenModalButton";
import ReviewFormModal from "./ReviewFormModal";
import OpenModalButton from "../components/AppHeader/SignupLoginMenuButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";

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
    dispatch(fetchAllReviews(spotId));
  }, [dispatch, spotId]);

  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId, reviews]);

  useEffect(() => {
    // restore session user thunk action, if success
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);

  const spotReviews = Object.values(reviews.spot);
  //console.log(" inside spotdetail spotReviews: ", spotReviews);
  //console.log(" inside spotdetail sessionUser: ", sessionUser);
  let isReviewedBySessionUser;
  if (sessionUser) {
    isReviewedBySessionUser = spotReviews.find(
      (review) => review.userId === sessionUser.id
    );
  }

  let postReviewButton;
  if (
    sessionUser &&
    sessionUser.id !== spots.singleSpot.ownerId &&
    isReviewedBySessionUser === undefined
  ) {
    postReviewButton = (
      <OpenModelButton
        buttonText="Post Your Review"
        modalComponent={
          <ReviewFormModal spotId={spotId} spotName={spots.singleSpot.name} />
        }
      />
    );
    // postReviewButton = <button>Post Your Review</button>;
  }

  if (!spots.singleSpot || !spots.singleSpot.SpotImages) {
    return null;
  }

  let reviewStr;
  if (spots.singleSpot) {
    if (spots.singleSpot.numReviews >= 2) {
      reviewStr = `${spots.singleSpot?.numReviews} reviews`;
    } else {
      reviewStr = `${spots.singleSpot?.numReviews} review`;
    }
  }
  if (spots !== {} && spots !== null && spots !== undefined)
    return (
      <>
        <div className="SpotDetail-all-outer-container">
          <div className="SpotDetail-all-container">
            <div className="SpotDetail-page-title">
              <h1>{`${spots.singleSpot?.name}`}</h1>
              <h2>{`${spots.singleSpot?.city}, ${spots.singleSpot?.state}, ${spots.singleSpot?.country}`}</h2>
            </div>
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
            <div className="spot-detail-price-star-container">
              <div></div>
              <div className="spot-detail-price-star-reserve-box">
                <div className="spot-detail-price-star-box">
                  <div>{`$${spots.singleSpot?.price} night`}</div>
                  <div>
                    <i className="fa-sharp fa-solid fa-star fa-sm"></i>
                    {`${spots.singleSpot?.avgStarRating}`}
                  </div>
                </div>
                <button>Reserve</button>
              </div>
            </div>
            <div className="spot-detail-star-review-button-box">
              <div className="spot-detail-star-review-box">
                <div>
                  <i className="fa-sharp fa-solid fa-star fa-sm"></i>
                  {`${spots.singleSpot?.avgStarRating}`}
                </div>
                <div>{reviewStr}</div>
              </div>
              {postReviewButton}
            </div>
            <div className="spot-detail-review-container">
              {spotReviews.map((el, idx) => (
                <div key={idx}>
                  <div className="spot-detail-review-detail">
                    {el.User.firstName}
                  </div>
                  {sessionUser?.id === el.userId && (
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={el.id} />}
                    />
                  )}
                  <div className="spot-detail-review-detail">
                    {el.createdAt.slice(0, 10)}
                  </div>
                  <div className="spot-detail-review-detail">{el.review}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  else return null;
}

export default SpotDetail;
