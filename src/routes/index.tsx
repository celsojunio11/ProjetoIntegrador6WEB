import React from "react";
import { useAuth } from "../contexts/auth";

import SignRoutes from "./Sign";
import AuthRoutes from "./Auth";

const Routes: React.FC = () => {
  const { signed } = useAuth();
  console.log(signed);

  return signed ? <SignRoutes /> : <AuthRoutes />;
};

export default Routes;
