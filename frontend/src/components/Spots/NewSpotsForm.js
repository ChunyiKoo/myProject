import React, { useState } from "react";
//import * as sessionActions from "../../../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
//import "./LoginForm.css";

const NewSpotsForm = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [spotTitle, setSpotTitle] = useState("");
  const [photo, setPhoto] = useState("");
  const [price, setPrice] = useState(0);
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    // return dispatch(sessionActions.login({ credential, password }))
    //   .then(closeModal)
    //   .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors);
    //   });
  };
  return (
    <div className="new-spot-form-container">
      <h2>Create a new Spot</h2>
      <form className="new-spot-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Street
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Describe your place to guest
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Create a title for your spot
          <input
            type="text"
            value={spotTitle}
            onChange={(e) => setSpotTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Set a base price for your spot
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          Liven up your spot with photos
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
};
export default NewSpotsForm;
