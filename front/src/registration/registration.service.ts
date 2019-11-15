import {Http} from "../tools/http";
import {RegistrationResponse} from "./registration.model";
import {environment} from "../environment";


export class RegistrationService {
  http: Http;

  constructor() {
    this.http = new Http();
  }

  sendRegData(regData: RegistrationResponse) {
    return this.http.post(environment.base, regData);
  }
}
