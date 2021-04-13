import http from '../apis';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import { prepareGetQuery } from '../utils/apis.util';

class MessageService {
  prefix = 'conversations/messages';

  public async get(model: PaginationRequest) {
    const result = await http.get(`${this.prefix}${prepareGetQuery(model)}`);
    return result.data.result;
  }
}

export default new MessageService();
