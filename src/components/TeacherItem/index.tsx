import React from "react";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import "./styles.css";
import api from "../../services/api";

export interface Teacher {
      id: number;
      avatar: string;
      bio: string;
      price: number;
      teacher: string;
      subject: string;
      title: string;
      tel: string;
}
interface TeacherItemProps {
      teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
      function createNewConnection() {
            api.post("connections", {
                  user_id: teacher.id,
            });
      }

      return (
            <article className="teacher-item">
                  <header>
                        <img src={teacher.avatar} alt={teacher.teacher} />
                        <div>
                              <strong>{teacher.teacher}</strong>
                              <span>{teacher.subject} - {teacher.title}</span>
                        </div>
                  </header>

                  <p>{teacher.bio}</p>

                  <footer>
                        <p>
                              Preço/hora
                              <strong>R$ {teacher.price.toFixed(2).replace('.', ',')}</strong>
                        </p>

                       <div id="botaoAula">
                        <a
                              target="_blank"
                              rel="noreferrer"
                              href={`https://drive.google.com/file/d/103CYuf_DhdRZ2vzJKbr5eKAs2ki2wkEL/view?usp=sharing`}
                        >
                              <img src={studyIcon} alt="Study" />
                              Assistir aula
                        </a>
                  </div>

                  <a
                        target="_blank"
                        rel="noreferrer"
                        onClick={createNewConnection}
                        href={`https://wa.me/${teacher.tel.replace(/[^a-z0-9]/gi, "")}`}
                  >
                        <img src={whatsappIcon} alt="Whatsapp" />
                        Entrar em contato
                  </a>
            </footer>
            </article >
      );
};

export default TeacherItem;
