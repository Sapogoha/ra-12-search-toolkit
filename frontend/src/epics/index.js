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
import { of } from 'rxjs';

import {
  searchRequest,
  searchFail,
  searchSuccess,
  reset,
} from '../slice/skillsSlice';

export const changeSearchEpic = (action$) =>
  action$.pipe(
    ofType('skillsSlice/changeSearch'),
    map((o) => o.payload.trim()),
    debounceTime(100),
    mergeMap((o) => {
      if (o === '') {
        return of(reset());
      } else {
        return of(searchRequest(o));
      }
    })
  );

export const searchSkillsEpic = (action$) =>
  action$.pipe(
    ofType('skillsSlice/searchRequest'),
    map((o) => o.payload),
    map((o) => new URLSearchParams({ q: o })),

    switchMap((o) =>
      ajax.getJSON(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
        retry(3),
        map((o) => searchSuccess(o)),
        catchError((err) => of(searchFail(err)))
      )
    )
  );
