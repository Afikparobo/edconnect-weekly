import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import CreateProject from "./CreateProject";
import Project from "./Project";

function App() {
  return (
    <div className="App">
      
      <Router>

        <Switch>

          <Route path="/" exact={true} component={Home}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/login"  component={Login}/>
          <Route path="/projects/submit" exact={true} component={CreateProject} />
          <Route path="/projects/:id" exact={true} component={Project} />
        
        
        </Switch> 
      
      </Router>

    </div>  

        
      
  );
}

// cookie management functions
export function setCookie(cname, cvalue) {
  document.cookie = `${cname}=${cvalue};path=/;`;
}

// delete cookie
export function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// get cookie
export function getCookie(cname) {
  let cvalue;
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cArr = decodedCookie.split(";");
  for (let i = 0; i < cArr.length; i++) {
    let c = cArr[i];
    if (c.indexOf(name) === 0) {
      cvalue = c.substring(name.length);
      return cvalue;
    }
    return "";
  }
}


export default App;
