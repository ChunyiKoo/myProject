import React, { useState, useEffect } from "react";
//import * as sessionActions from "../../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/Modal";
import { useHistory, useParams } from "react-router-dom";
import { fetchSingleSpot, updateASpot } from "../store/spots";

const UpdateSpotForm = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  //const [url, setUrl] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  console.log("errors array: ", errors);
  // setOnModalClose(history.push("/spots/"));

  // const fillDemo = () => {
  //   setCountry("USA");
  //   setAddress("123 Happy street");
  //   setCity("Cherry");
  //   setState("TX");
  //   setLatitude(33);
  //   setLongitude(-156);
  //   setDescription("A very beautigul waterfront house");
  //   setName("Cherry house");
  //   //setUrl("https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg");
  //   setPrice(233);
  // };

  const dispatch = useDispatch();
  const params = useParams();
  const { spotId } = params;

  let spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
  }, [dispatch, spotId]);

  const initialData = () => {
    setCountry(spots.singleSpot.country);
    setAddress(spots.singleSpot.address);
    setCity(spots.singleSpot.city);
    setState(spots.singleSpot.state);
    setLatitude(spots.singleSpot.lat);
    setLongitude(spots.singleSpot.lng);
    setDescription(spots.singleSpot.description);
    setName(spots.singleSpot.name);
    //setUrl("https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg");
    setPrice(spots.singleSpot.price);
  };
  useEffect(() => {
    initialData();
    console.log("UpdateSpotForm spots: ", spots);
  }, [spots.singleSpot]);

  // useEffect(() => {
  //   if (spots.singleSpot.id === spotId) {
  //     initialData();
  //     console.log("UpdateSpotForm run initialData(): ", spots);
  //   }
  // }, [spots.singleSpot, spotId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const newSpot = {
      country,
      address,
      city,
      state,
      lat: latitude,
      lng: longitude,
      description,
      name,
      price,
    };

    dispatch(updateASpot(newSpot))
      //.then(closeModal)
      .then((spot) => {
        console.log("NewSpot Form spot: ", spot);
        history.push("/spots/current");
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <div className="new-spot-form-container">
      <h2>Update the Spot</h2>
      <form className="new-spot-form" onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <label>
          Country
          {<p className="error-message">{errors?.county}</p>}
          <input
            type="text"
            value={country}
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Street
          {<p className="error-message">{errors?.street}</p>}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          {<p className="error-message">{errors?.city}</p>}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          {<p className="error-message">{errors?.state}</p>}
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>

        <label>
          Latitude
          {<p className="error-message">{errors?.lat}</p>}
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          {<p className="error-message">{errors?.lng}</p>}
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </label>
        <label>
          Describe your place to guest
          {<p className="error-message">{errors?.description}</p>}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Create a title for your spot
          {<p className="error-message">{errors?.name}</p>}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Set a base price for your spot
          {<p className="error-message">{errors?.price}</p>}
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {/* <label>
          Liven up your spot with photos
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label> */}

        <button type="submit">Update Spot</button>
        {/* <div className="login-demo-user" onClick={() => fillDemo()}>
          Demo Input
        </div> */}
      </form>
    </div>
  );
};
export default UpdateSpotForm;
