// frontend/src/components/ReviewFormModal.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { createAReview } from "../store/reviews";
import StarRating from "./StarRating";

function ReviewFormModal({ spotId, spotName }) {
  const [run, setRun] = useState(false);
  const dispatch = useDispatch();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (!showErr) setShowErr(true);
    console.log(
      "Review form modal before dispatch createAReview { review, stars }, spotId: ",
      { review: review.trim().length, stars },
      spotId
    );

    if (run) {
      return dispatch(createAReview({ review, stars }, spotId))
        .then((review) => {
          console.log(" ReviewFormModal right after dispatch: review ", review);
          closeModal();
        })
        .catch(async (res) => {
          const data = await res.json();
          console.log("**********data", data);
          if (data && data.message) {
            if (data.errors) setErrors(data.errors);
          } else {
            setErrors({ ...data.message });
          }
          //******error is inside message key
        });
    }
  };

  useEffect(() => {
    let errs = [];
    if (showErr) setDisabled(true);
    if (review?.trim().length < 10 || review?.trim().length > 250)
      errs.push("Review needs to be between 10 and 250 characters");
    if (stars < 1) errs.push("Stars is required");

    if (showErr) {
      if (errs.length === 0) setDisabled(false);
      if (run === false) setRun(true);
      setErrors(errs);
    } else {
      if (errs.length === 0) setRun(true);
      else setRun(false);
    }
  }, [stars, review, showErr]);

  return (
    <div className="review-form-header">
      <div>
        <h2>How was your stay at {`${spotName}`}?</h2>
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <div>
          <ul>
            {errors?.map((error, idx) => (
              <li className="error-message" key={idx}>
                {error}
              </li>
            ))}
          </ul>
          {/*<p className="error-message">{errors[0]}</p>}
          {/* {<p className="error-message">{errors?.review}</p>}
          {<p className="error-message">{errors?.stars}</p>} */}
        </div>
        <div>
          {<p className="error-message">{errors?.review}</p>}
          {<p className="error-message">{errors?.message}</p>}
          {<p className="error-message">{errors?.stars}</p>}
        </div>

        <textarea
          type="textarea"
          value={review}
          placeholder="Leave your review here..."
          onChange={(e) => {
            setReview(e.target.value);
            // e.target.value.length >= 10
            //   ? setDisabled(false)
            //   : setDisabled(true);
          }}
          //required
        />
        <div>
          <StarRating value={stars} onChange={(value) => setStars(value)} />
        </div>
        <button
          className={
            !disabled
              ? "review-form-submit-button"
              : "review-form-submit-button disabled-button"
          }
          disabled={disabled}
          type="submit"
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
