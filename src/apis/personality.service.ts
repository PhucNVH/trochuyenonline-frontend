import http from '../apis';
import { PaginationRequest } from '../dto/commons/PaginationRequest.dto';
import { prepareGetQuery } from '../utils/apis.util';

class PersonalityService {
  prefix = 'personalities';

  public async get(model: PaginationRequest) {
    const result = await http.get(`${this.prefix}${prepareGetQuery(model)}`);
    return result.data.result;
  }

  public async remove(id: number) {
    const result = await http.delete(`${this.prefix}/${id}`);
    return result.data.result;
  }
}

export default new PersonalityService();
