import http from '../apis';
import {
  ChatbotRating,
  CreateUpdateRatingRequest,
  GetRatingRequest,
} from '../dto/rating/getRatingRequest.dto';
import { prepareGetQuery } from '../utils/apis.util';

class PersonalityService {
  prefix = 'rating';

  public async get(model: GetRatingRequest) {
    const result = await http.get(`${this.prefix}${prepareGetQuery(model)}`);
    return result.data.result;
  }

  public async getChatbot() {
    const result = await http.get(`${this.prefix}/chatbot`);
    return result.data.result;
  }

  public async post(model: CreateUpdateRatingRequest) {
    const result = await http.post(`${this.prefix}`, model);
    return result.data.result;
  }

  public async putChatbot(model: ChatbotRating) {
    const result = await http.put(`${this.prefix}/chatbot`, model);
    return result.data.result;
  }
}

export default new PersonalityService();
