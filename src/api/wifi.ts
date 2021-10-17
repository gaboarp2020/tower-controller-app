import {get} from './common';

const BASE_URL = '/save_ap';

const wifiApi = {
  set: (ssid: string, password: string) =>
    get<any>(BASE_URL, {ssid, password}),
};

export default wifiApi;
