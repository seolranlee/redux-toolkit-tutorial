import React, { PropsWithChildren } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../features/comic/comicSlice';
import { Filter } from '../features/comic/comicSlice';

interface FilterProps {
  filters: Filter[];
}

const FilterList = (props: PropsWithChildren<FilterProps>) => {
  const dispatch = useDispatch();
  const { filters } = props;
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

export default FilterList;
