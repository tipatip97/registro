

export interface UserInfo {
    id: number,
    name: string,
    lastName: string,
    phone: string,
    birthday: number,
    sex: 'm' | 'f',
    city: string,
    church: string,
}

export enum UserInfoField {
    id = 'id',
    name = 'name',
    lastName = 'lastName',
    phone = 'phone',
    birthday = 'birthday',
    sex = 'sex',
    city = 'city',
    church = 'church',
}