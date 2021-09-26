interface Env {
  apiUrl: string;
}

const HOST: string = '192.168.4.1';
const PORT: number = 80;

const env: Env = {
  apiUrl: `http://${HOST}${PORT ? `:${PORT}` : ''}`,
};

export default env;
