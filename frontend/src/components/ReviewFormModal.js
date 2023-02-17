// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
import { createAReview } from "../store/reviews";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(3);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    console.log(
      "Review form modal before dispatch createAReview { review, stars }, spotId: ",
      { review, stars },
      spotId
    );
    return dispatch(createAReview({ review, stars }, spotId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // const fillDemo = () => {
  //   setCredential("demo@user.io");
  //   setPassword("password");
  // };

  return (
    <div className="review-form-header">
      <div>
        <h1>How was your stay?</h1>
      </div>
      <form className="review-form" onSubmit={handleSubmit}>
        <div>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
        <textarea
          type="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        GeneralStar
        <label>
          star
          <input
            type="number"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        <button className="review-form-submit-button" type="submit">
          Submit Your Review
        </button>
      </form>
      {/* <div className="login-demo-user" onClick={() => fillDemo()}>
        Demo User
      </div> */}
    </div>
  );
}

export default ReviewFormModal;
