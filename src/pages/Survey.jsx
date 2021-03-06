import React, { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Survey as SurveyComponent, Model, StylesManager } from 'survey-react';
import { useHistory } from 'react-router-dom';
import { Survey as SurveyApi } from '../apis/survey.js';
export function Survey() {
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user.isFirstLogin) {
      history.push('tro-chuyen');
      return;
    }
  }, []);
  StylesManager.applyTheme('modern');
  var json = {
    pages: [
      {
        questions: [
          {
            type: 'radiogroup',
            name: 'optin',
            title:
              'Bạn có muốn tham gia một khảo sát nhỏ để được matching  chính xác hơn không không? ( chỉ mất < 1 phút ) ',
            isRequired: true,
            colCount: 2,
            choices: ['Không', 'Có'],
          },
        ],
      },
      {
        questions: [
          {
            type: 'radiogroup',
            name: 'gender',
            title: 'Bạn là:',
            isRequired: true,
            colCount: 4,
            choices: ['Nam', 'Nữ', 'LGBTQ+', 'Khác'],
          },
          {
            type: 'checkbox',
            name: 'interest',
            title: 'Bạn quan tâm đến đối tượng nào?',
            isRequired: true,
            colCount: 4,
            choices: ['Nam', 'Nữ', 'LGBTQ+'],
          },
          {
            type: 'multipletext',
            name: 'hobby',
            title: ' Sở thích của bạn là',
            colCount: 1,
            items: [
              {
                name: 'first',
                title: 'Tôi thích',
              },
              {
                name: 'second',
                title: 'Tôi thích',
              },
              {
                name: 'third',
                title: 'Tôi thích',
              },
            ],
            visibleIf: '{interest}!=null',
          },
          {
            type: 'multipletext',
            name: 'prefer',
            title: ' Bạn muốn gặp một người như thế nào',
            colCount: 1,
            items: [
              {
                name: 'first',
                title: 'Tôi thích gặp',
              },
              {
                name: 'second',
                title: 'Tôi thích gặp',
              },
              {
                name: 'third',
                title: 'Tôi thích gặp',
              },
            ],
            visibleIf: '{interest}!=null',
          },
        ],
        visibleIf: "{optin}='Có'",
      },
    ],
  };

  const model = new Model(json);

  model.onComplete.add(function (result) {
    const isOptin = result.data['optin'] == 'Có';
    let hobby = [];
    let prefer = [];
    for (let h in result.data['hobby']) {
      hobby.push(result.data['hobby'][h]);
    }
    for (let p in result.data['prefer']) {
      prefer.push(result.data['prefer'][p]);
    }
    SurveyApi.send({
      token: user.token,
      isOptin: isOptin,
      hobby: hobby,
      prefer: prefer,
    });
    history.push({ pathname: 'tro-chuyen', state: { isFirstLogin: true } });
  });

  return (
    <div>
      <SurveyComponent model={model} />
    </div>
  );
}
