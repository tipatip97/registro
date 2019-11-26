

export enum UserInfoFieldName {
    id = 'id',
    name = 'name',
    lastName = 'lastName',
    phone = 'phone',
    birthday = 'birthday',
    sex = 'sex',
    city = 'city',
    church = 'church',
}

export interface UserInfo {
    [UserInfoFieldName.id]: number,
    [UserInfoFieldName.name]: string,
    [UserInfoFieldName.lastName]: string,
    [UserInfoFieldName.phone]: string,
    [UserInfoFieldName.birthday]: number,
    [UserInfoFieldName.sex]: 'm' | 'f',
    [UserInfoFieldName.city]: string,
    [UserInfoFieldName.church]: string,
}