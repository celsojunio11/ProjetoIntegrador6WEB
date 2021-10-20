import React, { useState } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo1.svg";

import Input from "../../components/Input";
import { useAuth } from "../../contexts/auth";

import "./styles.css";

function Landing() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const context = useAuth();

  const handleLogin = () => {
    context.Login(user, password);
  };

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div id="logo-container">
          <img src={logoImg} alt="Educa+" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <div className="inputs-container">
          <Input
            name="username"
            label="Usuário"
            value={user}
            onChange={e => {
              setUser(e.target.value);
            }}
          />
          <Input
            name="paswword"
            label="Senha"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          <Link to="/home">
            <button type="submit" onClick={handleLogin}>
              Salvar cadastro
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
