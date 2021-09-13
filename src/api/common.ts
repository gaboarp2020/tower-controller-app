import qs from 'qs';

import config from '../config';
import {
  catchError,
  formatResponse,
  normalizePath,
  withAuthenticationToken,
} from './helpers';
import { Query } from './types';

const BASE_URL = config.env.apiUrl;

const getHeaders = {
  Accept: 'application/json',
};

const postHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
};

// Base Request Handler

export const request = async <T = any>(
  path: string,
  args: any = {},
): Promise<T> => {
  args.headers = withAuthenticationToken(args.headers || {});

  return fetch(`${BASE_URL}${normalizePath(path)}`, args)
    .then(formatResponse)
    .catch(catchError);
};

// Methods

export const get = <T>(url: string, query?: Query) => {
  const params = query ? qs.stringify(query, { addQueryPrefix: true }) : '';

  return request<T>(`${url}${params}`, {
    headers: getHeaders,
  });
};

export const post = <T>(url: string, payload: any = {}) =>
  request<T>(url, {
    body: JSON.stringify(payload),
    headers: postHeaders,
    method: 'POST',
  });

export const fetchRetry = async <T>(
  fn: () => Promise<T>,
  n: number,
): Promise<T> => {
  try {
    const result = await fn();

    return result;
  } catch (err) {
    if (n === 1) {
      throw err;
    }

    return await fetchRetry(fn, n - 1);
  }
};