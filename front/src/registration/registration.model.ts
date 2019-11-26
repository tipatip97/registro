import {UserInfo, UserInfoFieldName} from "../Registro.model";

export interface RegistrationConfig {
    userInfo: UserInfo,
    onUserInfoSave?(userInfo: UserInfo): void,
}

export interface RegistrationResponse {
    fields: RegistrationResponseField[],
    user: UserInfo
}

export interface RegistrationResponseField {
    name: string,
    value: string,
}

export interface RegisterField extends Field {
    name: UserInfoFieldName,
    required: boolean,
    errMessage: string,
}

export enum FieldType {
    string = 'string',
    bool = 'bool',
    number = 'number',
    ndate = 'ndate',
    radio = 'radio',
}


export interface MeetingInfo {
    title: string,
    description: string,
    begin: number,
    end: number,
    fields: Field[],
}

export interface Field {
    title: string,
    description?: string,
    type: FieldType,
    name: string,
    variants?: FieldVariant[],
    required: boolean,
    reg: RegExp,
    default?: any,
}

export interface FieldVariant {
    title: string,
    value: string,
    type: FieldType,
}


