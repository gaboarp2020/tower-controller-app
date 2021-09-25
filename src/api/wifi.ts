import { get } from './common';

const BASE_URL = '/wifi';

const wifiApi = {
  set: (ssid: string, password: string) =>
    get<void>(BASE_URL, { ssid, password }),
};

export default wifiApi;