import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  search: '',
};

export const skillsSlice = createSlice({
  name: 'skillsSlice',
  initialState,
  reducers: {
    searchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchFail: (state, action) => {
      const error = action.payload;
      state.loading = false;
      state.error = error;
    },
    searchSuccess: (state, action) => {
      const items = action.payload;
      state.items = items;
      state.loading = false;
      state.error = null;
    },
    changeSearch: (state, action) => {
      const search = action.payload;
      state.search = search;
    },
    reset: (state) => {
      state.items = initialState.items;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { searchRequest, searchFail, searchSuccess, changeSearch, reset } =
  skillsSlice.actions;

export const selectSkills = (state) => state.skills.items;
export const selectLoading = (state) => state.skills.loading;
export const selectError = (state) => state.skills.error;
export const selectSearch = (state) => state.skills.search;

export default skillsSlice.reducer;
