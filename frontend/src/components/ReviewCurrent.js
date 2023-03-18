import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrentReviews } from "../store/reviews";
import OpenModalButton from "../components/AppHeader/SignupLoginMenuButton/OpenModalButton";
import DeleteReviewModal from "./DeleteReviewModal";

function ReviewCurrent() {
  const dispatch = useDispatch();

  //fetchAllCurrentReviews

  useEffect(() => {
    dispatch(fetchAllCurrentReviews());
  }, [dispatch]);

  const reviews = useSelector((state) => state.reviews);
  console.log("ReviewCurrent fetchAllCurrentReviews reviews:", reviews);

  const userReviews = Object.values(reviews.user);

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

  if (userReviews) {
    console.log("userReviews.length", userReviews.length);
    if (userReviews.length === 0) {
      return (
        <div className="SpotDetail-all-outer-container">
          <div>
            <h2>Manage Reviews</h2>
          </div>
          <p>Please visit a spot to post a review.</p>
        </div>
      );
    } else {
      return (
        <>
          <div className="SpotDetail-all-outer-container">
            <div>
              <h2>Manage Reviews</h2>
            </div>
            <div className="spot-detail-review-container">
              {userReviews.reverse().map((el, idx) => (
                <div className="review-current-detail-box" key={idx}>
                  <div className="spot-detail-review-detail">
                    {el.Spot.name}
                  </div>

                  <div className="spot-detail-review-detail">
                    {months[el.createdAt.slice(5, 7)] +
                      ", " +
                      el.createdAt.slice(0, 4)}
                  </div>
                  <div className="spot-detail-review-detail">{el.review}</div>

                  <OpenModalButton
                    someN="review-delete-button"
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal reviewId={el.id} />}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  } else
    return (
      <div className="SpotDetail-all-outer-container">
        <div>
          <h2>Manage Reviews</h2>
        </div>
        <p>Unable to retrieve details. Please try again shortly.</p>
      </div>
    );
}

export default ReviewCurrent;
