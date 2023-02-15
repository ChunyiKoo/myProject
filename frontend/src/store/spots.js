import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = "load_all_spots";

export const loadAllSpots = (spots) => {
  return {
    type: LOAD_ALL_SPOTS,
    spots,
  };
};

export const fetchAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(loadAllSpots(spots));
};

const ADD_SPOT = "add_a_spot";

export const addASpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const createASpot = (spot) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(spot),
  });

  if (response.ok) {
    const spot = await response.json();
    dispatch(addASpot(spot));
    return spot;
  }
};

// allSpots: {
//       [spotId]: {
//         spotData,
//       }
// }

//  singleSpot: {
//       spotData,
//       SpotImages: [imagesData],
//       Owner: {
//         ownerData,
//       },
//     },

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_SPOTS:
      let newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      console.log("before spotsReducer newState: ", newState);
      console.log("spotsReducer spots: ", action.spots);
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      console.log("after spotsReducer newState: ", newState);
      return newState;

    case ADD_SPOT:
      newState = {
        ...state,
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      newState.allSpots[action.spot.id] = action.spot;
      return newState;

    default:
      return state;
  }
};
export default spotsReducer;
