import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component.js"
import Sidebar from "./components/sidebar.component.js"
import reportList from "./components/reportList.js";
import editReport from "./components/editReport.js";
import createReport from "./components/createReport";
import createLocation from "./components/createLocation.js";

function App () {
  return (
    <Router>
        <Navbar />
        <Sidebar />
        <br/>
        <div className="container">
        <Route path="/" exact component={reportList} />
        <Route path="/edit/:id" component={editReport} />
        <Route path="/create" component={createReport} />
        <Route path="/location" component={createLocation} />          
        </div>

    </Router>
    
  )

}

export default App;
