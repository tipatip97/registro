import React, {useState} from 'react';
import './Registro.css';

function Registro() {
  const lsName = 'user-fields';

  let [errorMessage, setErrorMessage] = useState('');

  const fields = [
    {
      title: 'Фамилия и Имя',
      name: 'name',
      reg: /^[А-Я][а-я]+ [А-Я][а-я]+$/,
      type: 'text',
    },
    {
      title: 'Церковь',
      name: 'church',
      reg: /^[-а-я ,]+$/i,
      type: 'text',
    },
    {
      title: 'Телефон',
      name: 'number',
      reg: /^\d{11}$/i,
      type: 'text',
    },
  ];

  JSON.parse(localStorage[lsName] || '[]')
    .forEach(lsField => {
      const field = fields.find(f => f.name === lsField.name);
      if (field != null) {
        field.value = lsField.value;
      }
    });

  const saveLocal = () => localStorage[lsName] = JSON.stringify(fields.map(({name, value}) => ({name, value})));
  const validate = (e, field) => setErrorMessage(field.reg.test(e.target.value) ? '' : `Значение поля "${field.title}" не соответствует установленной норме!`);

  return (
    <div>{
      fields.map(field => {
        return (
          <div>
            <label>
              <span>{field.title}</span>
              <input defaultValue={field.value}
                     onInput={e => field.value = (e.target.value)}
                     onBlur={e => validate(e, field)}/>
            </label>
          </div>
        );
      })
    }{errorMessage ? <div className="error-message">{errorMessage}</div> : null}
      <button onClick={saveLocal} disabled={errorMessage !== ''}>SAVE</button>
    </div>
  );
}

export default Registro;