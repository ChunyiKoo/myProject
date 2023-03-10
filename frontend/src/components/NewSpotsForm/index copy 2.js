import React, { useState } from "react";
//import * as sessionActions from "../../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createASpot } from "../../store/spots";
import { useHistory } from "react-router-dom";

const NewSpotsForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  console.log("errors array: ", errors);
  // setOnModalClose(history.push("/spots/"));

  const fillDemo = () => {
    setCountry("USA");
    setAddress("123 Happy street");
    setCity("Cherry");
    setState("TX");
    setLatitude(33);
    setLongitude(-156);
    setDescription("A very beautigul waterfront house");
    setName("Cherry house");
    setUrl("https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg");
    setPrice(233);
  };

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

    dispatch(createASpot(newSpot, { url }))
      //.then(closeModal)
      .then((spot) => {
        console.log("NewSpot Form spot: ", spot);
        history.push(`/spots/${spot.id}`);
        closeModal();
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <div className="new-spot-form-container">
      <h2>Create a new Spot</h2>
      <form className="new-spot-form" onSubmit={handleSubmit}>
        <ul className="error-message">
          {errors?.name === "SequelizeValidationError" &&
            errors.errors.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
        </ul>
        <label>
          Country
          {<p className="error-message">{errors?.county}</p>}
          <input
            type="text"
            value={country}
            placeholder="country"
            onChange={(e) => setCountry(e.target.value)}
            required
            minLength="2"
          />
        </label>
        <label>
          Street
          {<p className="error-message">{errors?.street}</p>}
          <input
            type="text"
            value={address}
            placeholder="address"
            onChange={(e) => setAddress(e.target.value)}
            required
            minLength="2"
          />
        </label>
        <label>
          City
          {<p className="error-message">{errors?.city}</p>}
          <input
            type="text"
            value={city}
            placeholder="city"
            onChange={(e) => setCity(e.target.value)}
            required
            minLength="2"
          />
        </label>
        <label>
          State
          {<p className="error-message">{errors?.state}</p>}
          <input
            type="text"
            value={state}
            placeholder="state"
            onChange={(e) => setState(e.target.value)}
            required
            minlength="2"
          />
        </label>

        <label>
          Latitude
          {<p className="error-message">{errors?.lat}</p>}
          <input
            type="text"
            value={latitude}
            placeholder="latitude"
            onChange={(e) => setLatitude(e.target.value)}
            required
            min="0"
            max="90"
          />
        </label>
        <label>
          Longitude
          {<p className="error-message">{errors?.lng}</p>}
          <input
            type="text"
            value={longitude}
            placeholder="longitude"
            onChange={(e) => setLongitude(e.target.value)}
            required
            min="-180"
            max="180"
          />
        </label>
        <label>
          Describe your place to guest
          {<p className="error-message">{errors?.description}</p>}
          <textarea
            value={description}
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
            required
            minlength="3"
          />
        </label>
        <label>
          Create a title for your spot
          {errors?.name !== "SequelizeValidationError" && (
            <p className="error-message">{errors?.name}</p>
          )}
          <input
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            required
            minlength="2"
          />
        </label>
        <label>
          Set a base price for your spot
          {<p className="error-message">{errors?.price}</p>}
          <input
            type="number"
            value={price}
            placeholder="price"
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </label>
        <label>
          Liven up your spot with photos
          <input
            type="text"
            value={url}
            placeholder="url"
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <button type="submit">Create Spot</button>
        <div className="login-demo-user" onClick={() => fillDemo()}>
          Demo Input
        </div>
      </form>
    </div>
  );
};
export default NewSpotsForm;
