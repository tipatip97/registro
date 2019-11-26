import {AppTitleConfig} from "./utils.model";
import {UserInfo} from "./Registro.model";

export const appTitle = (config: AppTitleConfig) => {
  document.title = config.title;
};

export class UserInfoApplicator {
  userInfo: UserInfo = {} as UserInfo;


  setUserInfo(userInfo: UserInfo) {
    if (this.userInfo == null && userInfo != null) this.userInfo = userInfo;
  }

  // getSexPositions() {
  //
  // }
}

