import React from 'react';
import './Registro.scss';
import Registration from "./registration/registration";
import {UserInfo} from "./Registro.model";

function Registro() {
  const lsName = 'userInfo';
  const locUserInfo: UserInfo = JSON.parse(localStorage[lsName] || 'null');

  return <Registration userInfo={locUserInfo} onUserInfoSave={userInfo => localStorage[lsName] = JSON.stringify(userInfo)}/>;
}

export default Registro;