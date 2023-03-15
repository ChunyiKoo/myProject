import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../context/Modal";
import { createASpot, updateASpot, fetchSingleSpot } from "../store/spots.js";
import { useHistory, useParams } from "react-router-dom";
import { clearSingleSpot } from "../store/spots";

const SpotsForm = ({ formType }) => {
  const [run, setRun] = useState(false);
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
  const [disabled, setDisabled] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const { closeModal } = useModal();
  const history = useHistory();
  const params = useParams();
  const { spotId } = params;
  console.log("errors array: ", errors);
  // setOnModalClose(history.push("/spots/"));
  console.log("SpotsForm spotId: ", spotId);
  let spots = useSelector((state) => state.spots);

  useEffect(() => {
    dispatch(fetchSingleSpot(spotId));
    return () => dispatch(clearSingleSpot());
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
  }, [formType, spots]);

  const fillDemo = () => {
    setCountry("USA");
    setAddress("123 Happy street");
    setCity("Cherry");
    setState("TX");
    setLatitude(33);
    setLongitude(-156);
    setDescription("A very beautiful waterfront house");
    setName("Cherry house");
    setUrl("https://live.staticflickr.com/4050/4570420809_4f44ae5dba_n.jpg");
    setPrice(233);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setBErrs([]);
    if (!showErr) setShowErr(true);

    const newSpot = {
      country: country.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      lat: latitude,
      lng: longitude,
      description: description.trim(),
      name: name.trim(),
      price,
    };

    const thunkActionProducer = (formType) => {
      if (formType === "NewSpotsForm") {
        console.log("NewSpotsForm");
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
        console.log("UpdateSpotForm");
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

    if (run) thunkActionProducer(formType);
  };

  useEffect(() => {
    //let errs = [];
    //  if (password.length < 6) errs.push("Password must be 6 or more characters");
    ///

    let errs = [];
    if (showErr) setDisabled(true);
    if (country?.trim().length === 0 || country?.trim() === "")
      errs.push("Country is required");
    if (country?.trim().length > 15)
      errs.push("Country need to be no more than 15 characters");
    if (address?.trim().length === 0 || address?.trim() === "")
      errs.push("Street address is required");
    if (address?.trim().length > 36)
      errs.push("Street address need to be no more than 36 characters");
    if (city?.trim().length === 0 || city?.trim() === "")
      errs.push("City is required");
    if (city?.trim().length > 15)
      errs.push("City need to be no more than 10 characters");
    if (state?.trim().length === 0 || state?.trim() === "")
      errs.push("State is required");
    if (state?.trim().length > 10)
      errs.push("State need to be no more than 15 characters");
    if (name?.trim().length === 0 || name?.trim() === "")
      errs.push("Title is required");
    if (name?.trim().length > 25)
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

    if (
      description?.trim().length < 30 ||
      description?.trim().length > 250 ||
      description?.trim() === ""
    )
      errs.push("Description needs to be between 30 and 250 characters");
    if (price < 0) errs.push("Price need to be no less than 0");

    if (formType === "NewSpotsForm") {
      if (url?.trim().length === 0) errs.push("Review Photo url is required");
    }

    if (showErr) {
      if (errs.length === 0) setDisabled(false);
      if (run === false) setRun(true);
      setErrors(errs);
    } else {
      if (errs.length === 0) setRun(true);
      else setRun(false);
    }
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
    showErr,
  ]);

  return (
    <div className="new-spot-form-container">
      <h2>
        {formType === "NewSpotsForm" ? "Create a new Spot" : "Update your Spot"}
      </h2>

      <form className="new-spot-form" onSubmit={handleSubmit}>
        <div className="where-text">
          <p className="medium-text">Where's your place located?</p>
          <p className="small-text">
            Guest will only get your exact address once they booked a
            reservation
          </p>
        </div>
        <ul className="error-message">
          {bErrs?.name === "SequelizeValidationError" &&
            bErrs?.errors.map((error, idx) => (
              <li key={idx}>{error.message}</li>
            ))}
          {/* {bErrs?map((error, idx) => (
            <li className="error-message" key={idx}>
              {error}
            </li>
          ))} */}
        </ul>
        <label className="small-text">
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
        <label className="small-text">
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
        <div className="city-state">
          <label className="city-label small-text">
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
          ,
          <label className="state-label small-text">
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
        </div>
        <div className="Lat-Lng">
          <label className="lat-label small-text">
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
          ,
          <label className="lng-label small-text">
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
        </div>
        <div className="where-text">
          <p className="medium-text diviser">Describe your place to guests</p>
          <p className="small-text">
            Mention the best features of your space, any special amentities like
            fast wifi or parking, and what you love about the neighborhood.
          </p>
        </div>
        <label className="small-text">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Description"))}
          </p>
          {/* {<p className="error-message">{bErrs?.description}</p>} */}
        </label>
        <label className="small-text">
          <div className="where-text">
            <p className="medium-text diviser">Create a title for your spot</p>
            <p className="small-text">
              Catch guests' attention with a spot title that highlights what
              makes your place special.
            </p>
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value?.trim())}
            placeholder="Create a title for your spot"
          />
          <p className="error-message">
            {errors.filter((err) => err.includes("Title"))}
          </p>
          {/* {<p className="error-message">{bErrs?.name}</p>} */}
        </label>
        <label className="small-text">
          <div className="where-text">
            <p className="medium-text diviser">
              Set a base price for your spot
            </p>
            <p className="small-text">
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
          </div>
          <div className="price-money">
            &#160;$&#160;
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price per night (USD)"
            />
          </div>
          <p className="error-message">
            {errors.filter((err) => err.includes("Price"))}
          </p>
          {/* {<p className="error-message">{bErrs?.price}</p>} */}
        </label>
        {formType === "NewSpotsForm" && (
          <>
            <div className="where-text">
              <p className="medium-text diviser">
                Liven up your spot with photos
              </p>
              <p className="small-text">
                Submit a link to at least one photo to publish your spot.
              </p>
            </div>
            <label className="small-text">
              <input
                type="url"
                value={url}
                placeholder="Preview Image URL"
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </label>
            <p className="error-message">
              {errors.filter((err) => err.includes("url"))}
            </p>
            {/* <p className="error-message">{bErrs?.url}</p> */}
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
