import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";

// views

import Dashboard from "views/patient/Dashboard.js";
import Settings from "views/patient/Settings.js";
import Tables from "views/patient/Tables.js";

export default function Patient() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/patient/:id/dashboard" exact component={Dashboard} />
            <Route path="/patient/:id/settings" exact component={Settings} />
            <Route path="/patient/:id/tables" exact component={Tables} />
            <Redirect from="/patient/:id" to="/patient/:id/dashboard" />
          </Switch>
        </div>
      </div>
    </>
  );
}