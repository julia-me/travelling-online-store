import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import toursData from "../../data/tours";
import TourItem from "./TourItem";
import "bootstrap/dist/css/bootstrap.css";
import "./Tour.scss";

const mapStateToProps = store => {
  return {
    liginedUser: store.loginUser,
    newTours: store.newTours
  };
};

function TourCards({ liginedUser, newTours }) {
  let toursArr = [...toursData, ...newTours];
  const [loginMessage, setLoginMessage] = useState(false);
  const [tours, setTours] = useState([...toursArr]);
  const [arrivalCountry, setArrivalCountry] = useState("");
  const [cityDeparture, setCityDeparture] = useState("");

  useEffect(() => {
    if (liginedUser.length) {
      setLoginMessage(false);
    }
  }, [liginedUser]);

  useEffect(() => {
    let filterTour = toursArr.filter(tour =>
      tour.arrivalCountry.toLowerCase().includes(arrivalCountry.toLowerCase())
    );
    filterTour = filterTour.filter(tour =>
      tour.departureCity.toLowerCase().includes(cityDeparture.toLowerCase())
    );
    setTours(filterTour);
  }, [arrivalCountry, cityDeparture]);

  return (
    <div className="main container">
      <h1 className="tour-title"> Let's choose the best tour!</h1>
      <div className="main-search">
        <input
          onChange={e => setArrivalCountry(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="enter name of country arrival"
          className="main-search-input"
        />
        <input
          onChange={e => setCityDeparture(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="enter name of city departure"
          className="main-search-input"
        />
      </div>
      {loginMessage ? (
        <h3 className="error"> to add tours in favourite you need log in </h3>
      ) : null}
      <div className="row tour-wrapper">
        {tours.map(tour => {
          return (
            <TourItem
              setLoginMessage={setLoginMessage}
              data={tour}
              key={tour.id + tour.arrivalCity}
            />
          );
        })}
      </div>
    </div>
  );
}

export default connect(
  mapStateToProps,
  null
)(TourCards);
