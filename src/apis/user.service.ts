import http from '../apis';
import { RcFile } from 'antd/lib/upload';
import { prepareGetQuery } from '../utils/apis.util';
import { NOTIFICATION_API } from '../dto/enums/router.enum';

const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

class UserService {
  prefix = 'users';

  public async uploadAvatar(model: Record<string, any>) {
    const form = new FormData();

    Object.keys(model).forEach((key) => {
      if (key === 'images') {
        model[key].map((f: RcFile) => form.append('image', f));
      } else form.append(key, model[key]);
    });
    const result = await http.post(
      `${this.prefix}/upload-avatar`,
      form,
      config
    );
    return result.data.result;
  }

  public async getUser(token: string) {
    const result = await http.post(`${this.prefix}/check-token`, { token });
    return result.data.result;
  }

  public async registerToken(token: string) {
    const result = await http.post(
      `${NOTIFICATION_API.PREFIX}/${NOTIFICATION_API.REGISTER}`,
      {
        token,
        platform: 'web',
      }
    );
    return result.data?.result;
  }
}

export default new UserService();
