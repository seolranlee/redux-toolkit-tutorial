import React from 'react';
import Loader from '../components/Loader.component';

import styled from 'styled-components';

const TargetWrap = styled.div`
  width: 100vw;
  height: 140px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

interface TargetProps {
  hasNext: boolean;
  target: React.RefObject<HTMLDivElement>;
  isFetching: boolean;
}

const Filter = (props: TargetProps) => {
  const { hasNext, target, isFetching } = props;
  return (
    <>
      {hasNext && (
        <TargetWrap>
          <div ref={target} className="Target-Element">
            {!isFetching && <Loader />}
          </div>
        </TargetWrap>
      )}
    </>
  );
};

export default Filter;
