import React, {useState} from 'react';
import {RegisterField, RegisterFieldType, RegistrationResponse, RegistrationResponseField} from "./registration.model";
import {UserInfo, UserInfoField} from "../Registro.model";
import {RegistroService} from "../Registro.service";
import './registration.scss';
import DatePicker from "../tools/date-picker/date-picker";
import {DatePickerUserConfig} from "../tools/date-picker/date-picker.model";

export default function Registration() {

  let [errorMessage, setErrorMessage] = useState('');
  let [datePickerInputTarget, setDatePickerInputTarget] = useState<any>(null);
  let [birthdayTime, setBirthdayTime] = useState<number | null>();

  const validate = (val: string, field: RegisterField) => {
    const test = field.type === RegisterFieldType.ndate ? field.reg.test(val) && !isNaN(registroService.convertNDate(val, 'number') as number) : field.reg.test(val);
    setErrorMessage(test ? '' : field.errMessage);
    return test;
  };

  const datePickerConfig: DatePickerUserConfig = {};

  return (
    <div className="registration-page">{
      userFields.map((field, fieldi) => {
        return (
          <div className="field" key={`registration-page-field-${fieldi}`}>
            <label className={`label-wrapper${field.type === RegisterFieldType.ndate ? ' date' : ''}`}>
              <span className="field-title">{field.title}</span>
              <input className="field-input"
                     defaultValue={field.value || ''}
                     onInput={(e: any) => {
                       if (field.type === RegisterFieldType.ndate) {
                         const val = registroService.convertNDate(e.target.value, 'number') as number;

                         if (!isNaN(val)) {
                           datePickerConfig.updateDate && datePickerConfig.updateDate(val);
                           field.value = val;
                         }
                       } else field.value = e.target.value;
                     }}
                     onKeyUp={(e: any) => {
                       if (field.type === RegisterFieldType.ndate) {
                         if (e.keyCode === 13) {
                           const val = registroService.convertNDate(e.target.value, 'string', 'ru');
                           if (val) {
                             field.value = e.target.value = val;
                             setDatePickerInputTarget(null);
                           }
                         } else if (e.keyCode === 40) setDatePickerInputTarget(e.target);
                         else if (e.keyCode === 27) setDatePickerInputTarget(null);
                         else if (datePickerInputTarget == null) setDatePickerInputTarget(e.target);
                       }
                     }}
                     onFocus={e => {
                       setDatePickerInputTarget(field.type === RegisterFieldType.ndate ? e.target : null);
                       if (field.type === RegisterFieldType.ndate) {
                       }
                     }}
                     onBlur={e => {
                       const test = validate(e.target.value, field);
                       if (test) field.value = field.type === RegisterFieldType.ndate ? registroService.convertNDate(e.target.value, 'string', 'ru') : e.target.value;
                     }}/>
              {
                field.type === RegisterFieldType.ndate && datePickerInputTarget ?
                  <DatePicker init={birthdayTime || field.value || '-20y'}
                              config={datePickerConfig}
                              onInit={date => setTimeout(() => datePickerInputTarget.value = registroService.convertNDate(date, 'string', 'ru'))}
                              onValueChange={date => {
                                setBirthdayTime(date);
                                datePickerInputTarget.value = registroService.convertNDate(date, 'string', 'ru');
                                field.value = date;
                                datePickerInputTarget.blur();
                                setDatePickerInputTarget(null);
                              }}/> :
                  null
              }
            </label>
            <div className={`paranja${datePickerInputTarget != null ? ' active' : ''}`}
                 onClick={() => setDatePickerInputTarget(null)}>{}</div>
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


const registroService = new RegistroService();

const lsName = 'user-fields';

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
    reg: /^(\d{1,2})([./])(\d{1,2})\2(\d{2}|\d{4})$/,
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
    field.value = field.type === RegisterFieldType.ndate ? registroService.convertNDate(val, 'string') as string : val.toString();
  }
});

const saveData = () => {
  const user = {} as UserInfo;
  const fields: RegistrationResponseField[] = [];
  userFields.forEach(({name, value, type}) => {
    // @ts-ignore
    user[name] = type === RegisterFieldType.ndate ? registroService.convertNDate(value, 'number') : value;
  });
  const regData = {user, fields};
  localStorage[lsName] = JSON.stringify(regData);
  // service.sendRegData(regData).then();
};

