// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import deleteASpot from "../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
//import "./LoginForm.css";

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleDelete = () => {
    setErrors([]);
    return dispatch(deleteASpot(spotId))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="delete-spot-form-container">
      <div>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings?</p>
      </div>

      <div>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>

      <button className="delete-spot-button" onClick={() => closeModal()}>
        Yes(Delete Spot)
      </button>

      <button
        className="cancel-delete-spot-button"
        onClick={() => closeModal()}
      >
        No(Keep Spot)
      </button>
    </div>
  );
}

export default DeleteSpotModal;