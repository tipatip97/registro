import React, {useState} from 'react';
import {RegisterField, RegisterFieldType, RegistrationResponse, RegistrationResponseField} from "./registration.model";
import {UserInfo, UserInfoField} from "../Registro.model";
import {RegistroService} from "../Registro.service";
import './registration.scss';
import DatePicker from "../tools/date-picker/date-picker";
import {DatePickerUserConfig} from "../tools/date-picker/date-picker.model";

export default function Registration() {

  let [datePickerInputTarget, setDatePickerInputTarget] = useState<any>(null);
  let [birthdayTime, setBirthdayTime] = useState<number | null>();
  let [, setTimestamp] = useState(0);

  const datePickerCallbacks: DatePickerUserConfig = {};
  const regKey = nestKey('registration-page');
  const rerender = () => setTimestamp(Date.now());
  const validateValue = (field: RegisterField, val: string) => {
    rerender();
    return validate(field, val);
  };


  const saveData = () => {
    userFields.forEach(field => validate(field, field.value));
    if (invalidFields.getLength() === 0) {
      const user = {} as UserInfo;
      const fields: RegistrationResponseField[] = [];
      userFields.forEach(({name, value, type}) => {
        // @ts-ignore
        user[name] = type === RegisterFieldType.ndate ? registroService.convertNDate(value, 'number') : value;
      });
      const regData = {user, fields};
      localStorage[lsName] = JSON.stringify(regData);
      // service.sendRegData(regData).then();
    } else {
      rerender();
      navigator.vibrate && navigator.vibrate([100]);
    }
  };

  return (
    <div className="registration-page">{
      userFields.map((field, fieldi) => {
        const isAbove = field.type === RegisterFieldType.ndate && datePickerInputTarget;
        const userFieldKey = nestKey('field', fieldi, regKey);

        return (
          <div className={`field${isAbove ? ' above' : ''}${invalidFields[field.name] ? ' invalid' : ''}`}
               key={userFieldKey}>
            <div className="title">{field.title}</div>
            <div className="description">{field.description}</div>
            {
              field.type === RegisterFieldType.radio ?
                field.variants && field.variants.map((variant, varianti) => {
                  const ufVarKey = nestKey('variant', varianti, userFieldKey);

                  return (
                    <div className="variant"
                         key={ufVarKey}
                         onClick={() => {
                           field.value = variant.value;
                           validateValue(field, variant.value);
                           rerender();
                         }}>
                      <span className={`radio-button${field.value === variant.value ? ' checked' : ''}`}> </span>
                      <span className={`title`}>{variant.title}</span>
                    </div>
                  );
                }) :
                <><input className="field-input"
                         autoComplete="off"
                         defaultValue={field.value || ''}
                         onInput={(e: any) => {
                           if (invalidFields[field.name]) {
                             validateValue(field, e.target.value);
                             rerender();
                           } else if (field.type === RegisterFieldType.ndate) {
                             const val = registroService.convertNDate(e.target.value, 'number') as number;

                             if (!isNaN(val)) {
                               datePickerCallbacks.updateDate && datePickerCallbacks.updateDate(val);
                               field.value = val;
                             }
                           } else field.value = e.target.value;
                         }}
                         onKeyUp={(e: any) => {
                           if (field.type === RegisterFieldType.ndate) {
                             if (e.keyCode === 13) {
                               const val = getNDateAsString(e.tagret.value);
                               if (val) {
                                 field.value = e.target.value = val;
                                 setDatePickerInputTarget(null);
                               }
                             } else if (e.keyCode === 40) {
                               setDatePickerInputTarget(e.target);
                               datePickerCallbacks.focus && datePickerCallbacks.focus();
                             } else if (e.keyCode === 27) setDatePickerInputTarget(null);
                             else if (datePickerInputTarget == null) setDatePickerInputTarget(e.target);
                           }
                         }}
                         onFocus={e => {
                           setDatePickerInputTarget(field.type === RegisterFieldType.ndate ? e.target : null);
                           if (field.type === RegisterFieldType.ndate) {
                           }
                         }}
                         onBlur={e => {
                           const test = validateValue(field, e.target.value);
                           if (test) field.value = field.type === RegisterFieldType.ndate ? getNDateAsString(e.target.value) : e.target.value;
                         }}/>
                  {
                    field.type === RegisterFieldType.ndate && datePickerInputTarget ?
                      <DatePicker key={nestKey('date-picker', fieldi, userFieldKey)}
                                  init={birthdayTime || field.value || '-20y'}
                                  callbacks={datePickerCallbacks}
                                  onInit={ts => setTimeout(() => {
                                    datePickerInputTarget.value = getNDateAsString(ts);
                                  })}
                                  onBlur={ts => {
                                    datePickerInputTarget.value = getNDateAsString(ts);
                                    datePickerInputTarget.focus();
                                    datePickerCallbacks.updateDate && datePickerCallbacks.updateDate(ts);
                                  }}
                                  onCandidateChange={ts => datePickerInputTarget.value = getNDateAsString(ts)}
                                  onValueChange={ts => {
                                    setBirthdayTime(ts);
                                    datePickerInputTarget.value = getNDateAsString(ts);
                                    field.value = ts;
                                    datePickerInputTarget.focus();
                                    setDatePickerInputTarget(null);
                                  }}/> :
                      null
                  }
                  {invalidFields[field.name] ? <div
                    className="error-message">{invalidFields[field.name] || 'Ошибка введённых данных'}</div> : null}</>

            }
          </div>
        );
      })
    }
      <div className="footer">
        <button className="save-button"
                onClick={saveData}
                onMouseOver={e => e}
                disabled={invalidFields.getLength() > 0}>Сохранить данные локально
        </button>
      </div>
      <div className={`paranja${datePickerInputTarget != null ? ' active' : ''}`}
           onClick={() => setDatePickerInputTarget(null)}>{}</div>
    </div>
  );
}


