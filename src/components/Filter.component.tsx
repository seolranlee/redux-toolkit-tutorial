import React from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, filterComics } from '../features/comic/comicSlice';

const Filter = () => {
  const filters = useSelector((state: RootState) => state.comic.filters);
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() => {
          dispatch(setFilters());
          dispatch(filterComics());
        }}
      >
        {filters.includes('free') ? 'on' : 'off'}
      </button>
    </>
  );
};

export default Filter;
