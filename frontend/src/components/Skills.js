import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeSearch,
  selectSkills,
  selectLoading,
  selectError,
  selectSearch,
} from '../slice/skillsSlice';

export default function Skills() {
  const search = useSelector(selectSearch);
  const items = useSelector(selectSkills);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const handleSearch = (evt) => {
    const { value } = evt.target;
    dispatch(changeSearch(value));
  };

  const hasQuery = search.trim() !== '';

  return (
    <>
      <div className="app">
        <div>
          <input
            className="search"
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder={'What are you looking for?'}
          />
        </div>
        {!hasQuery && (
          <div className="search-prompt">Type something to search</div>
        )}
        {hasQuery && loading && (
          <div className="search-prompt">searching...</div>
        )}
        {hasQuery && !loading && items.length <= 0 && (
          <div className="search-prompt">
            Your search - {search} - did not match any skills
          </div>
        )}
        {error && <div className="search-prompt">Error occured</div>}{' '}
        {!error && !loading && (
          <ul>
            {items.map((o) => (
              <li className="search-item" key={o.id}>
                {o.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
