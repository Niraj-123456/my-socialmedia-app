import React, { useContext } from "react";
import { AuthContext } from "../features/useAuth";
import Posts from "./posts/Posts";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  return <div>{user ? <Posts /> : history.push("/login")}</div>;
}

export default Dashboard;
