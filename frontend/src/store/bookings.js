import { csrfFetch } from "./csrf";

//
const LOAD_ALL_CURRENT_BOOKINGS = "loadAllCurrentBookings";
//
const CREATE_EDIT_A_BOOKING = "createEditABooking";
// //
const DELETE_A_BOOKING = "deleteABooking";
//
export const loadAllCurrentBookings = (bookings) => {
 return {
  type: LOAD_ALL_CURRENT_BOOKINGS,
  bookings,
 };
};
//
export const createEditABooking = (booking) => {
 return {
  type: CREATE_EDIT_A_BOOKING,
  booking,
 };
};
//
export const deleteABooking = (bookingId) => {
 return {
  type: DELETE_A_BOOKING,
  bookingId,
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

//thunk createABooking
export const thunkCreateABooking = (data, spotId) => async (dispatch) => {
 const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 console.log("thunkCreateABooking response: ", response);
 if (response.ok) {
  console.log("thunkCreateABooking response: ", response);
  const booking = await response.json();
  dispatch(createEditABooking(booking));
  return booking;
 }
 return response;
};

//thunk editABooking
export const thunkEditABooking = (data, bookingId) => async (dispatch) => {
 const response = await csrfFetch(`/api/bookings/${bookingId}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
 });

 console.log("thunkEditABooking response: ", response);
 if (response.ok) {
  console.log("thunkEditABooking response: ", response);
  const booking = await response.json();
  dispatch(createEditABooking(booking));
  return booking;
 }
 return response;
};

//thunk deleteABooking
export const thunkDeleteABooking = (bookingId) => async (dispatch) => {
 const response = await csrfFetch(`/api/bookings/${bookingId}`, {
  method: "DELETE",
 });

 console.log("thunkdeleteABooking response: ", response);
 if (response.ok) {
  console.log("thunkdeleteABooking response: ", response);
  await response.json();
  dispatch(deleteABooking(bookingId));
 }
 return response;
};

const initialState = { user: {} };

const bookingsReducer = (state = initialState, action) => {
 console.log("before bookingsReducer action: ", action);
 let newState = {};
 switch (action.type) {
  case LOAD_ALL_CURRENT_BOOKINGS:
   newState = {
    ...state,
    user: {},
   };

   action.bookings.Bookings.forEach((booking) => {
    newState.user[booking.id] = booking;
   });
   return newState;
  case CREATE_EDIT_A_BOOKING:
   newState = {
    ...state,
    user: { ...state.user },
   };

   newState.user[action.booking.id] = action.booking;
   return newState;
  case DELETE_A_BOOKING:
   newState = {
    ...state,
    user: { ...state.user },
   };

   delete newState.user[action.bookingId];
   return newState;
  default:
   return state;
 }
};
export default bookingsReducer;
