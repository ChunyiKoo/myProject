// frontend/src/components/DeleteReviewModal.js
import React, { useState } from "react";
import { deleteASpotReview } from "../store/reviews";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
//import "./LoginForm.css";

function DeleteReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = () => {
    setErrors([]);
    return dispatch(deleteASpotReview(reviewId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        console.log("DeleteReviewModal deleteASpotReview data", data);
        if (data && data.errors) setErrors(data.errors);
        closeModal();
      });
  };

  return (
    <div className="delete-review-form-container">
      <div>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this review?</p>
      </div>

      <div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>

      <button className="delete-review-button" onClick={() => handleDelete()}>
        Yes(Delete Review)
      </button>

      <button
        className="cancel-delete-review-button"
        onClick={() => closeModal()}
      >
        No(Keep Review)
      </button>
    </div>
  );
}

export default DeleteReviewModal;
