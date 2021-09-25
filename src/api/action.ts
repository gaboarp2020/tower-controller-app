import { get } from './common';

type DirectionType = 1 | 2;
type ActionType = 'elevation' | 'inclination';

const endPoint = (uri: ActionType) => `/${uri}`;

const actionApi = (uri: ActionType) => {
  return {
    set: (direction: DirectionType) =>
      get<void>(endPoint(uri), { direction })
  }
};

export const elevationApi = actionApi('elevation');
export const inclinationApi = actionApi('inclination');