import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import TeacherList from "../pages/TeacherList";
import TeacherForm from "../pages/TeacherForm";
import Payments from "../pages/Payments";
import { useAuth } from "../contexts/auth";

const SignRoutes: React.FC = () => {
  const { role } = useAuth();

  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/study" component={TeacherList} />
      <Route path="/give-classes" component={TeacherForm} />
      {role === "admin" && <Route path="/payments" component={Payments} />}
    </BrowserRouter>
  );
};

export default SignRoutes;
