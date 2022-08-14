import { ofType } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import {
  map,
  retry,
  debounceTime,
  switchMap,
  catchError,
  mergeMap,
} from 'rxjs/operators';
import types from '../actions/actionTypes';
import {
  searchSkillsRequest,
  searchSkillsSuccess,
  searchSkillsFailure,
  resetSearchField,
} from '../actions/actionCreators';
import { of } from 'rxjs';

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType(types.changeSearch),
    map((o) => o.payload.search.trim()),
    debounceTime(100),
    mergeMap((o) => {
      if (o === '') {
        return of(resetSearchField());
      } else {
        return of(searchSkillsRequest(o));
      }
    })
  );

export const searchSkillsEpic = (action$) =>
  action$.pipe(
    ofType(types.searchRequest),
    map((o) => o.payload.search),
    map((o) => new URLSearchParams({ q: o })),

    switchMap((o) =>
      ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
        retry(3),
        map((o) => searchSkillsSuccess(o)),
        catchError((err) => of(searchSkillsFailure(err)))
      )
    )
  );
