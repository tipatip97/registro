import React, {useState} from "react";
import './date-picker.scss';
import {CurrentTime, DatePickerConfig, WeekDay} from "./date-picker.model";


export default function DatePicker(config: DatePickerConfig) {
  if (displayedTime == null) {
    displayedTime = update(config.init);
    initTime = update(config.init);
    if (config.onInit) config.onInit(displayedTime.ts);
  }
  const [currentTime, setCurrentTime] = useState<CurrentTime>(displayedTime);
  const today = new Date();
  const thisDay = today.getDate();
  const thisMonth = today.getMonth();
  const thisYear = today.getFullYear();

  let input: any;
  let preventOnBlur = false;

  if (config.callbacks != null) {
    config.callbacks.updateDate = (date: number | string | null) => setCurrentTime(displayedTime = update(date));
    config.callbacks.focus = () => input && input.focus();
  }

  return (
    <div className="date-picker">
      <input style={{position: 'absolute', opacity: 0, pointerEvents: 'none'}}
             ref={el => el && (input = el)}
             onKeyDown={e => {
               if (e.keyCode === 27) {
                 input.blur();
               } else if (e.keyCode === 13) {
                 preventOnBlur = true;
                 config.onValueChange && config.onValueChange(currentTime.ts);
                 initTime = update(currentTime.ts);
               } else {
                 const quant = e.keyCode === 37 ? e.ctrlKey && e.shiftKey ? '-10y' : e.ctrlKey ? '-1y' : e.shiftKey ? '-1m' : '-1d' : e.keyCode === 39 ? e.ctrlKey && e.shiftKey ? '+10y' : e.ctrlKey ? '+1y' : e.shiftKey ? '+1m' : '+1d' : e.keyCode === 38 ? '-7d' : e.keyCode === 40 ? '+7d' : null;
                 if (quant != null) {
                   setCurrentTime(displayedTime = update(quant, currentTime.ts));
                   config.onCandidateChange && config.onCandidateChange(displayedTime.ts);
                 }
               }
             }}
             onBlur={() => {
               if (!preventOnBlur) config.onBlur && config.onBlur(initTime.ts);
               else preventOnBlur = false;
             }}/>
      <div className="dp-line year">
        <div className="arr-left dp-cell"
             onClick={() => setCurrentTime(update('-1y', currentTime.ts))}><span className="text">{'<'}</span></div>
        <div className="text">{currentTime.year}</div>
        <div className="arr-right dp-cell"
             onClick={() => setCurrentTime(update('+1y', currentTime.ts))}><span className="text">{'>'}</span></div>
      </div>
      <div className="dp-line year">
        <div className="arr-left dp-cell"
             onClick={() => setCurrentTime(update('-1m', currentTime.ts))}><span className="text">{'<'}</span></div>
        <div className="text">{months[currentTime.month].title}</div>
        <div className="arr-right dp-cell"
             onClick={() => setCurrentTime(update('+1m', currentTime.ts))}><span className="text">{'>'}</span></div>
      </div>
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
        currentTime.monthLines.map((monthLine, monthlinei) => {
          return <div className="dp-line" key={`dp-line:${monthlinei}`}>{
            monthLine.map((monthDay, monthDayi) => {
              const isCurrent = monthDay.num === currentTime.day && displayedTime.month === currentTime.month && displayedTime.year === currentTime.year;
              const isToday = monthDay.num === thisDay && thisMonth === currentTime.month && thisYear === currentTime.year;

              return (
                <div
                  className={`dp-cell${monthDay.isWeekend ? ' weekend' : ''}${isToday ? ' today' : ''}${isCurrent ? ' current' : ''}${monthDay.title === '' ? ' unselectable' : ''}`}
                  key={`dp-cell:${monthDayi}`}
                  onClick={e => {
                    if (monthDay.title === '') return;
                    e.preventDefault();
                    config.onValueChange && config.onValueChange(monthDay.value as number);
                    displayedTime = update(monthDay.value);
                    setCurrentTime(displayedTime);
                  }}><span className="text">{monthDay.title}</span></div>
              );
            })
          }</div>
        })
      }
    </div>
  );
}

let displayedTime: CurrentTime;
let initTime: CurrentTime;


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

const months = [
  {
    title: 'Январь',
  }, {
    title: 'Февраль',
  }, {
    title: 'Март',
  }, {
    title: 'Апрель',
  }, {
    title: 'Май',
  }, {
    title: 'Июнь',
  }, {
    title: 'Июль',
  }, {
    title: 'Август',
  }, {
    title: 'Сентябрь',
  }, {
    title: 'Октябрь',
  }, {
    title: 'Ноябрь',
  }, {
    title: 'Декабрь',
  }
];


const update = (setDate: number | string | undefined | null, point?: any) => {
  let initDay;
  if (typeof setDate === 'number') {
    initDay = setDate;
  } else if (typeof setDate === 'string') {
    const quants = [
      {
        name: ['year', 'years', 'y'],
        q: 'y',
      }, {
        name: ['month', 'months', 'm'],
        q: 'm',
      }, {
        name: ['day', 'days', 'd'],
        q: 'd',
      }
    ];
    const dateMatch = setDate.match(/^(\d{1,2})([.-])(\d{1,2})\2(\d{2}|\d{4})$/);
    const quantsMatch = setDate.match(RegExp(`^([-+]) *(\\d+) *(${quants.map(quant => quant.name.join('|')).join('|')})$`, 'i'));

    if (dateMatch != null) {
      const [, $1, $2, $3, $4] = dateMatch;
      initDay = new Date($2 === '/' ? `${$1}.${$3}.${$4}` : `${$3}.${$1}.${$4}`).getTime();

    } else if (quantsMatch != null) {
      const [, sign, count, quantName] = quantsMatch;
      const quant = quants.find(quant => quant.name.indexOf(quantName) > -1);
      point = new Date(point == null ? Date.now() : point);
      const year = point.getFullYear();
      const month = point.getMonth();
      const day = point.getDate();
      const get = (q: string) => (quant && quant.q === q ? sign === '+' ? -count : +count : 0);

      initDay = new Date(year - get('y'), month - get('m'), day - get('d')).getTime();

    } else initDay = Date.now();
  } else initDay = Date.now();

  const d = new Date(initDay);
  const fullDayMs = 24 * 60 * 60 * 1000;
  const month = d.getMonth();
  const date = d.getDate();
  const day = d.getDay();
  const firstDay = 7 - (date - (day || 7)) % 7;

  const time: CurrentTime = {
    monthLines: [[]],
    year: d.getFullYear(),
    day: date,
    month,
    ts: initDay,
  };

  ((monthDay) => {
    let weekLine = -1;
    for (let i = firstDay >= 7 ? 7 : 0; i < 6 * 7; i++) {
      const lineCelli = i % 7;
      if (lineCelli === 0) {
        weekLine++;
        time.monthLines.push([]);
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
      // if (dayNum === '') continue;
      time.monthLines[weekLine].push({
        title: dayNum,
        value,
        num,
        isWeekend: weekDays[lineCelli].isWeekend
      });
    }
  })(1);
  return time;
};