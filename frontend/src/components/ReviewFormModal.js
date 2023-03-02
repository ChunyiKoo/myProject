// frontend/src/components/ReviewFormModal.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { createAReview } from "../store/reviews";
import StarsRating from "react-star-rate";

function ReviewFormModal({ spotId, spotName }) {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(0);
  //const [hover, setHover] = useState(null);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();

  const handleStarClick = (nextValue, prevValue, name) => {
    setRating(nextValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    console.log(
      "Review form modal before dispatch createAReview { review, stars }, spotId: ",
      { review, stars },
      spotId
    );

    dispatch(createAReview({ review, stars }, spotId))
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
  };

  return (
    <div className="review-form-header">
      <div>
        <h1>How was your stay at {`${spotName}`}?</h1>
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <div>
          {/* <ul className="error-message">
            {errors?.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
          </ul> */}
          {/*<p className="error-message">{errors[0]}</p>}
          {/* {<p className="error-message">{errors?.review}</p>}
          {<p className="error-message">{errors?.stars}</p>} */}
        </div>
        {<p className="error-message">{errors?.review}</p>}
        {<p className="error-message">{errors?.message}</p>}
        {<p className="error-message">{errors?.stars}</p>}
        <textarea
          type="textarea"
          value={review}
          onChange={(e) => {
            setReview(e.target.value);
            e.target.value.length >= 10
              ? setDisabled(false)
              : setDisabled(true);
          }}
          //required
        />
        <div>
          <StarsRating
            value={stars}
            onChange={(value) => {
              value.toFixed();
              setStars(value);
            }}
          />
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
