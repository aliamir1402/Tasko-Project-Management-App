import React from "react";
import searchlogo from "../images/search.svg";
import textformatlogo from "../images/format_size.svg";
import profilelogo from "../images/person.svg";
import settinglogo from "../images/settings.svg";
import historylogo from "../images/history.svg";
import homelogo from "../images/home.svg";
import documentlogo from "../images/description.svg";
import starlogo from "../images/star.svg";
import logo from "../logo.svg";
import ProgressCircle from "../components/progresscircle.js";

export default function Sidebar() {
  return (
    <div className="bor nav-margin">
      <div className="App-container title-margin">
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="title">TASKO</div>
      </div>
      <hr className="space" />
      <div class="App-container">
        <i class="fas fa-search search-icon"></i>
        <input type="text" class="search-bar" placeholder="Search..." />
        <button class="search-button">
          <img src={searchlogo} alt="#" />
        </button>
        <button class="search-button">
          <img src={textformatlogo} alt="#" />
        </button>
      </div>
      <hr className="space" />
      <hr className="space-2" />
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={homelogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          Home
        </a>
      </div>
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={historylogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          History
        </a>
      </div>
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={documentlogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          Projects
        </a>
      </div>
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={starlogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          Favourites
        </a>
      </div>
      <hr className="space-2" />

      <hr className="space" />
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={profilelogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          Profile
        </a>
        <ProgressCircle></ProgressCircle>
      </div>
      <div class="App-container sidebar-options">
        <i class="fas fa-search search-icon">
          <img className="search-button" src={settinglogo} alt="#" />
        </i>
        <a className="imp-sidebar-links" href="#">
          Setting
        </a>
      </div>
      <hr className="space-2" />
      <hr className="space" />
    </div>
  );
}
