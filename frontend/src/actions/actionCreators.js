import types from './actionTypes';

export const searchSkillsRequest = (search) => ({
  type: types.searchRequest,
  payload: { search },
});

export const searchSkillsFailure = (error) => ({
  type: types.searchFail,
  payload: { error },
});

export const searchSkillsSuccess = (items) => ({
  type: types.searchSuccess,
  payload: { items },
});

export const changeSearchField = (search) => ({
  type: types.changeSearch,
  payload: { search },
});

export const resetSearchField = (search) => ({
  type: types.reset,
});
