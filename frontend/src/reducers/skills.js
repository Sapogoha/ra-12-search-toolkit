import types from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export default function skillsReducer(state = initialState, action) {
  switch (action.type) {
    case types.searchRequest:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.searchFail:
      const { error } = action.payload;
      return {
        ...state,
        loading: false,
        error,
      };
    case types.searchSuccess:
      const { items } = action.payload;
      return {
        ...state,
        items,
        loading: false,
        error: null,
      };
    case types.changeSearch:
      const { search } = action.payload;
      return {
        ...state,
        search,
      };
    case types.reset:
      return initialState;
    default:
      return state;
  }
}
