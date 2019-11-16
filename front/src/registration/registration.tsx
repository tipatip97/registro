import React, {useState} from 'react';
import {RegisterField, RegisterFieldType, RegistrationResponse, RegistrationResponseField} from "./registration.model";
import {UserInfo, UserInfoField} from "../Registro.model";
import {RegistroService} from "../Registro.service";

export default function Registration() {

    const registroService = new RegistroService();

    const lsName = 'user-fields';

    let [errorMessage, setErrorMessage] = useState('');

    const userFields: RegisterField[] = [
        {
            title: 'Имя',
            name: UserInfoField.name,
            reg: /^[А-Я][а-я]+$/,
            type: RegisterFieldType.text,
            value: '',
        },
        {
            title: 'Фамилия',
            name: UserInfoField.lastName,
            reg: /^[А-Я][а-я]+$/,
            type: RegisterFieldType.text,
            value: '',
        },
        {
            title: 'Церковь',
            name: UserInfoField.church,
            reg: /^[а-я][-а-я ,]+$/i,
            type: RegisterFieldType.text,
            value: ''
        },
        {
            title: 'Телефон',
            name: UserInfoField.phone,
            reg: /^\d{11,15}$/i,
            type: RegisterFieldType.text,
            value: '',
        },
        {
            title: 'Дата рождения',
            name: UserInfoField.birthday,
            reg: /^(\d{1,2})([.-])(\d{1,2})\2(\d{2}|\d{4})$/i,
            type: RegisterFieldType.ndate,
            value: '',
        },
        {
            title: 'Пол',
            name: UserInfoField.sex,
            reg: /^[mf]$/i,
            type: RegisterFieldType.text,
            value: '',
        },
        {
            title: 'Город',
            name: UserInfoField.city,
            reg: /^[а-я][-а-я ,]+$/i,
            type: RegisterFieldType.text,
            value: '',
        },
    ];

    const locRegData: RegistrationResponse = JSON.parse(localStorage[lsName] || '{"fields":[],"user":{}}');

    locRegData.fields.forEach((lsField: RegistrationResponseField) => {
        const field = userFields.find(f => f.name === lsField.name);
        if (field != null) {
            field.value = lsField.value;
        }
    });

  userFields.forEach(field => {
    const val = locRegData.user[field.name];
    if (val != null) {
      field.value = field.type === RegisterFieldType.ndate ? registroService.convertNDate(val) as string : val.toString();
    }
  });

    const saveData = () => {
        const user = {} as UserInfo;
        const fields: RegistrationResponseField[] = [];
        userFields.forEach(({name, value, type}) => {
            // @ts-ignore
            user[name] = type === RegisterFieldType.ndate ? registroService.convertNDate(value) : value;
        });
        const regData = {user, fields};
        localStorage[lsName] = JSON.stringify(regData);
        // service.sendRegData(regData).then();
    };

    const validate = (val: string, field: RegisterField) => {
      const test = field.type === RegisterFieldType.ndate ? !isNaN(registroService.convertNDate(val) as number) : field.reg.test(val);
      setErrorMessage( test ? '' : `Значение поля "${field.title}" не соответствует установленной норме!`);
    };

    return (
        <div>{
            userFields.map((field, fieldi) => {
                return (
                    <div key={`main-${fieldi}`}>
                        <label>
                            <span>{field.title}</span>
                            <input defaultValue={field.value}
                                   onInput={(e: any) => field.value = e.target.value}
                                   onBlur={e => validate(e.target.value, field)}/>
                        </label>
                    </div>
                );
            })
        }{errorMessage ? <div className="error-message">{errorMessage}</div> : null}
            <button onClick={saveData}
                    disabled={errorMessage !== ''}>SAVE
            </button>
        </div>
    );
}
