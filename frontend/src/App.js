import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import NewSpotsForm from "./components/NewSpotsForm";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetail";
import SpotsCurrent from "./components/SpotsCurrent";
import UpdateSpotForm from "./components/UpdateSpotForm";
import ReviewCurrent from "./components/ReviewCurrent";
import TripList from "./components/TripList";
import NewBookingForm from "./components/NewBookingForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        {isLoaded && (
          <Route path="/spots/new">
            <NewSpotsForm />
          </Route>
        )}
        {isLoaded && (
          <Route path="/spots/:spotId/edit">
            <UpdateSpotForm />
          </Route>
        )}
        {isLoaded && (
          <Route path="/spots/current">
            <SpotsCurrent />
          </Route>
        )}
        {isLoaded && (
          <Route path="/reviews/current">
            <ReviewCurrent />
          </Route>
        )}
        {isLoaded && (
          <Route path="/bookings/current">
            <TripList />
          </Route>
        )}
        <Route path="/spots/:spotId">
          <SpotDetail />
        </Route>
        {isLoaded && (
          <Route path="/bookings/new">
            <NewBookingForm />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
