import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeSearchField } from '../actions/actionCreators';

export default function Skills() {
  const { items, loading, error, search } = useSelector(
    (state) => state.skills
  );
  const dispatch = useDispatch();

  const handleSearch = (evt) => {
    const { value } = evt.target;
    dispatch(changeSearchField(value));
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
        {error ? (
          <div className="search-prompt">Error occured</div>
        ) : (
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
