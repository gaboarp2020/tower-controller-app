import {get} from './common';

const BASE_URL = '/checkHardware';

const checkHardwareApi = {
  get: () => get<boolean>(BASE_URL),
};

export default checkHardwareApi;
