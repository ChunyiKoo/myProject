import { csrfFetch } from "./csrf";

//
//
const LOAD_ALL_CURRENT_BOOKINGS = "loadAllCurrentBookings";
//
const LOAD_ALL_SINGLE_SPOT_BOOKINGS = "loadAllSingleSpotBookings";

export const loadAllCurrentBookings = (bookings) => {
  return {
    type: LOAD_ALL_CURRENT_BOOKINGS,
    bookings,
  };
};

export const loadAllSingleSpotBookings = (bookings) => {
  return {
    type: LOAD_ALL_SINGLE_SPOT_BOOKINGS,
    bookings,
  };
};

//thunk user
export const fetchAllCurrentBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current");
  if (response.ok) {
    const bookings = await response.json();
    dispatch(loadAllCurrentBookings(bookings));
  }
};

//thunk spot
export const fetchAllSingleSpotBookings = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const bookings = await response.json();
  dispatch(loadAllSingleSpotBookings(bookings));
};

const initialState = { spot: {}, user: {} };

const bookingsReducer = (state = initialState, action) => {
  console.log("before bookingsReducer action: ", action);
  let newState = {};
  switch (action.type) {
    case LOAD_ALL_CURRENT_BOOKINGS:
      newState = {
        ...state,
        spot: { ...state.spot },
        user: {},
      };

      action.bookings.Bookings.forEach((booking) => {
        newState.user[booking.id] = booking;
      });
      return newState;
    default:
      return state;
  }
};
export default bookingsReducer;
