import React from "react";
import PageHeader from "../../components/PageHeader";

import warning from "../../assets/images/icons/warning.svg";
import "./styles.css";

function TeacherForm() {

      return (
            <div id="page-teacher-form" className="container">
                  <PageHeader title="Que incível que você quer dar aulas.">
                        <p>O primeiro passo, é preencher esse formulário de inscrição</p>
                  </PageHeader>
                  <div id="page-main">
                        <form action="" id="create-class">
                              <fieldset>
                                    <legend>Seus dados</legend>

                                    <div className="input-block">
                                          <label>Nome Completo</label>
                                          <input name="name" id="name" required />
                                    </div>
                                    <div className="input-block">
                                          <label>Link da sua foto <small>(comece com https://)</small></label>
                                          <input name="avatar" id="avatar" type="url" required />
                                    </div>
                                    <div className="input-block">
                                          <label>Whatsapp <small>(somente números)</small></label>
                                          <input name="whatsapp" id="whatsapp" type="number" required />
                                    </div>
                                    <div className="textarea-block">
                                          <label>Biografia</label>
                                          <textarea name="bio" id="bio" required></textarea>
                                    </div>
                              </fieldset>
                              <fieldset>
                                    <legend>Sobre a aula</legend>
                                    <div className="select-block">
                                          <label>Matéria</label>
                                          <select name="subject" id="subject" required>
                                                <option value="">Selecione uma opção</option>
                                                <option value="1">React</option>
                                                <option value="2">Node</option>
                                                <option value="3">Java</option>
                                                <option value="4">Sociologia</option>
                                          </select>
                                    </div>
                                    <div className="input-block">
                                          <label>Custo da sua hora/aula
                                                <small>(R$)</small></label>
                                          <input type="cost" id="cost" required />
                                    </div>
                              </fieldset>
                              <fieldset id="schedule-itens">
                                    <legend>Horários disponíveis
                                          <button id="add-time">+ Novo Horário</button>
                                    </legend>
                                    <div className="schedule-item">
                                          <div className="select-block">
                                                <label htmlFor="weekday">Dia da Semana</label>
                                                <select name="weekday[]" required>
                                                      <option value="">Selecione uma opção</option>
                                                      <option value="0">Domingo</option>
                                                      <option value="1">Segunda-feira</option>
                                                      <option value="2">Terça-feira</option>
                                                      <option value="3">Quarta-feira</option>
                                                      <option value="4">Quinta-feira</option>
                                                      <option value="5">Sexta-feira</option>
                                                      <option value="6">Sábado</option>
                                                </select>
                                          </div>
                                          <div className="input-block">
                                                <label htmlFor="time_from">Das</label>
                                                <input type="time" id="time_from" name="time_from" required />
                                          </div>
                                          <div className="input-block">
                                                <label htmlFor="time_to">Até</label>
                                                <input type="time" id="time_to" name="time_from" required />
                                          </div>
                                    </div>
                              </fieldset>
                        </form>
                        <footer>
                              <p>
                                    <img src={warning} alt="aviso" />
                                    Importante!<br />
                                    Preencha todos os dados
                              </p>
                              <button type="submit" form="create-class">Salvar Cadastro</button>
                        </footer>
                  </div>
            </div>

      )
}

export default TeacherForm;