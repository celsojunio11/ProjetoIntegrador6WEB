import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthRoutes: React.FC= () => {
      return (
            <BrowserRouter>
                  <Route path="/login" exact component={Login} />
                  <Route path="/register" exact component={Register} />
            </BrowserRouter>
      );
}

export default AuthRoutes;