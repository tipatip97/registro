export class RegistroService {
  // можно передать строкой или числом, и указать тип на выходе.
  // строка должна быть в виде "д.м.г" или "м/д/г"
  convertNDate(val: string | number | null, getAs?: 'string' | 'number', loc: 'en' | 'ru' = 'ru') {
    if (val == null) return null;
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
      const reg = /^(\d{1,2})((([./])(\d{1,2}))?(\4(\d{2}|\d{4}))?)?$/;
      const match = val.match(reg);
      let ndate;
      if (match == null) ndate = NaN;
      else {
        const [, $1,,, sep, $3,, year] = match;
        const date = new Date(sep == null ? $1 : sep === '/' ? `${$1}${$3 ? `${sep}${$3}` : ''}${year ? `${sep}${year}` : ''}` : `${$3 ? `${$3}.` : ''}${$1}${year ? `.${year}` : ''}`);
        const d = date.getDate().toString().padStart(2, '0');
        const m = (date.getMonth() + 1).toString().padStart(2, '0');
        const y = date.getFullYear();

        ndate = getAs === 'number' ?
          date.getTime() :
          loc === 'ru' ?
            sep === '.' ? `${d}.${m}.${y}` : `${m}.${d}.${y}` :
            sep === '/' ? `${d}/${m}/${y}` : `${m}/${d}/${y}`;
      }
      return ndate;
    }
  }
}