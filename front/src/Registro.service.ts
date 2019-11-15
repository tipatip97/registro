
export class RegistroService {
    convertNDate(val: string | number) {
        if (typeof val === 'number') {
            const date = new Date(val);
            return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
        } else return new Date(val.replace(/^(\d{1,2})([.-])(\d{1,2})\2(\d{2}|\d{4})$/i, '$3.$1.$4')).getTime();
    }
}