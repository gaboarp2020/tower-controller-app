export const withAuthenticationToken = (
  headers: Headers,
  secretKey?: string,
) => {
  if (!secretKey) {
    return headers;
  }

  return {
    ...headers,
    Authorization: secretKey,
  };
};

const isText = (contentType: string) =>
  contentType.indexOf('text/plain') >= 0 ||
  contentType.indexOf('text/html') >= 0;

const isJson = (contentType: string) =>
  contentType.indexOf('application/json') >= 0;

export const formatResponse = (response: Response) => {
  if (!response.ok) {
    throw response;
  }

  const contentType = response.headers.get('content-type');

  if (contentType && isText(contentType)) {
    return response.text();
  }

  if (!contentType || isJson(contentType)) {
    return response.json();
  }

  return response;
};

export const getErrorPayload = async (err: any) => {
  try {
    return err && err.response && err.response.json();
  } catch (_) {
    return {};
  }
};

export const catchError = (response: Response): any => {
  if (response && response.status >= 400) {
    throw response;
  }

  const handleError = () => {};

  return handleError();
};

export const normalizePath = (path: string): string =>
  path.startsWith('/') ? path : `/${path}`;
