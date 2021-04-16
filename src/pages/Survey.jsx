import React, { useEffect } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Survey as SurveyComponent, Model, StylesManager } from 'survey-react';
import { useHistory } from 'react-router-dom';
export function Survey() {
  const { user } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user.isFirstLogin) {
      history.push('chat');
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
          },
        ],
        visibleIf: "{optin}='Có'",
      },
    ],
  };

  const model = new Model(json);

  model.onComplete.add(function (result) {
    console.log(result.data);
    history.push('chat');
  });

  return (
    <div>
      <SurveyComponent model={model} />
    </div>
  );
}