const registroService = new RegistroService();

const lsName = 'user-fields';

const invalidFields: { [name: string]: string | Function, getLength(): number } = {
  getLength: function () {
    return Object.keys(this).length - 1;
  }
};

const userFields: RegisterField[] = [
  {
    title: 'Фамилия',
    name: UserInfoField.lastName,
    description: 'Например: Иванов',
    required: true,
    reg: /^[А-ЯЁ][-а-яё]+$/,
    type: RegisterFieldType.text,
    errMessage: 'Поле "Фамилия" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
    value: '',
  },
  {
    title: 'Имя',
    name: UserInfoField.name,
    description: 'Например: Иван',
    required: true,
    reg: /^[А-ЯЁ][-а-яё]+$/,
    type: RegisterFieldType.text,
    errMessage: 'Поле "Имя" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
    value: '',
  },
  {
    title: 'Дата рождения',
    name: UserInfoField.birthday,
    description: '',
    required: true,
    reg: /^(\d{1,2})([./])(\d{1,2})\2(\d{2}|\d{4})$/,
    type: RegisterFieldType.ndate,
    errMessage: 'Неверная дата',
    value: '',
  },
  {
    title: 'Пол',
    name: UserInfoField.sex,
    description: '',
    required: true,
    reg: /^[mw]$/i,
    type: RegisterFieldType.radio,
    variants: [
      {
        title: 'М',
        value: 'm',
      }, {
        title: 'Ж',
        value: 'w',
      }
    ],
    default: '',
    errMessage: 'Поле "Пол" не верно введено',
    value: '',
  },
  {
    title: 'Город',
    name: UserInfoField.city,
    description: 'Например: Симферополь',
    required: true,
    reg: /^[а-я][-а-я ,()]+$/i,
    type: RegisterFieldType.text,
    errMessage: 'Значение поля "Город" может содержать только буквы, знак запятой, знак тире и может состоять из нескольких слов для уточнения информации в круглых скобках.',
    value: '',
  },
  {
    title: 'Церковь',
    name: UserInfoField.church,
    description: 'Например: Святой Троицы, ЕХБ',
    required: true,
    reg: /^[а-яё][-а-яё ,]+$/i,
    type: RegisterFieldType.text,
    errMessage: 'Поле "Церковь" заполнено неправильно. Значение должно состоять из букв, тире, запятых и может состоять из нескольких слов. Всё остальное не допустимо.',
    value: ''
  },
  {
    title: 'Телефон',
    name: UserInfoField.phone,
    description: 'Например: 79123456789',
    required: true,
    reg: /^\+?\d{11,15}$/i,
    type: RegisterFieldType.text,
    errMessage: 'Номер телефона должен состоять только из цифр в количестве от 11 до 15',
    value: '',
  },
];

const locRegData: RegistrationResponse = JSON.parse(localStorage[lsName] || '{"fields":[],"user":{}}');
const getNDateAsString = (val: number | string): string => registroService.convertNDate(val, 'string', 'ru') as string;
const nestKey = (name: string, unique?: number, prev?: string) => `${prev == null ? '' : `${prev}.`}${name}${unique == null ? '' : `:${unique}`}`;


locRegData.fields.forEach((lsField: RegistrationResponseField) => {
  const field = userFields.find(f => f.name === lsField.name);
  if (field != null) {
    field.value = lsField.value;
  }
});

userFields.forEach(field => {
  const val = locRegData.user[field.name];
  if (val != null) {
    field.value = field.type === RegisterFieldType.ndate ? getNDateAsString(val) : val.toString();
  }
});


// const cl = (r: any) => {
//   console.log(r);
//   return r;
// };


const validate = (field: RegisterField, val: string | number | null) => {
  let test = true;
  if (val === '') {
    if (field.required) {
      invalidFields[field.name] = 'Обязательное поле';
      test = false;
    } else delete invalidFields[field.name];
  } else {
    const value = (val || '').toString();
    test = field.type === RegisterFieldType.ndate ? field.reg.test(value) && !isNaN(registroService.convertNDate(value, 'number') as number) : field.reg.test(value);
    if (test) {
      delete invalidFields[field.name];
    } else {
      invalidFields[field.name] = field.errMessage;
    }
  }
  return test;
};
