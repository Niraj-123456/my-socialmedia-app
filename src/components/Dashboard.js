import React, { useContext } from "react";
import { AuthContext } from "../features/useAuth";
import Posts from "./posts/Posts";

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {user ? <Posts /> : <h2>Please Login To Continue. Goto Login Page</h2>}
    </div>
  );
}

export default Dashboard;
