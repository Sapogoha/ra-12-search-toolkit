import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { changeSearchEpic, searchSkillsEpic } from '../epics';
import skillsSlice from '../slice/skillsSlice';

const reducer = combineReducers({
  skills: skillsSlice,
});

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

export const rootEpic = combineEpics(changeSearchEpic, searchSkillsEpic);
epicMiddleware.run(rootEpic);

export default store;
