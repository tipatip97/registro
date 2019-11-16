export class RegistroService {
  // можно передать строкой или числом, и указать тип на выходе.
  // строка должна быть в виде "д.м.г" или "м/д/г"
  convertNDate(val: string | number, getAs?: 'string' | 'number', loc: 'en' | 'ru' = 'ru') {
    const dateToStr = (date: Date) => {
      const d = date.getDate().toString().padStart(2, '0');
      const m = (date.getMonth() + 1).toString().padStart(2, '0');
      const y = date.getFullYear();
      return loc === 'en' ? `${m}/${d}/${y}` : `${d}.${m}.${y}`;
    };

    if (typeof val === 'number') {
      const date = new Date(val);
      return getAs === 'number' ? date.getTime() : dateToStr(date);
    } else {
      const reg = /^(\d{1,2})([./])(\d{1,2})\2(\d{2}|\d{4})$/;
      const match = val.match(reg);
      if (match == null) return null;
      else {
        const [, $1, $2, $3, $4] = match;
        return new Date($2 === '/' ? `${$1}/${$3}/${$4}` : `${$3}.${$1}.${$4}`).getTime();
      }
    }
  }
}