import isEmpty from '../validation/is-empty';

import { GET_KUDOS, GET_GIVEN_KUDOS, GET_KUDOS_COUNT, REDUCE_KUDO_COUNT } from '../actions/types';

const initialState = {
    my_kudos: [],
    given_kudos: [],
    kudos_count:3
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_KUDOS_COUNT:
      return {
        ...state,
        kudos_count: action.payload
      }
    case GET_KUDOS:
      return {
        ...state,
        my_kudos: action.payload
      };
    case GET_GIVEN_KUDOS:
      return {
        ...state,
        given_kudos: action.payload
      };
    case REDUCE_KUDO_COUNT:
      return {
        ...state,
        kudos_count: state.kudos_count-1
      }
    default:
      return state;
  }
}