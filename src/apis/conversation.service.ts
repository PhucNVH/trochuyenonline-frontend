import http from '../apis';

class ConversationService {
  prefix = 'conversations';

  public async get() {
    const result = await http.get(`${this.prefix}`);
    return result.data.result;
  }
}

export default new ConversationService();
