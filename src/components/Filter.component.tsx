import React from 'react';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../features/comic/comicSlice';

const Filter = () => {
  const filters = useSelector((state: RootState) => state.comic.filters);
  const dispatch = useDispatch();

  return (
    <div>
      {filters.map(filter => (
        <button onClick={() => dispatch(setFilter(filter))}>
          {filter.label} {filter.isSelected ? 'on' : 'off'}
        </button>
      ))}
    </div>
  );
};

export default Filter;
