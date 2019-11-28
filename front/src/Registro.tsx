import React, {useState} from 'react';
import './Registro.scss';
import Registration from "./registration/registration";
import {UserInfo} from "./Registro.model";
import {appTitle} from "./utils";
import StartPage from './start-page/start-page';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

function Registro() {
  const lsName = 'userInfo';
  let [userInfo, setUserInfo] = useState<UserInfo>(JSON.parse(localStorage[lsName] || 'null'));
  appTitle({title: 'Registro'});

  return (
    <Router>
      <Switch>
        {
          userInfo == null ?
            <Route path={'/'}>
              <Registration userInfo={userInfo}
                            onUserInfoSave={userInfo => {
                              localStorage[lsName] = JSON.stringify(userInfo);
                              setUserInfo(userInfo);
                            }}/>
            </Route> :
            <Route path={'/'}>
              <StartPage userInfo={userInfo}/>
            </Route>
        }
      </Switch>
    </Router>
  );
}

export default Registro;