import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/Modal";
import { createASpot, updateASpot, fetchSingleSpot } from "../store/spots.js";
import { useHistory, useParams } from "react-router-dom";

const SpotsForm = ({ formType }) => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState([]);
  const [bErrs, setBErrs] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const { closeModal } = useModal();
  const history = useHistory();
  const params = useParams();
  const { spotId } = params;
  console.log("errors array: ", errors);
  // setOnModalClose(history.push("/spots/"));
  console.log("SpotsForm spotId: ", spotId);
  let spots = useSelector((state) => state.spots);

  useEffect(() => {
    if (spotId) dispatch(fetchSingleSpot(spotId));
  }, [spotId, dispatch]);

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
    if (spots && spots.singleSpot && formType === "UpdateSpotForm")
      initialData();
  }, [formType]);

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

    const thunkActionProducer = (formType) => {
      if (formType === "NewSpotsForm") {
        return dispatch(createASpot(newSpot, { url }))
          .then((spot) => {
            history.push(`/spots/${spot.id}`);
            closeModal();
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setBErrs(data.errors);
          });
      }
      if (formType === "UpdateSpotForm") {
        return dispatch(updateASpot(newSpot, spotId))
          .then((spot) => {
            history.push(`/spots/${spot.id}`);
            closeModal();
          })
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setBErrs(data.errors);
          });
      }
    };

    thunkActionProducer(formType);
  };

  useEffect(() => {
    setDisabled(true);
    let errs = [];
    //  if (password.length < 6) errs.push("Password must be 6 or more characters");
    ///
    if (country?.length === 0) errs.push("Country is required");
    if (country?.length > 15)
      errs.push("Country need to be no more than 15 characters");
    if (address?.length === 0) errs.push("Street address is required");
    if (address?.length > 36)
      errs.push("Street address need to be no more than 36 characters");
    if (city?.length === 0) errs.push("City is required");
    if (city?.length > 15)
      errs.push("City need to be no more than 15 characters");
    if (state?.length === 0) errs.push("State is required");
    if (state?.length > 15)
      errs.push("State need to be no more than 15 characters");
    if (name?.length === 0) errs.push("Title is required");
    if (name?.length > 25)
      errs.push("Title need to be no more than 25 characters");
    if (!latitude || latitude === null || latitude === 0)
      errs.push("Latitude is required");
    if (!longitude || longitude === null || longitude === 0)
      errs.push("Longitude is required");
    if (!price || price === null || price === 0)
      errs.push("Price  is required");
    if (latitude < -90 || latitude > 90)
      errs.push("Latitude need to be between 90 and -90");
    if (longitude < -180 || longitude > 180)
      errs.push("Longitude need to be between 180 and -180");

    if (description?.length < 30 || description?.length > 250)
      errs.push("Description needs to be between 30 and 250 characters");
    if (price < 0) errs.push("Price need to be less than 0");

    if (formType === "NewSpotsForm") {
      if (url?.length === 0) errs.push("Review Photo url is required");
    }

    if (errs.length === 0) setDisabled(false);
    setErrors(errs);
  }, [
    country,
    address,
    city,
    state,
    latitude,
    longitude,
    name,
    price,
    description,
    url,
    formType,
  ]);

  return (
    <div className="new-spot-form-container">
      <h2>
        {formType === "NewSpotsForm" ? "Create a new Spot" : "Update your Spot"}
      </h2>
      <form className="new-spot-form" onSubmit={handleSubmit}>
        <ul className="error-message">
          {bErrs?.name === "SequelizeValidationError" &&
            bErrs?.errors.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
          {/* {errors.map((error, idx) => (
            <li className="error-message" key={idx}>
              {error}
            </li>
          ))} */}
        </ul>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value?.trim())}
            placeholder="Country"
          />
          {/* <Select
            options={options}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          /> */}
          <p className="error-message">
            {errors.filter((err) => err.includes("Country"))}
          </p>
          {<p className="error-message">{bErrs?.county}</p>}
        </label>
        <label>
          Street
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value?.trim())}
            placeholder="Street"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Street"))}
          </p>
          {<p className="error-message">{bErrs?.street}</p>}
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value?.trim())}
            placeholder="City"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("City"))}
          </p>
          {<p className="error-message">{bErrs?.city}</p>}
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value?.trim())}
            placeholder="State"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("State"))}
          </p>
          {<p className="error-message">{bErrs?.state}</p>}
        </label>
        <label>
          Latitude
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Latitude"))}
          </p>
          {<p className="error-message">{bErrs?.lat}</p>}
        </label>
        <label>
          Longitude
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Longitude"))}
          </p>
          {<p className="error-message">{bErrs?.lng}</p>}
        </label>
        <label>
          Describe your place to guest
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your place to guest"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Description"))}
          </p>
          {<p className="error-message">{bErrs?.description}</p>}
        </label>
        <label>
          Create a title for your spot
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value?.trim())}
            placeholder="Create a title for your spot"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Title"))}
          </p>
          {<p className="error-message">{bErrs?.name}</p>}
        </label>
        <label>
          Set a base price for your spot
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Price"))}
          </p>
          {<p className="error-message">{bErrs?.price}</p>}
        </label>
        {formType === "NewSpotsForm" && (
          <>
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
            <p className="error-message">
              {errors.filter((err) => err.includes("url"))}
            </p>
            <p className="error-message">{bErrs?.price}</p>
          </>
        )}
        <button
          disabled={disabled}
          className={
            !disabled
              ? "signup-form-submit-button"
              : "signup-form-submit-button disabled-button"
          }
          type="submit"
        >
          {formType === "NewSpotsForm" ? "Create Spot" : "Update your Spot"}
        </button>
        {formType === "NewSpotsForm" && (
          <div className="login-demo-user" onClick={() => fillDemo()}>
            Demo Input
          </div>
        )}
      </form>
    </div>
  );
};
export default SpotsForm;
