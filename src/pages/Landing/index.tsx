import React from "react";

import logoImg from "../../assets/images/logo1.svg";
import landingImg from "../../assets/images/landing1.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIconIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div id="logo-container">
          <img src={logoImg} alt="Educa+" />
         <h2>Sua plataforma de estudos online.</h2>
        </div>

      <img src={landingImg} alt="Plataforma de Estudos" className="hero-image" />

      <div className="buttons-container">
        <a href="" className="study">
          <img src={giveClassesIcon} alt="Estudar" />
          Estudar
        </a>

        <a href="" className="give-classes">
          <img src={studyIcon} alt="Dar Aulas" />
          Dar Aulas
        </a>
      </div>
      <span className="total-connections">
        Total de 100 conexões já realizadas{" "}
        <img src={purpleHeartIconIcon} alt="Coração" />
      </span>
    </div>
    </div>
  );
}

export default Landing;
