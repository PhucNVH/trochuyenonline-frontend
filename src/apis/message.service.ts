import http from '../apis';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import { prepareGetQuery } from '../utils/apis.util';

class MessageService {
  prefix = 'conversations';

  public async getConversation(
    conversationId: number,
    model: PaginationRequest
  ) {
    const result = await http.get(
      `${this.prefix}/${conversationId}${prepareGetQuery(model)}`
    );
    return result.data.result;
  }
}

export default new MessageService();
