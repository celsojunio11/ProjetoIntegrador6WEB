import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

interface User {
      userName: string;
}

interface Register {
      name: string;
      username: string;
      pass: string;
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
                  .post("/user", {
                        name: user.name,
                        username: user.username,
                        pass: user.pass,
                        token: "",
                  })
                  .then(res => {
                        Login(user.username, user.pass);
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
