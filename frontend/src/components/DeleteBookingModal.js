// frontend/src/components/DeleteReviewModal.js
import React, { useState } from "react";
import { thunkDeleteABooking } from "../store/bookings";
import { useDispatch } from "react-redux";
import { useModal } from "../context/Modal";
//import "./LoginForm.css";

function DeleteBookingModal({ bookingId }) {
 const dispatch = useDispatch();
 const [errors, setErrors] = useState([]);
 const { closeModal } = useModal();

 const handleDelete = () => {
  setErrors([]);
  return dispatch(thunkDeleteABooking(bookingId))
   .then(closeModal)
   .catch(async (res) => {
    const data = await res.json();
    console.log("DeleteBookingModal thunkDeleteABooking data", data);
    if (data && data.errors) setErrors(data.errors);
    closeModal();
   });
 };

 return (
  <div className="delete-review-form-container">
   <div>
    <h1>Confirm Delete</h1>
   </div>
   <div>
    <p>Are you sure you want to remove this booking?</p>
   </div>

   <div>
    <ul>
     {errors.map((error, idx) => (
      <li key={idx}>{error}</li>
     ))}
    </ul>
   </div>

   <button className="delete-review-button" onClick={() => handleDelete()}>
    Yes (Delete Booking)
   </button>

   <button className="cancel-delete-review-button" onClick={() => closeModal()}>
    No (Keep Booking)
   </button>
  </div>
 );
}

export default DeleteBookingModal;
