import { csrfFetch } from "./csrf";
//
const DELETE_SPOT_REVIEW = "delete_a_spot_review";

export const removeASpotReview = (reviewId) => {
  return {
    type: DELETE_SPOT_REVIEW,
    reviewId,
  };
};

export const deleteASpotReview = (reviewId) => async (dispatch) => {
  console.log("reducer deleteASpot reviewId:", reviewId);

  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeASpotReview(reviewId));
  }
  return response;
};

const LOAD_ALL_REVIEWS = "load_all_reviews";

export const loadAllReviews = (reviews) => {
  return {
    type: LOAD_ALL_REVIEWS,
    reviews,
  };
};

//not correct
export const fetchAllReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
  const reviews = await response.json();
  dispatch(loadAllReviews(reviews));
};

const ADD_SPOT_REVIEW = "add_a_spot_review";

export const addAReview = (review) => {
  return {
    type: ADD_SPOT_REVIEW,
    review,
  };
};

export const createAReview = (data, spotId) => async (dispatch) => {
  //try {
  console.log(
    "first line reviewReducer createAReview data, spotId: ",
    data,
    spotId
  );
  let review;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    review = await response.json();
    console.log(" reviewReducer before addAReview: review ", review);
    //dispatch(addAReview(review));

    const response2 = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const reviews = await response2.json();
    dispatch(loadAllReviews(reviews));

    return review;
  } else {
    return response;
  }
  // } catch (e) {
  //   console.log("****inside review reducer*****error:", await e.json());
  // }
};

const initialState = { spot: {}, user: {} };

const reviewReducer = (state = initialState, action) => {
  console.log("first line reviewReducer action: ", action);
  let newState = {};
  switch (action.type) {
    case DELETE_SPOT_REVIEW:
      newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };
      delete newState.spot[action.reviewId];
      return newState;
    case LOAD_ALL_REVIEWS:
      //empty other spot's review
      newState = {
        ...state,
        spot: {},
        user: { ...state.user },
      };

      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    // case ADD_SPOT_REVIEW:
    //   newState = {
    //     ...state,
    //     spot: { ...state.spot },
    //     user: { ...state.user },
    //   };
    //   newState.spot[action.review.id] = action.review;
    //   return newState;

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
