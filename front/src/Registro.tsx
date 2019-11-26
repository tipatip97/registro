import React, {useState} from 'react';
import './Registro.scss';
import Registration from "./registration/registration";
import {UserInfo} from "./Registro.model";
import {appTitle} from "./utils";
import StartPage from './start-page/start-page';

function Registro() {
  const lsName = 'userInfo';
  let [userInfo, setUserInfo] = useState<UserInfo>(JSON.parse(localStorage[lsName] || 'null'));
  appTitle({title: 'Registro'});

  return userInfo == null ?
    <Registration userInfo={userInfo}
                  onUserInfoSave={userInfo => {
                    localStorage[lsName] = JSON.stringify(userInfo);
                    setUserInfo(userInfo);
                  }}/> :
    <StartPage userInfo={userInfo}/>;
}

export default Registro;