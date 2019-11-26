import React, {useState} from 'react';
import {FieldType, RegisterField, RegistrationConfig} from "./registration.model";
import {UserInfo, UserInfoFieldName} from "../Registro.model";
import {RegistroService} from "../Registro.service";
import './registration.scss';
import DatePicker from "../tools/date-picker/date-picker";
import {DatePickerUserConfig} from "../tools/date-picker/date-picker.model";

export default function Registration(config: RegistrationConfig) {

  let [datePickerInputTarget, setDatePickerInputTarget] = useState<any>(null);
  let [birthdayTime, setBirthdayTime] = useState<number | null>();
  let [, setTimestamp] = useState(0);
  let [userInfo, setUserInfo] = useState<UserInfo>(config.userInfo || {});

  const datePickerCallbacks: DatePickerUserConfig = {};
  const regKey = nestKey('registration-page');
  const rerender = () => setTimestamp(Date.now());
  const validateValue = (field: RegisterField, val: string) => {
    rerender();
    return validate(field, val);
  };


  const saveUserData = () => {
    userFields.forEach(field => validate(field, userInfo[field.name]));
    if (invalidFields.getLength() === 0) {

      if (config.onUserInfoSave) config.onUserInfoSave(userInfo);
      // service.sendRegData(regData).then();
    } else {
      rerender();
      navigator.vibrate && navigator.vibrate([100]);
    }
  };

  const setUserValue = (name: UserInfoFieldName, val: any) => {
    const info: any = {};
    Object.keys(userInfo).forEach((name: string) => info[name] = userInfo[name as UserInfoFieldName]);
    info[name] = val;
    setUserInfo(info);
  };

  return (
    <div className="registration-page">{
      userFields.map((field, fieldi) => {
        const isAbove = field.type === FieldType.ndate && datePickerInputTarget;
        const userFieldKey = nestKey('field', fieldi, regKey);

        return (
          <div className={`field${isAbove ? ' above' : ''}${invalidFields[field.name] ? ' invalid' : ''}`}
               key={userFieldKey}>
            <div className="title">{field.title}</div>
            <div className="description">{field.description}</div>
            {
              field.type === FieldType.radio ?
                field.variants && field.variants.map((variant, varianti) => {
                  const ufVarKey = nestKey('variant', varianti, userFieldKey);

                  return (
                    <div className="variant"
                         key={ufVarKey}
                         onClick={() => {
                           setUserValue(field.name, variant.value);
                           validateValue(field, variant.value);
                           rerender();
                         }}>
                      <span className={`radio-button${userInfo[field.name] === variant.value ? ' checked' : ''}`}> </span>
                      <span className={`title`}>{variant.title}</span>
                    </div>
                  );
                }) :
                <><input className="field-input"
                         autoComplete="off"
                         defaultValue={field.type === FieldType.ndate ? registroService.convertNDate(userInfo[field.name], 'string', 'ru') as string : userInfo[field.name] || ''}
                         onInput={(e: any) => {
                           if (invalidFields[field.name]) {
                             validateValue(field, e.target.value);
                             rerender();
                           } else if (field.type === FieldType.ndate) {
                             const val = registroService.convertNDate(e.target.value, 'number') as number;

                             if (!isNaN(val)) {
                               datePickerCallbacks.updateDate && datePickerCallbacks.updateDate(val);
                               setUserValue(field.name, val);
                             }
                           } else setUserValue(field.name, e.target.value);
                         }}
                         onKeyUp={(e: any) => {
                           if (field.type === FieldType.ndate) {
                             if (e.keyCode === 13) {
                               const val = getNDateAsString(e.target.value);
                               if (val) {
                                 setUserValue(field.name, e.target.value = val);
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
                           setDatePickerInputTarget(field.type === FieldType.ndate ? e.target : null);
                         }}
                         onBlur={e => {
                           const test = validateValue(field, e.target.value);
                           if (test) setUserValue(field.name, field.type === FieldType.ndate ? getNDateAsString(e.target.value) : e.target.value);
                         }}/>
                  {
                    field.type === FieldType.ndate && datePickerInputTarget ?
                      <DatePicker key={nestKey('date-picker', fieldi, userFieldKey)}
                                  init={birthdayTime || userInfo[field.name] || '-20y'}
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
                                    setUserValue(field.name, ts);
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
                onClick={saveUserData}
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

const invalidFields: { [name: string]: string | Function, getLength(): number } = {
  getLength: function () {
    return Object.keys(this).length - 1;
  }
};

const userFields: RegisterField[] = [
  {
    title: 'Фамилия',
    name: UserInfoFieldName.lastName,
    description: 'Например: Иванов',
    required: true,
    reg: /^[А-ЯЁ][-а-яё]+$/,
    type: FieldType.string,
    errMessage: 'Поле "Фамилия" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
  },
  {
    title: 'Имя',
    name: UserInfoFieldName.name,
    description: 'Например: Иван',
    required: true,
    reg: /^[А-ЯЁ][-а-яё]+$/,
    type: FieldType.string,
    errMessage: 'Поле "Имя" должно быть одним словом, начинающееся с больной буквы. допускается использование знака тире.',
  },
  {
    title: 'Дата рождения',
    name: UserInfoFieldName.birthday,
    description: '',
    required: true,
    reg: /^(\d{1,2})([./])(\d{1,2})\2(\d{2}|\d{4})$/,
    type: FieldType.ndate,
    errMessage: 'Неверная дата',
  },
  {
    title: 'Пол',
    name: UserInfoFieldName.sex,
    description: '',
    required: true,
    reg: /^[mw]$/i,
    type: FieldType.radio,
    variants: [
      {
        title: 'М',
        value: 'm',
        type: FieldType.string
      }, {
        title: 'Ж',
        value: 'w',
        type: FieldType.string
      }
    ],
    default: '',
    errMessage: 'Поле "Пол" не верно введено',
  },
  {
    title: 'Город',
    name: UserInfoFieldName.city,
    description: 'Например: Симферополь',
    required: true,
    reg: /^[а-я][-а-я ,()]+$/i,
    type: FieldType.string,
    errMessage: 'Значение поля "Город" может содержать только буквы, знак запятой, знак тире и может состоять из нескольких слов для уточнения информации в круглых скобках.',
  },
  {
    title: 'Церковь',
    name: UserInfoFieldName.church,
    description: 'Например: Святой Троицы, ЕХБ',
    required: true,
    reg: /^[а-яё][-а-яё ,]+$/i,
    type: FieldType.string,
    errMessage: 'Поле "Церковь" заполнено неправильно. Значение должно состоять из букв, тире, запятых и может состоять из нескольких слов. Всё остальное не допустимо.',
  },
  {
    title: 'Телефон',
    name: UserInfoFieldName.phone,
    description: 'Например: 79123456789',
    required: true,
    reg: /^\+?\d{11,15}$/i,
    type: FieldType.string,
    errMessage: 'Номер телефона должен состоять только из цифр в количестве от 11 до 15',
  },
];

const getNDateAsString = (val: number | string): string => registroService.convertNDate(val, 'string', 'ru') as string;
const nestKey = (name: string, unique?: number, prev?: string) => `${prev == null ? '' : `${prev}.`}${name}${unique == null ? '' : `:${unique}`}`;

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
    test = field.reg.test(value);
    if (test) {
      delete invalidFields[field.name];
    } else {
      invalidFields[field.name] = field.errMessage;
    }
  }
  return test;
};
