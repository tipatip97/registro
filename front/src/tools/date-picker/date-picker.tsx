import React from "react";
import './date-picker.scss';
import {DatePickerConfig, WeekDay} from "./date-picker.model";


export default function DatePicker(config: DatePickerConfig) {
  const weekDays: WeekDay[] = [{
    title: 'Пн',
  }, {
    title: 'Вт',
  }, {
    title: 'Ср',
  }, {
    title: 'Чт',
  }, {
    title: 'Пт',
  }, {
    title: 'Сб',
    isWeekend: true,
  }, {
    title: 'Вс',
    isWeekend: true,
  }];
  const monthLines: WeekDay[][] = [[]];
  let initDay;
  if (typeof config.init === 'number') {
    initDay = config.init;
  } else if (typeof config.init === 'string') {
    const init = config.init.toString();
    const dateReg = /^(\d{1,2})([.-])(\d{1,2})\2(\d{2}|\d{4})$/;
    const quants = [
      {
        name: ['year', 'years', 'y'],
        q: 'y',
      },
      {
        name: ['month', 'months', 'm'],
        q: 'm',
      },
      {
        name: ['day', 'days', 'd'],
        q: 'd',
      }
    ];
    const quantsReg = new RegExp(`^([-+]) *(\\d+) *(${quants.map(quant => quant.name.join('|')).join('|')})$`, 'i');
    const dateMatch = init.match(dateReg);
    const quantsMatch = init.match(quantsReg);

    if (dateMatch != null) {
      const [, $1, $2, $3, $4] = dateMatch;
      initDay = new Date($2 === '/' ? `${$1}.${$3}.${$4}` : `${$3}.${$1}.${$4}`).getTime();

    } else if (quantsMatch != null) {
      const [, sign, count, quantName] = quantsMatch;
      const quant = quants.find(quant => quant.name.indexOf(quantName) > -1);
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const day = now.getDate();
      const get = (q: string) => (quant && quant.q === q ? sign === '+' ? -count : +count : 0);

      initDay = new Date(year - get('y'), month - get('m'), day - get('d')).getTime();

    } else return <div className="error-init-data-message">Invalid initial data</div>;
  } else initDay = Date.now();
  const d = new Date(initDay);
  const fullDayMs = 24 * 60 * 60 * 1000;
  const month = d.getMonth();
  // const hours = d.getHours();
  // const min = d.getMinutes();
  // const sec = d.getSeconds();
  // const ms = d.getMilliseconds();
  const date = d.getDate();
  const day = d.getDay();
  const firstDay = 7 - (date - day) % 7;

  ((monthDay) => {
    let weekLine = -1;
    for (let i = 0; i < 6 * 7; i++) {
      const lineCelli = i % 7;
      if (lineCelli === 0) {
        weekLine++;
        monthLines.push([]);
      }
      let dayNum = '';
      let value = 0;
      let num = 0;

      if (i >= firstDay) {
        value = initDay + monthDay * fullDayMs - date * fullDayMs;
        if (new Date(value).getMonth() !== month) return;
        num = monthDay;
        dayNum = (monthDay++).toString().padStart(2, '0');
      }
      monthLines[weekLine].push({
        title: dayNum,
        value,
        num,
        isWeekend: weekDays[lineCelli].isWeekend
      });
    }
  })(1);

  // const initDate = new Date(initDay - (ms + sec * 1000 + min * 60000 + hours * 3600000));

  return (
    <div className="date-picker">
      <div className="dp-line header">{
        weekDays.map((weekDay, weekDayi) => {
          return (
            <div className={`dp-cell header${weekDay.isWeekend ? ' weekend' : ''}`}
                 key={`dp-cell-header:${weekDayi}`}>
              <span className="text">{weekDay.title}</span>
            </div>
          );
        })
      }</div>
      {
        monthLines.map((monthLine) => {
          return <div className="dp-line">{
            monthLine.map((monthDay, monthDayi) => {
              return (
                <div className={`dp-cell${monthDay.isWeekend ? ' weekend' : ''}${monthDay.num === date ? ' current' : ''}${monthDay.title === '' ? ' unselectable' : ''}`}
                     key={`dp-cell:${monthDayi}`}
                onClick={e => {
                  if (monthDay.title === '') return;
                  e.preventDefault();
                  config.onValueChange && config.onValueChange(monthDay.value as number);
                }}><span className="text">{monthDay.title}</span></div>
              );
            })
          }</div>
        })
      }
    </div>
  );
}