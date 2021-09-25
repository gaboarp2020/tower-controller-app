import { get } from './common';

const BASE_URL = '/stop';

const stopApi = {
  get: () => get<void>(BASE_URL),
};

export default stopApi;