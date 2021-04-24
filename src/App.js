import React, { Component } from "react";
import {
  ReactiveBase,
  DataSearch,
  ResultList,
  ReactiveList,
  MultiList,
  RangeSlider
} from "@appbaseio/reactivesearch";
import "./styles.css";

import oxygen from "./Images/oxygen.jpg";
import Ambulance from "./Images/Ambulance.png";
import icu from "./Images/icu.png";
import noimage from "./Images/noimage.jpg";
import beds from "./Images/beds.jpg";
import medicines from "./Images/Medicines.jpg";
import meals from "./Images/meals.jpg";
import doctor from "./Images/doctor.png";
import hospital from "./Images/hospital.jpg";
import blood from "./Images/blood.png";

class App extends Component {
  onData(data) {
    const image =
      data.type === "Oxygen"
        ? oxygen
        : data.type === "Ambulance"
        ? Ambulance
        : data.type === "Non-oxygen beds"
        ? beds
        : data.type === "Ventilator"
        ? beds
        : data.type === "Meal"
        ? meals
        : data.type === "Blood"
        ? blood
        : data.type === "Hospital"
        ? hospital
        : data.type === "Doctor"
        ? doctor
        : data.type === "Medicines"
        ? medicines
        : data.type === "Oxygen beds"
        ? beds
        : data.type === "Beds"
        ? beds
        : data.type === "Cylinder"
        ? oxygen
        : data.type === "ICU beds"
        ? icu
        : data.type === "Home ICU"
        ? icu
        : noimage;

    const { address } = data;

    return (
      <ReactiveList.ResultListWrapper>
        <ResultList key={data._id}>
          <ResultList.Image src={image} />
          <ResultList.Content>
            <ResultList.Title>{data.name}</ResultList.Title>
            <ResultList.Description>
              <div>
                <p>
                  <b>Address</b>: {address}
                </p>
                <p>
                  <b>Phone</b>: {data.phone}
                </p>
                <p>
                  <b>City</b>: {data.city}
                </p>
                <p>
                  <b>Item</b>: {data.type}
                </p>
                <p>
                  <b>Quantity</b>: {data.quantity}
                </p>
                <p>
                  <b>Availability</b>: {data.availability}
                </p>
                <p>
                  <b>Verified</b>: {data.verified}
                </p>
              </div>
            </ResultList.Description>
          </ResultList.Content>
        </ResultList>
      </ReactiveList.ResultListWrapper>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <ReactiveBase
          app="covid"
          url="https://GS0qzgiGf:d49e9caa-37c4-495e-b49f-c3162058e2d4@covid-data-rhvqwgi-arc.searchbase.io"
          //type="yelp-app"
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">
              <h4 class="main-title">Covid Help </h4>
              <text class="title">Largest Crowd Source Database</text>
            </a>

            <div className="col-lg-7 dataSearch">
              <DataSearch
                componentId="nameReactor"
                placeholder="Search for Verified Ventilators, Blood Donors, Oxygen Suppliers"
                dataField={[
                  "type",
                  "type.search",
                  "type.autosuggest",
                  "city",
                  "city.search",
                  "city.autosuggest"
                ]}
                searchInputId="NameSearch"
                iconPosition="right"
                renderError={(error) => (
                  <div>
                    Something went wrong with DataSearch
                    <br />
                    Error details
                    <br />
                    {error}
                  </div>
                )}
              />
            </div>
            <div className="links">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/anupam-tiwari/"
                className="btn  link"
              >
                <i className="fa fa-linkedin" aria-hidden="true" /> Contact Us!
              </a>
            </div>
            <div className="links">
              <a
                target="_blank"
                href="https://forms.gle/9AJoGckoy8HtcEiAA"
                className="btn  link"
              >
                <i className="fa fa-linkedin" aria-hidden="true" /> Add Data
              </a>
            </div>
            <div className="links">
              <a
                target="_blank"
                href="https://forms.gle/8VdDPT6PCffqZZXE7"
                className="btn  link"
              >
                <i className="fa fa-linkedin" aria-hidden="true" /> Request Data
              </a>
            </div>
          </nav>

          <div className="row">
            <div className="col-8 col-lg-3 col-md-3 col-sm-4 scroll">
              <div className="box">
                <MultiList
                  dataField="city.keyword"
                  title="City"
                  componentId="currencyReactor"
                  placeholder="Filter City"
                  showFilter={true}
                  filterLabel="City Options"
                  react={{
                    and: ["nameReactor", "cuisineReactor"]
                  }}
                />
              </div>
              <div className="box">
                <MultiList
                  dataField="type.keyword"
                  title="Required Item"
                  componentId="cuisineReactor"
                  placeholder="Required Item"
                  showFilter={true}
                  filterLabel="Required Item"
                  react={{
                    and: ["ratingsReactor", "currencyReactor", "nameReactor"]
                  }}
                  renderError={(error) => (
                    <div>
                      Something went wrong with Cuisine MultiList
                      <br />
                      Error details
                      <br />
                      {error}
                    </div>
                  )}
                />
              </div>
            </div>

            <div className="col-12 col-lg-6 col-md-6 col-sm-8 scroll">
              <ReactiveList
                componentId="queryResult"
                dataField={["name"]}
                from={0}
                size={15}
                renderItem={this.onData}
                pagination={true}
                react={{
                  and: [
                    "currencyReactor",
                    "ratingsReactor",
                    "cuisineReactor",
                    "deliveringNowReactor",
                    "bookingReactor",
                    "deliveryReactor",
                    "tableBookinReactor",
                    "nameReactor",
                    "RangeSliderSensor"
                  ]
                }}
                renderError={(error) => (
                  <div>
                    Something went wrong with ResultList!
                    <br />
                    Error details
                    <br />
                    {error}
                  </div>
                )}
              />
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6">
              <p>This page was viewed</p>
              <h1 id="count">.</h1>
              <p>times</p>
            </div>
          </div>
        </ReactiveBase>
      </div>
    );
  }
}
export default App;
