import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrentBookings } from "../store/bookings";
import { fetchAllSpots } from "../store/spots";
import BookingForm from "./BookingForm";
import OpenModalButton from "./OpenModalButton";
import DeleteBookingModal from "./DeleteBookingModal";
import ReviewFormModal from "./ReviewFormModal";

function TripList() {
 const dispatch = useDispatch();

 //All current user's bookings
 const return_bookings = useSelector((state) => state.bookings.user);
 const bookings = Object.values(return_bookings);
 let sortedBookings;
 if (bookings) {
  sortedBookings = bookings.toSorted(
   (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
  console.log("bookings, sortedBookings", bookings, sortedBookings);
 }

 useEffect(() => {
  dispatch(fetchAllCurrentBookings());
 }, [dispatch]);

 //allSpots
 const return_allSpots = useSelector((state) => state.spots.allSpots);

 useEffect(() => {
  dispatch(fetchAllSpots());
 }, [dispatch]);

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

 if (!return_allSpots) return null;
 else
  return (
   <>
    <div className="triplist-title">
     <h1>My Upcoming trips</h1>
    </div>
    <div className="triplist-outer-container">
     {sortedBookings?.map((booking) =>
      new Date(booking.startDate) - Today > 0 ? (
       <div key={booking?.id} className="triplist-spot-info-photo-container">
        <div className="triplist-spot-info-box">
         <div className="triplist-name-discpt">
          <p className="triplist-name">
           {return_allSpots[`${booking?.spotId}`].name}
           {/* {booking?.Spot.name} */}
          </p>
          <p className="medium-text">
           {return_allSpots[`${booking?.spotId}`].description}
           {/* {booking?.Spot.description} */}
          </p>
         </div>
         <div className="triplist-mid-info-box">
          <div className="triplist-inner-info-box">
           <div className="medium-text bold">start Date</div>
           <div className="medium-text">{booking?.startDate.slice(0, 10)}</div>
           <div className="medium-text bold">End Date</div>
           <div className="medium-text">{booking?.endDate.slice(0, 10)}</div>
          </div>

          <div className="triplist-inner-info-box right-box">
           <div className="medium-text bold">{`${
            return_allSpots[`${booking?.spotId}`].city
           }, ${return_allSpots[`${booking?.spotId}`].country}`}</div>
           <div className="medium-text">{`$${
            return_allSpots[`${booking?.spotId}`].price
           } night`}</div>
          </div>
         </div>
         <div className="triplist-buttons-box">
          <div className="triplist-button-container">
           <OpenModalButton
            className="booking-update-button"
            buttonText="Change Reservation"
            modalComponent={
             <BookingForm
              formType="Edit"
              price={return_allSpots[`${booking?.spotId}`].price}
              spotId={`${booking?.spotId}`}
              serviceFee={return_allSpots[`${booking?.spotId}`].serviceFee}
              booking={booking}
              today={Today}
             />
            }
           />
           <OpenModalButton
            className="booking-delete-button"
            buttonText="Cancel Reservation"
            modalComponent={<DeleteBookingModal bookingId={booking.id} />}
           />
          </div>
         </div>
        </div>
        <div
         className="triplist-spot-photo-box"
         style={{
          backgroundImage: `url(${
           return_allSpots[`${booking?.spotId}`].previewImage
          })`,
         }}
        ></div>
       </div>
      ) : null
     )}
    </div>
    <div className="triplist-title">
     <h1>My Past trips</h1>
    </div>
    <div className="triplist-outer-container">
     {sortedBookings?.map((booking) =>
      new Date(booking.startDate) - Today <= 0 ? (
       <div key={booking?.id} className="triplist-spot-info-photo-container">
        <div className="triplist-spot-info-box">
         <div className="triplist-name-discpt">
          <p className="triplist-name">
           {return_allSpots[`${booking?.spotId}`].name}
           {/* {booking?.Spot.name} */}
          </p>
          <p className="medium-text">
           {return_allSpots[`${booking?.spotId}`].description}
           {/* {booking?.Spot.description} */}
          </p>
         </div>
         <div className="triplist-mid-info-box">
          <div className="triplist-inner-info-box">
           <div className="medium-text bold">start Date</div>
           <div className="medium-text">{booking?.startDate.slice(0, 10)}</div>
           <div className="medium-text bold">End Date</div>
           <div className="medium-text">{booking?.endDate.slice(0, 10)}</div>
          </div>

          <div className="triplist-inner-info-box right-box">
           <div className="medium-text bold">{`${
            return_allSpots[`${booking?.spotId}`].city
           }, ${return_allSpots[`${booking?.spotId}`].country}`}</div>
           <div className="medium-text">{`$${
            return_allSpots[`${booking?.spotId}`].price
           } night`}</div>
          </div>
         </div>
         <div className="triplist-buttons-box">
          <div className="triplist-button-container">
           <OpenModalButton
            className="booking-review-button"
            buttonText="Post Your Review"
            modalComponent={
             <ReviewFormModal
              spotId={booking?.spotId}
              spotName={return_allSpots[`${booking?.spotId}`].name}
             />
            }
           />
          </div>
         </div>
        </div>
        <div
         className="triplist-spot-photo-box"
         style={{
          backgroundImage: `url(${
           return_allSpots[`${booking?.spotId}`].previewImage
          })`,
         }}
        ></div>
       </div>
      ) : null
     )}
    </div>
   </>
  );
}

export default TripList;
