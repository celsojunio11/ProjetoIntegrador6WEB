import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import Notification from '../components/Notification';

interface User {
  username: string;
  password: string;
  role: string;
}

interface Register {
  username: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  role: string;
  Login(user: string, pass: string): Promise<any>;
  Register(user: object): Promise<any>;
  Logout(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storagedToken = localStorage.getItem("@App:token");
    const storagedUser = localStorage.getItem("@App:user");
    const storagedRole = localStorage.getItem("@App:role");

    console.log(storagedRole);

    if (storagedToken && storagedUser && storagedRole) {
      setUser(JSON.parse(storagedUser));
      setRole(JSON.parse(storagedRole));
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(
        storagedToken
      )}`;
    }
  }, []);

  async function Login(user: string, pass: string) {
    const res = await api
      .post("/login", {
        email: user,
        password: pass,
      })
      .then(res => {
        const { userName, role, token } = res.data;
        setUser(userName);
        setRole(role);
        api.defaults.headers.Authorization = `Bearer ${token}`;

        localStorage.setItem("@App:user", JSON.stringify(userName));
        localStorage.setItem("@App:token", JSON.stringify(token));
        localStorage.setItem("@App:role", JSON.stringify(role));

        return true;
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.error);
          return Notification('danger', 'Usuário ou senha incorretos!');
        }
      });
    return res;
  }

  async function Register(user: Register) {
    console.log(user);
    await api
      .post("/role/1/register", {
        userData: {
          name: "PI - TESTE",
          email: user.username,
          password: user.password,
          birthDate: "2000-06-27",
          docType: "CPF",
          docNumber: "60359978640",
          areaCode: "34",
          cellNumber: "991189081",
        },
        address: {
          cep: "38750004",
          state: "MG",
          city: "Presidente Olegário",
          neighborhood: "Planalto",
          street: "Rua Vereador Antônio Ferreira",
          number: "1810",
        },
      })
      .then(res => {
        Login(user.username, user.password);
      })
      .catch(err => {
        if (err.response) {
          console.log(err.response.data.error);
        }
      });
  }

  function Logout() {
    setUser(null);

    localStorage.removeItem("@App:user");
    localStorage.removeItem("@App:token");
  }

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, role, Login, Register, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
