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
      reg: /^[А-ЯЁ][-а-яё]+$/,
      type: RegisterFieldType.text,
      errMessage: 'Поле "Имя" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
      value: '',
    },
    {
      title: 'Фамилия',
      name: UserInfoField.lastName,
      reg: /^[А-ЯЁ][-а-яё]+$/,
      type: RegisterFieldType.text,
      errMessage: 'Поле "Фамилия" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
      value: '',
    },
    {
      title: 'Церковь',
      name: UserInfoField.church,
      reg: /^[а-яё][-а-яё ,]+$/i,
      type: RegisterFieldType.text,
      errMessage: 'Поле "Церковь" заполнено неправильно. Значение должно состоять из букв, тире, запятых и может состоять из нескольких слов. Всё остальное не допустимо.',
      value: ''
    },
    {
      title: 'Телефон',
      name: UserInfoField.phone,
      reg: /^\d{11,15}$/i,
      type: RegisterFieldType.text,
      errMessage: 'Номер телефона должен состоять только из цифр в количестве от 11 до 15',
      value: '',
    },
    {
      title: 'Дата рождения',
      name: UserInfoField.birthday,
      reg: /^(\d{1,2})([.-])(\d{1,2})\2(\d{2}|\d{4})$/,
      type: RegisterFieldType.ndate,
      errMessage: 'Неверная дата',
      value: '',
    },
    {
      title: 'Пол',
      name: UserInfoField.sex,
      reg: /^[mf]$/i,
      type: RegisterFieldType.text,
      errMessage: 'Поле "Пол" не верно введено',
      value: '',
    },
    {
      title: 'Город',
      name: UserInfoField.city,
      reg: /^[а-я][-а-я ,()]+$/i,
      type: RegisterFieldType.text,
      errMessage: 'Значение поля "Город" может содержать только буквы, знак запятой, знак тире и может состоять из нескольких слов для уточнения информации в круглых скобках.',
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
    setErrorMessage(test ? '' : field.errMessage);
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
              disabled={errorMessage !== ''}>Сохранить данные локально
      </button>
    </div>
  );
}
