import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

interface User {
      username: string;
      password: string;
}

interface Register {
      username: string;
      password: string;
}

interface AuthContextData {
      signed: boolean;
      user: User | null;
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

      useEffect(() => {
            const storagedToken = localStorage.getItem("@App:token");
            const storagedUser = localStorage.getItem("@App:user");

            if (storagedToken && storagedUser) {
                  setUser(JSON.parse(storagedUser));
                  api.defaults.headers.Authorization = `Bearer ${JSON.parse(
                        storagedToken
                  )}`;
            }
      }, []);

      async function Login(user: string, pass: string) {
            console.log(user, pass);
            const res = await api
                  .post("/login", {
                        email: user,
                        password: pass,
                  })
                  .then(res => {
                        const { userName, token } = res.data;
                        setUser(userName);
                        api.defaults.headers.Authorization = `Bearer ${token}`;

                        localStorage.setItem("@App:user", JSON.stringify(userName));
                        localStorage.setItem("@App:token", JSON.stringify(token));

                        return true;
                  })
                  .catch(err => {
                        if (err.response) {
                              console.log(err.response.data.error);
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
                              cellNumber: "991189081"
                        },
                        address: {
                              cep: "38750004",
                              state: "MG",
                              city: "Presidente Olegário",
                              neighborhood: "Planalto",
                              street: "Rua Vereador Antônio Ferreira",
                              number: "1810"
                        }
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
                  value={{ signed: Boolean(user), user, Login, Register, Logout }}
            >
                  {children}
            </AuthContext.Provider>
      );
};

export default AuthContext;
