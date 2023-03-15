import { csrfFetch } from "./csrf";
//
const DELETE_SPOT = "delete_a_spot";

export const removeASpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId,
  };
};

export const deleteASpot = (spotId) => async (dispatch) => {
  console.log("reducer deleteASpot data:");

  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(removeASpot(spotId));
  }
  return response;
};

//
const EDIT_SPOT = "edit_a_spot";

export const editASpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

export const updateASpot = (data, spotId) => async (dispatch) => {
  console.log("reducer updateASpot data:", data);
  let spot;
  const response1 = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log("reducer updateASpot response1.ok:", response1.ok);
  if (response1.ok) {
    spot = await response1.json();
    // dispatch(addASpot(spot));

    console.log("reducer updateASpot spot:", spot);
    dispatch(editASpot(spot));
    return spot;
  } else {
    console.log("reducer updateASpot spot: response1.ok", response1.ok);
    return response1;
  }
};

//
const LOAD_ALL_CURRENT_SPOTS = "load_all_current_spots";

export const loadAllCurrentSpots = (spots) => {
  return {
    type: LOAD_ALL_CURRENT_SPOTS,
    spots,
  };
};

export const fetchAllCurrentSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots/current");
  const spots = await response.json();
  dispatch(loadAllCurrentSpots(spots));
};

//
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

//
const ADD_SPOT = "add_a_spot";

export const addASpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot,
  };
};

export const createASpot =
  (data, { url }) =>
  async (dispatch) => {
    console.log("reducer createASpot data, { url }:", data, { url });
    let spot;
    const response1 = await csrfFetch("/api/spots", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response1.ok) {
      spot = await response1.json();
      // dispatch(addASpot(spot));

      console.log("reducer createASpot spot:", spot);

      const response2 = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, preview: true }),
      });

      if (response2.ok) {
        spot = { ...spot, previewImage: url };
        dispatch(addASpot(spot));
        //return spot;
      } else {
        return response2;
      }
      return spot;
    } else {
      return response1;
    }
  };

//
const LOAD_A_SPOT = "load_a_spot";

export const loadSingleSpot = (spot) => {
  return {
    type: LOAD_A_SPOT,
    spot,
  };
};

export const fetchSingleSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  console.log("inside fetchSingleSpot spot: ", spot);
  dispatch(loadSingleSpot(spot));
};
//
const CLEAR_A_SPOT = "clear_a_spot";

export const clearSingleSpot = () => {
  return {
    type: CLEAR_A_SPOT,
  };
};

const initialState = { allSpots: {}, singleSpot: {} };

const spotsReducer = (state = initialState, action) => {
  console.log("before spotsReducer action: ", action);
  let newState = {};
  switch (action.type) {
    case DELETE_SPOT:
      console.log(
        "inside spotsReducer DELETE_SPOT action.spotId: ",
        action.spotId
      );
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      delete newState.allSpots[action.spotId];
      delete newState.allCurrent[action.spotId];
      return newState;

    case EDIT_SPOT:
      console.log("inside spotsReducer action.spot: ", action.spot);
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      newState.allSpots[action.spot.id] = {
        ...state.allSpots[action.spot.id],
        ...action.spot,
      };
      newState.allCurrent[action.spot.id] = {
        ...state.allCurrent[action.spot.id],
        ...action.spot,
      };
      newState.singleSpot[action.spot.id] = {
        ...state.singleSpot[action.spot.id],
        ...action.spot,
      };
      return newState;
    case LOAD_ALL_CURRENT_SPOTS:
      console.log("LOAD_ALL_CURRENT_SPOTS");
      newState = {
        ...state,
        allCurrent: {},
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      action.spots.Spots.forEach((spot) => {
        newState.allCurrent[spot.id] = spot;
      });
      return newState;

    case LOAD_ALL_SPOTS:
      console.log("LOAD_ALL_SPOTS");
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: {},
        singleSpot: { ...state.singleSpot },
      };
      action.spots.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;

    case ADD_SPOT:
      //console.log("inside spotsReducer action.spot: ", action.spot);
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: { ...state.allSpots },
        singleSpot: { ...state.singleSpot },
      };
      newState.allSpots[action.spot.id] = action.spot;
      return newState;

    case LOAD_A_SPOT:
      console.log("inside spotsReducer action.spot: ", action.spot);
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: { ...state.allSpots },
        singleSpot: {},
      };
      newState.singleSpot = action.spot;
      console.log("inside spotsReducer newState: ", newState);
      return newState;

    case CLEAR_A_SPOT:
      console.log("***** spotsReducer action.spot: ");
      newState = {
        ...state,
        allCurrent: { ...state.allCurrent },
        allSpots: { ...state.allSpots },
        singleSpot: {},
      };
      console.log("^^^^^inside spotsReducer newState: ", newState);
      return newState;
    default:
      return state;
  }
};
export default spotsReducer;

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
