import { csrfFetch } from "./csrf";

const ADD_SPOT_REVIEW = "add_a_spot_review";

export const addAReview = (review) => {
  return {
    type: ADD_SPOT_REVIEW,
    review,
  };
};

export const createAReview = (data, spotId) => async (dispatch) => {
  console.log(
    "first line reviewReducer createAReview data, spotId: ",
    data,
    spotId
  );
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const review = await response.json();
  dispatch(addAReview(review));
};

const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
  console.log("first line reviewReducer action.review: ", action.review);
  let newState = {};
  switch (action.type) {
    // case LOAD_ALL_SPOTS:
    //   newState = {
    //     ...state,
    //     allSpots: { ...state.allSpots },
    //     singleSpot: { ...state.singleSpot },
    //   };

    //   action.spots.Spots.forEach((spot) => {
    //     newState.allSpots[spot.id] = spot;
    //   });
    //   return newState;
    case ADD_SPOT_REVIEW:
      console.log("inside reviewReducer action.review: ", action.review);
      newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      newState.spot[action.review.id] = action.review;
      return newState;

    // case LOAD_A_SPOT:
    //   console.log("inside spotsReducer action.spot: ", action.spot);
    //   newState = {
    //     ...state,
    //     spot: { ...state.allSpots },
    //     user: { ...state.singleSpot },
    //   };
    //   newState.singleSpot[action.spot.id] = action.spot;
    //   console.log("inside spotsReducer newState: ", newState);
    //   return newState;
    default:
      return state;
  }
};
export default reviewReducer;

//  reviews: {
//     // When on a single spot, use the spot slice.
//     spot: {
//       [reviewId]: {
//         reviewData,
//         User: {
//           userData,
//         },
//         ReviewImages: [imagesData],
//       },
//       optionalOrderedList: [],
//     },
//     // When on the user's reviews, use the user slice.
//     user: {
//       [reviewId]: {
//         reviewData,
//         User: {
//           userData,
//         },
//         Spot: {
//           spotData,
//         },
//         ReviewImages: [imagesData],
//       },
//       optionalOrderedList: [],
//     },
//   },
