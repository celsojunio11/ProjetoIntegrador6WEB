import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import moment from 'moment';

import appApi from "../../services/appApi";
import { useAuth } from "../../contexts/auth";

import "./styles.css";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [modality, setModality] = useState("");
  const [date, setDate] = useState("");
  const { role } = useAuth();

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();

    console.log(subject, moment(date).format("DD/MM/YY"), modality)
    const response = await appApi.get("class", {
      params: {
        subject: subject !== '' ? subject : '',
        date: date !== '' ? moment(date).format("DD/MM/YY") : '',
        modality: modality !== '' ? modality : '',
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os professores disponíveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => {
              setSubject(e.target.value);
            }}
            options={[
              { value: "Linguas", label: "Linguas" },
              { value: "Tecnologia", label: "Tecnologia" },
              { value: "Ciências", label: "Ciências" },
              { value: "Educação física", label: "Educação física" },
              { value: "Física", label: "Física" },
              { value: "Geografia", label: "Geografia" },
              { value: "História", label: "História" },
              { value: "Matemática", label: "Matemática" },
              { value: "Português", label: "Português" },
              { value: "Química", label: "Química" },
            ]}
          />
          <Select
            name="week_day"
            label="Modalidade"
            value={modality}
            onChange={e => {
              setModality(e.target.value);
            }}
            options={[
              { value: "Presencial", label: "Presencial" },
              { value: "Online", label: "Online" }
            ]}
          />
          <Input
            type="date"
            name="time"
            label="Data"
            value={date}
            onChange={e => {
              setDate(e.target.value);
            }}
          />

          <button onClick={searchTeachers}>Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
}

export default TeacherList;
