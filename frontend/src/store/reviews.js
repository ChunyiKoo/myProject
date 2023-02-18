import { csrfFetch } from "./csrf";

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
    dispatch(addAReview(review));
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
  console.log("first line reviewReducer action.review: ", action.reviews);
  let newState = {};
  switch (action.type) {
    case LOAD_ALL_REVIEWS:
      newState = {
        ...state,
        spot: { ...state.spot },
        user: { ...state.user },
      };

      action.reviews.Reviews.forEach((review) => {
        newState.spot[review.id] = review;
      });
      return newState;
    case ADD_SPOT_REVIEW:
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
