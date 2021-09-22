import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg';

//import api from '../../services/api';

import './styles.css';



function TeacherForm() {
      return (
            <div id="page-teacher-form" className="container">
                  <PageHeader
                        title="Que incrível que você quer dar aulas."
                        description="O primeiro passo é preencher esse formulário de inscrição"
                  />

                  <main>
                        <fieldset>
                              <legend>Seus dados</legend>
                              <Input name="name" label="Nome completo" />
                              <Input name="avatar" label="Avatar" />
                              <Input name="whatsapp" label="Whatsapp" />
                              <Textarea name="bio" label="Biografia" />
                        </fieldset>

                        <fieldset>
                              <legend>Sobre a aula</legend>
                              <Select
                                    name="subject"
                                    label="Matéria"
                                    options={[
                                          { value: 'Artes', label: 'Artes' },
                                          { value: 'Biologia', label: 'Biologia' },
                                          { value: 'Geoagrafia', label: 'Geoagrafia' },
                                          { value: 'Literatura', label: 'Literatura' },
                                          { value: 'Matematica', label: 'Matematica' },
                                          { value: 'Inglês', label: 'Inglês' },
                                          { value: 'Programação', label: 'Programação' },
                                    ]}
                              />
                              <Input name="cost" label="Custo da sua hora por aula" />
                        </fieldset>

                        <fieldset>
                              <legend>
                                    Horários disponíveis
                                    <button type="button">
                                          + Novo horário
                                    </button>
                              </legend>
                        </fieldset>

                        <div className="schedule-item">
                        <Select
                                    name="subject"
                                    label="Matéria"
                                    options={[
                                          { value: 'Artes', label: 'Artes' },
                                          { value: 'Biologia', label: 'Biologia' },
                                          { value: 'Geoagrafia', label: 'Geoagrafia' },
                                          { value: 'Literatura', label: 'Literatura' },
                                          { value: 'Matematica', label: 'Matematica' },
                                          { value: 'Inglês', label: 'Inglês' },
                                          { value: 'Programação', label: 'Programação' },
                                    ]}
                              />
                              <Input name="from" label = "Das" type = "time" />
                              <Input name="from" label = "Das" type = "time" />
                              
                        </div>

                        <footer>
                              <p>
                                    <img src={warningIcon} alt="IMPORTANTE" />
                                    Importante! <br />
                                    Preencha todos os dados
                              </p>
                              <button type="button" >
                                    Salvar cadastro
                              </button>
                        </footer>
                  </main>

            </div>
      )
}

export default TeacherForm;