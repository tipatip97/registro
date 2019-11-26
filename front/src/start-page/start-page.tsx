import React from 'react';
import {StartPageConfig} from "./start-page.model";
import {UserInfoFieldName} from "../Registro.model";
import {FieldType, MeetingInfo} from "../registration/registration.model";
import {UserInfoApplicator} from "../utils";

export default function StartPage(config: StartPageConfig) {
  applicator.setUserInfo(config.userInfo);

  return <div className={'start-page-component'}>
    <div>Hello, {config.userInfo[UserInfoFieldName.name]}</div>
    <div>{
      meetings.map(meeting => {
        return <div>{meeting.title}</div>;
      })
    }</div>
  </div>;
}

const applicator = new UserInfoApplicator();

const meetings: MeetingInfo[] = [
  {
    title: 'Зимний лагерь',
    description: 'Будем рады тебе!',
    begin: 182373,
    end: 172356781,
    fields: [
      {
        name: 'nightPlace',
        title: 'Ночлег',
        description: 'Мы имеем возможность разместить ограниченное количество людей. @@@Хотел|Хотела ли бы ты иметь такую возможность?',
        default: false,
        required: false,
        type: FieldType.bool,
      }
    ]
  }
];