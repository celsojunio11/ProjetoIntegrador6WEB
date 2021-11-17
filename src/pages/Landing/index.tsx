import React from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo1.svg";
import logoImg1 from "../../assets/images/logo1.svg";
import landingImg from "../../assets/images/landing1.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIconIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/auth";

function Landing() {
  const [totalConnections, setTotalConnections] = useState(0);
  const { role } = useAuth();

  useEffect(() => {
    api.get("connections").then(response => {
      const { total } = response.data;

      setTotalConnections(total);
    });
  });

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div id="logo-container">
          <img src={role === 'user' ? logoImg : logoImg1} alt="Educa+" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de Estudos"
          className="hero-image"
        />

        <div className="buttons-container">
          {role === "user" ? (
            <>
              <Link to="/study" className="study">
                <img src={giveClassesIcon} alt="Estudar" />
                {role === "user" ? "Estudar" : ""}
              </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={studyIcon} alt="Dar Aulas" />
                Dar Aulas
              </Link>
            </>
          ) : (
            <>
              <Link to="/study" className="study">
                <img src={giveClassesIcon} alt="Estudar" />
                {role === "user" ? "Estudar" : "Ver aulas"}
              </Link>
            </>
          )}
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas{" "}
          <img src={purpleHeartIconIcon} alt="Coração" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
