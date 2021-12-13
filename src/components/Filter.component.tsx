import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { setFilter } from '../features/comic/comicSlice';

import styled from 'styled-components';
import { ComicRankItem } from '../services/comic';

const TargetWrap = styled.div`
  width: 100vw;
  height: 140px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Filter = () => {
  const dispatch = useDispatch();
  // const [, setFilter] = useState<any>([]);

  // const addFilter = (label: string) => {
  //   setFilter(filter.push(label));
  // };
  return (
    <>
      {/* <button onClick={() => dispatch(setFilter())}>무료회차 10개 이상</button> */}
    </>
  );
};

export default Filter;
