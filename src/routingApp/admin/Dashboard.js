import React from "react";
import { Route } from "react-router-dom";
import Users from "./Users";
import Posts from "./Posts";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div>
      <h1>AdminPage</h1>
      <Sidebar />
      <Route path="/admin/users" component={Users} />
      <Route path="/admin/posts" component={Posts} />
    </div>
  );
};

export default Dashboard;
