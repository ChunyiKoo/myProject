import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkCreateABooking, thunkEditABooking } from "../store/bookings";
import { useHistory } from "react-router-dom";
import { useModal } from "../context/Modal";

const BookingForm = ({ formType, price, spotId, serviceFee, booking }) => {
 const [canDispatch, setCanDispatch] = useState(false);
 const [checkin, setCheckin] = useState();
 const [checkout, setCheckout] = useState();
 const [guests, setGuests] = useState(1);
 const [nights, setNights] = useState(0);
 const [errors, setErrors] = useState([]);
 const [bErrs, setBErrs] = useState({});
 const [disabled, setDisabled] = useState(false);
 const [showErr, setShowErr] = useState(false);
 const { closeModal, setOnModalClose } = useModal();

 const dispatch = useDispatch();
 const history = useHistory();

 /************************************************/
 // Get the current date
 const today = new Date();

 // Extract the local date components
 const year = today.getFullYear();
 const month = today.getMonth() + 1; // Month is zero-based, so add 1
 const day = today.getDate();

 // Create a formatted string for the local date
 const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
  day
 ).padStart(2, "0")}`;

 console.log("formattedDate", formattedDate);
 let Today = new Date(formattedDate);
 /************************************************/

 useEffect(() => {
  // console.log("useEffect of BookingForm: ", {
  //  formType,
  //  price,
  //  spotId,
  //  serviceFee,
  //  booking,
  // });
  if (formType === "Edit" && booking) {
   setCheckin(booking.startDate.slice(0, 10));
   setCheckout(booking.endDate.slice(0, 10));
   setGuests(booking.guests);
   setNights(booking.nights);
  }
 }, [booking, formType]);

 useEffect(() => {
  let diffDays;
  let errs = [];
  setErrors([]);
  if (showErr) setDisabled(true); //showErr means hasBeenSubmitted at least once
  if (checkin && checkout) {
   console.log("typeof checkin: ", typeof checkin, checkin);
   let start = new Date(checkin); //local time zone one day behind the actual date
   let end = new Date(checkout); //local time zone
   console.log("Today start, end: ", Today, start, end);

   if (start - Today <= 0) errs.push("Check-in day cannot be today or before.");

   const timeDiff = end.getTime() - start.getTime();
   // Convert milliseconds to days
   diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
   if (diffDays <= 0) {
    errs.push("Check-out day needs to be after Check-in day");
    setNights(0);
   } else {
    setNights(diffDays);
   }
  }
  if (showErr) {
   if (errs.length === 0) setDisabled(false);
   if (canDispatch === false) setCanDispatch(true);
  } else {
   if (errs.length === 0) setCanDispatch(true); //can dispatch Thunk
   else setCanDispatch(false); //cannot dispatch Thunk
  }
  setErrors(errs);
 }, [checkin, checkout]);

 console.log("checkin, checkout", checkin, checkout);

 const handleSubmit = (e) => {
  e.preventDefault();
  setBErrs([]);
  setErrors([]);
  if (!showErr) setShowErr(true);
  // let start = new Date(new Date(checkin).toDateString());
  // let end = new Date(new Date(checkout).toDateString());
  const newBooking = {
   startDate: checkin,
   endDate: checkout,
   guests: guests,
  };

  console.log("newBooking", newBooking);

  if (formType === "Add") {
   if (canDispatch) {
    return dispatch(thunkCreateABooking(newBooking, spotId))
     .then((booking) => {
      console.log(
       " BookingForm thunkCreateABooking right after dispatch: booking ",
       booking
      );
      history.push("/bookings/current");
     })
     .catch(async (res) => {
      const data = await res.json();
      console.log("**********data", data);
      if (data && data.message) {
       if (data.errors) setBErrs(data);
       console.log("aaaa  dispatch(thunkCreateABooking catch    bErrs", bErrs);
      } else {
       setBErrs([...data.message]);
       console.log("bbbb   dispatch(thunkCreateABooking catch    bErrs", bErrs);
      }
      //******error is inside message key
     });
   }
  }
  if (formType === "Edit") {
   if (canDispatch) {
    return dispatch(thunkEditABooking(newBooking, booking.id))
     .then((booking) => {
      console.log(
       " BookingForm thunkEditABooking right after dispatch: booking ",
       booking
      );
      setOnModalClose(() => {
       setErrors([]);
      });
      closeModal();
     })
     .catch(async (res) => {
      const data = await res.json();
      console.log("**********data", data);
      if (data && data.message) {
       if (data.errors) setBErrs(data);
       console.log("aaaa  dispatch(thunkEditABooking catch    bErrs", bErrs);
      } else {
       setBErrs([...data.message]);
       console.log("bbbb   dispatch(thunkEditABooking catch    bErrs", bErrs);
      }
      //******error is inside message key
     });
   }
  }
 };

 return (
  <form
   className="spot-detail-booking-form booking-form"
   onSubmit={handleSubmit}
  >
   {console.log("abcabcabc    errors", errors)}
   <ul className="error-message">
    {bErrs && console.log("cccc bErrs: ", bErrs)}
    {/* {bErrs?.message === "Validation error" && */}
    {bErrs?.errors &&
     Object.values(bErrs?.errors).map((error, idx) => (
      <li key={idx}>{error}</li>
     ))}
    {errors?.map((error, idx) => (
     <li className="error-message" key={idx}>
      {error}
     </li>
    ))}
   </ul>
   <div>
    <span className="bold medium-text">{`$${price}`}</span>
    {"/night"}
   </div>
   <div className="spot-detail-booking-input-box">
    <div className="spot-detail-booking-checkin-checkout">
     <label className="checkin-checkout bold small-text">
      CHECK-IN
      <input
       style={{ backgroundColor: "white", border: "none" }}
       type="date"
       value={checkin}
       onChange={(e) => setCheckin(e.target.value)}
       required
      />
     </label>
     <label className="checkin-checkout bold  small-text">
      CHECK-OUT
      <input
       style={{ backgroundColor: "white", border: "none" }}
       type="date"
       value={checkout}
       onChange={(e) => setCheckout(e.target.value)}
       required
      />
     </label>
    </div>
    <div>
     <label className="booking-guests bold  small-text">
      GUESTS
      <select
       style={{ backgroundColor: "white", border: "none" }}
       value={guests}
       onChange={(e) => setGuests(e.target.value)}
       required
      >
       {[1, 2, 3, 4, 5, 6].map((el) => (
        <option key={el}>{el}</option>
       ))}
      </select>
     </label>
    </div>
   </div>
   <div className="booking-price-total">
    <div className="medium-text">{`$ ${price} x ${nights} nights`}</div>
    <div>{`$${parseInt(price) * nights}`}</div>
   </div>
   <div className="booking-price-total">
    <div className="medium-text">Service fee</div>
    <div>{`$${serviceFee}`}</div>
   </div>
   <div className="booking-price-total">
    <div className="medium-text">Total</div>
    {nights ? (
     <div>{`$${parseInt(price) * nights + parseInt(serviceFee)}`}</div>
    ) : (
     <div>$0</div>
    )}
   </div>
   <button
    type="submit"
    disabled={disabled}
    className={
     !disabled
      ? "booking-form-submit-button"
      : "booking-form-submit-button disabled-button"
    }
   >
    Reserve
   </button>
  </form>
 );
};
export default BookingForm;
