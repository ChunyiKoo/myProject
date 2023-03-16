import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCurrentBookings } from "../store/bookings";

function TripList() {
  const dispatch = useDispatch();
  const return_bookings = useSelector((state) => state.bookings.user);
  const bookings = Object.values(return_bookings);

  useEffect(() => {
    dispatch(fetchAllCurrentBookings());
  }, [dispatch]);

  return (
    <>
      <div className="triplist-title">
        <h1>My trips</h1>
      </div>
      <div className="triplist-outer-container">
        {bookings?.map((booking) => (
          <div key={booking?.id} className="triplist-spot-info-photo-container">
            <div className="triplist-spot-info-box">
              <div className="triplist-name-discpt">
                <p className="medium-text bold">{booking?.Spot.name}</p>
                <p className="small-text">{booking?.Spot.description}</p>
              </div>
              <div className="triplist-mid-info-box">
                <div className="triplist-inner-info-box">
                  <div className="small-text bold">start Date</div>
                  <div className="small-text">
                    {booking?.startDate.slice(0, 10)}
                  </div>
                  <div className="small-text bold">End Date</div>
                  <div className="small-text">
                    {booking?.endDate.slice(0, 10)}
                  </div>
                </div>

                <div className="triplist-inner-info-box right-box">
                  <div className="small-text bold">{`${booking?.Spot.city}, ${booking?.Spot.country}`}</div>
                  <div className="small-text">{`$ ${booking?.Spot.price} night`}</div>
                </div>
              </div>
              <div className="triplist-buttons-box"></div>
            </div>
            {/* {const urlstr = `url(${booking?.Spot.previewImage})`} */}
            <div
              className="triplist-spot-photo-box"
              style={{
                backgroundImage: `url(${booking?.Spot.previewImage})`,
              }}
            >
              {/* <img
                className="trip-list-spot-photo"
                src={`${booking?.Spot.previewImage}`}
              /> */}
            </div>
            <div className="triplist-spot-map-box">map</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default TripList;
