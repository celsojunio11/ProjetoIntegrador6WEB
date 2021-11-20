import React, { useState, ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import appApi from "../../services/appApi";
import moment from "moment";

import "./styles.css";

function TeacherForm() {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [modality, setModality] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [filesPreview, setFilesPreview] = useState<string[]>([]);

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: "", to: "" }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  function handleSelectedFiles(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedFiles = Array.from(event.target.files);

    setFiles(selectedFiles);

    const selectedFilesPreview = selectedFiles.map(file => {
      return URL.createObjectURL(file);
    });

    setFilesPreview(selectedFilesPreview);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    appApi
      .post("class", {
        teacherId: 1,
        title,
        subject,
        modality,
        price: Number(price),
        description,
        date: moment(`${day}`).format("DD/MM/YY HH:MM"),
      })
      .then(() => {
        alert("Cadastro realizado com sucesso!");

        history.push("/study");
      })
      .catch(() => {
        alert("Erro no cadastro!");
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Sobre a aula</legend>

            <Input
              name="title"
              label="Título da Aula"
              value={title}
              onChange={e => {
                setTitle(e.target.value);
              }}
            />
            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação física", label: "Educação física" },
                { value: "Física", label: "Física" },
                { value: "Geografia", label: "Geografia" },
                { value: "História", label: "História" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
                { value: "Tecnologia", label: "Tecnologia" },
                { value: "Linguas", label: "Linguas" },
              ]}
            />
            <Select
              name="modality"
              label="Modalidade"
              value={modality}
              onChange={e => {
                setModality(e.target.value);
              }}
              options={[
                { value: "Presencial", label: "Presencial" },
                { value: "Online", label: "Online" },
              ]}
            />

            <Input
              name="price"
              label="Custo da sua aula por hora"
              value={price}
              onChange={e => {
                setPrice(e.target.value);
              }}
            />

            <Textarea
              name="description"
              label="Ementa"
              value={description}
              onChange={e => {
                setDescription(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Anexos</legend>

            <Input
              name="Material Complementar"
              label="Material Complementar"
              type="file"
              multiple
              onChange={handleSelectedFiles}
            />

            {filesPreview.map(file => (
              <iframe key={file} src={file} />
            ))}
          </fieldset>

          <fieldset>
            <legend>
              Horário
              {/* <button type="button" onClick={addNewScheduleItem}>
                                                + Novo horário
                                          </button> */}
            </legend>
            <div className="schedule-item">
              <Input
                name="day"
                label="Dia"
                type="date"
                value={day}
                onChange={e => setDay(e.target.value)}
              />
              <Input
                name="hours"
                label="Horas"
                type="time"
                value={hours}
                onChange={e => setHours(e.target.value)}
              />
            </div>
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default TeacherForm;
