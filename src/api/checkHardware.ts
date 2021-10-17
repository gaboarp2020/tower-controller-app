import {get} from './common';

const BASE_URL = '/check_hardware';

const checkHardwareApi = {
  get: () => get<any>(BASE_URL),
};

export default checkHardwareApi;
