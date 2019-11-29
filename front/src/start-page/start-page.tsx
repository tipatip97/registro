import React from 'react';
import './start-page.scss';
import {StartPageConfig} from "./start-page.model";
import {UserInfoFieldName} from "../Registro.model";
import {FieldType, MeetingInfo} from "../registration/registration.model";
import {nestKey, UserInfoApplicator} from "../utils";

export default function StartPage(config: StartPageConfig) {
  applicator.setUserInfo(config.userInfo);
  const startKey = nestKey('start');

  return (
    <div className={'start-page-component app-component'}>
      <div className={'header'}>Привет, {config.userInfo[UserInfoFieldName.name]}</div>
      <div className={`our-meetings`}>
        <div className={`title`}>Наши ближайшие мероприятия:</div>
        <div className={`meeting-list`}>{
          meetings.map((meeting, meetingi) => {
            const meetingKey = nestKey('meeting', meetingi, startKey);

            return (
              <div className={`meeting`}
                   key={meetingKey}>
                <div className={`title`}>{meeting.title}</div>
                <div className={`description`}>{meeting.description}</div>
              </div>
            );
          })
        }</div>
      </div>
    </div>
  );
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