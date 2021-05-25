import http from '../apis';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import { CreateFeed } from '../dto/feeds/CreateFeed.dto';
import { prepareGetQuery } from '../utils/apis.util';

class FeedService {
  prefix = 'feeds';
  likePrefix = 'likes';

  public async get(model: PaginationRequest) {
    const result = await http.get(`${this.prefix}/${prepareGetQuery(model)}`);
    return result.data.result;
  }

  public async post(model: CreateFeed) {
    const result = await http.post(`${this.prefix}`, model);
    return result.data.result;
  }

  public async like(feedId: number) {
    const result = await http.post(`${this.likePrefix}`, { feedId });
    return result.data.result;
  }
}

export default new FeedService();
