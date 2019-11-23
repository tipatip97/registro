import {UserInfo, UserInfoField} from "../Registro.model";

export interface RegistrationResponse {
    fields: RegistrationResponseField[],
    user: UserInfo
}

export interface RegistrationResponseField {
    name: string,
    value: string,
}

export interface RegisterField {
    title: string,
    description: string,
    required: boolean,
    name: UserInfoField,
    reg: RegExp,
    type: RegisterFieldType,
    value: string | number | null,
    variants?: {title: string, value: string}[],
    default?: any,
    errMessage: string,
}

export enum RegisterFieldType {
    text = 'text',
    bool = 'bool',
    ndate = 'ndate',
    radio = 'radio',
}

