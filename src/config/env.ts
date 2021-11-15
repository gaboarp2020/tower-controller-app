interface Env {
  apiUrl: string;
}

const HOST: string = '192.168.1.132';
const PORT: number = 80;

const env: Env = {
  apiUrl: `http://${HOST}${PORT ? `:${PORT}` : ''}`,
};

export default env;
