import { get } from './common';

const BASE_URL = '/config';

interface Config {
  steps: string;
  tensorType: string;
}

const api = {
  get: () => get<Config>(BASE_URL),
};

export default api;