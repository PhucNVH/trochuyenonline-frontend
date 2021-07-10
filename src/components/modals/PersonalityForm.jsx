import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import personalityService from '../../apis/personality.service';
import { useAuth } from '../../hooks/use-auth';
import { Chatbot } from '../../apis/chatbot';

export default function PersonalityForm({
  setIsChatbotModalVisible,
  getPersonality,
}) {
  const { user } = useAuth();

  const onFinish = async (values) => {
    await Chatbot.init(values.personalities);
    await personalityService.save({
      personalities: values.personalities,
      userId: user.id,
    });
    getPersonality();
  };

  useEffect(async () => {
    const result = await personalityService.get({
      skip: 0,
      take: '15',
    });
    if (result.data.length != 0) {
      setIsChatbotModalVisible(false);
    }
  }, []);

  return (
    <Form id="chatbotform" name="dynamic_form_item" onFinish={onFinish}>
      <Form.List name="personalities">
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Xin nhập mội vài điều về bạn',
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Personality"
                    style={{ width: '90%', marginRight: 8 }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: '90%' }}
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
}
