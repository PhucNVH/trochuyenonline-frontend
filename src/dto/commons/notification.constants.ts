import { NewNotificationDto } from '../../stores/notification.store';

export const newNotificationFormInit: NewNotificationDto = {
  title: '',
  body: '',
};

export const notificationType = [
  {
    key: '',
    label: '',
  },
];

export const getNotificationType = (t: any, key: any) => {
  return t(notificationType.find((item) => item.key === key)?.label);
};
