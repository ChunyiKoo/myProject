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
import { clearSingleSpot } from "../store/spots";

function SpotDetail() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;

  //fetchAllReviews for a single spot

  useEffect(() => {
    dispatch(fetchAllReviews(spotId));
  }, [dispatch, spotId]);

  const reviews = useSelector((state) => state.reviews);
  console.log("SpotDetail fetchAllReviews reviews:", reviews);

  //fetchSingleSpot
  let spots = useSelector((state) => state.spots);
  console.log("SpotDetail fetchSingleSpot spots:", spots);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    return () => dispatch(clearSingleSpot());
  }, [dispatch, spotId, reviews]);

  //restore session user
  useEffect(() => {
    // restore session user thunk action, if success
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("SpotDetail restoreUser sessionUser:", sessionUser);

  //retrieve spotReviews
  const spotReviews = Object.values(reviews.spot);

  //
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
        someN="post-your-review-button"
        buttonText="Post Your Review"
        modalComponent={
          <ReviewFormModal spotId={spotId} spotName={spots.singleSpot.name} />
        }
      />
    );
  }
  //
  const months = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  //
  if (!spots.singleSpot || !spots.singleSpot.SpotImages) {
    return (
      <div className="SpotDetail-all-container">
        <div className="lag-load">
          <h2>Unable to retrieve details. Please try again shortly.</h2>
        </div>
      </div>
    );
  }

  let reviewStr;
  let reviewStr2;
  if (spots.singleSpot) {
    if (spots.singleSpot.numReviews >= 2) {
      reviewStr = (
        <>
          <span className="dot-separater">&#x2022;</span>
          {`${spots.singleSpot?.numReviews} reviews`}
        </>
      );
    } else if (spots.singleSpot.numReviews === 0) {
      if (
        sessionUser &&
        sessionUser.id !== spots.singleSpot.ownerId &&
        isReviewedBySessionUser === undefined
      )
        reviewStr2 = (
          <>
            <span className="first-to-review">&#160;&#160;&#160;&#160;</span>Be
            the first to post a review!
          </>
        );
      else reviewStr = null;
    } else {
      reviewStr = (
        <>
          <span className="dot-separater">&#x2022;</span>
          {`${spots.singleSpot?.numReviews} review`}
        </>
      );
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
              {/* <div className="SpotDetail-all-photo-box">
                {spots.singleSpot.SpotImages?.slice(0, 5).map((image, idx) => (
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
              </div> */}
              <div className="SpotDetail-all-photo-box">
                {[0, 1, 2, 3, 4].map((idx) => (
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
                      src={
                        spots.singleSpot.SpotImages[idx]
                          ? `${spots.singleSpot.SpotImages[idx].url}`
                          : "/img/no-image-template.png"
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="spot-detail-price-star-container">
              <div>
                <h2>{`Hosted by ${spots.singleSpot?.Owner.firstName} ${spots.singleSpot?.Owner.lastName}`}</h2>
                <p>{` ${spots.singleSpot?.description}`}</p>
              </div>
              <div className="spot-detail-price-star-reserve-box">
                <div className="spot-detail-price-star-box">
                  <div>{`$${spots.singleSpot?.price} night`}</div>
                  <div>
                    <i className="fa-sharp fa-solid fa-star fa-sm"></i>
                    {`${spots.singleSpot?.avgStarRating}`}
                    {reviewStr}
                  </div>
                </div>
                <button
                  className="spotdetail-reserve-button"
                  onClick={() => alert("Feature coming soon.")}
                >
                  Reserve
                </button>
              </div>
            </div>
            <div className="spot-detail-star-review-button-box">
              <div className="spot-detail-star-review-box">
                <div>
                  <i className="fa-sharp fa-solid fa-star fa-sm"></i>
                  {`${spots.singleSpot?.avgStarRating}`}
                  {reviewStr}
                  {reviewStr2}
                </div>
              </div>
              <div>{postReviewButton}</div>
            </div>
            <div className="spot-detail-review-container">
              {spotReviews.reverse().map((el, idx) => (
                <div className="spot-detail-review-detail-box" key={idx}>
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
                    {months[el.createdAt.slice(5, 7)] +
                      ", " +
                      el.createdAt.slice(0, 4)}
                  </div>
                  <div className="spot-detail-review-detail">{el.review}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  else
    return (
      <div className="SpotDetail-all-container">
        <div className="lag-load">
          <h2>Unable to retrieve details. Please try again shortly.</h2>
        </div>
      </div>
    );
}

export default SpotDetail;
