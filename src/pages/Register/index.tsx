import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";

import logoImg from "../../assets/images/logo1.svg";
import backIcon from "../../assets/images/icons/back.svg";

import Input from "../../components/Input";
import { useAuth } from "../../contexts/auth";
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';

import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

import "./styles.css";

function Landing() {
      const [user, setUser] = useState("");
      const [password, setPassword] = useState("");
      const [rePassword, setRepassword] = useState("");
      const history = useHistory();

      const [name, setName] = useState('');
      const [avatar, setAvatar] = useState('');
      const [whatsapp, setWhatsapp] = useState('');
      const [bio, setBio] = useState('');
      //const [filesPreview, setFilesPreview] = useState<string[]>([]);
      const [scheduleItems, setScheduleItems] = useState([
            { week_day: 0, from: '', to: '' }
      ]);

      const context = useAuth();

      const handleRegister = () => {
            if (rePassword === password) {
                  context.Register({ username: user, password });
            }
      };
      function addNewScheduleItem() {
            setScheduleItems([
                  ...scheduleItems,
                  { week_day: 0, from: '', to: '' }
            ]);
      }

      function setScheduleItemValue(position: number, field: string, value: string) {
            const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
                  if (index === position) {
                        return { ...scheduleItem, [field]: value };
                  }

                  return scheduleItem;
            });

            setScheduleItems(updatedScheduleItems);
      }

      function handleCreateClass(e: FormEvent) {
            e.preventDefault();

            api.post('classes', {
                  name,
                  avatar,
                  whatsapp,
                  bio,
                  schedule: scheduleItems
            }).then(() => {
                  alert('Cadastro realizado com sucesso!');

                  history.push('/');
            }).catch(() => {
                  alert('Erro no cadastro!');
            })
      }

      return (
            <div id="page-landing">
                  <header className="page-header" >
                        <div className="top-bar-container">
                              <Link to="/">
                                    <img src={backIcon} alt="Voltar" />
                              </Link>
                        </div>
                  </header >
                  <div id="page-landing-content" className="container">
                        <div id="logo-container">
                              <img src={logoImg} alt="Educa+" />
                              <h2>Sua plataforma de estudos online.</h2>
                        </div>
                        <div className="content">
                              <div className="inputs-container">
                                    <div className="input-group-1">
                                          <legend>Dados de Usuário</legend>

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
                                          <Input
                                                name="paswword"
                                                label="Insira a senha novamente"
                                                type="password"
                                                value={rePassword}
                                                onChange={e => {
                                                      setRepassword(e.target.value);
                                                }}
                                          />
                                    </div>
                                    <div className="input-group-2">
                                          <legend><br /></legend>
                                          <Input
                                                name="name"
                                                label="Nome completo"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value) }}
                                          />

                                          <Input
                                                name="avatar"
                                                label="Avatar"
                                                value={avatar}
                                                onChange={(e) => { setAvatar(e.target.value) }}
                                          />

                                          <Input
                                                name="whatsapp"
                                                label="WhatsApp"
                                                value={whatsapp}
                                                onChange={(e) => { setWhatsapp(e.target.value) }}
                                          />
                                    </div>
                              </div>
                              
                              <Link to="/" >
                                    <button type="submit" onClick={handleRegister}>
                                          Salvar cadastro
                                    </button>
                              </Link>
                        </div>
                  </div>
            </div>
      );
}

export default Landing;
