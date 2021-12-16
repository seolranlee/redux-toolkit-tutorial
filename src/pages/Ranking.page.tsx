import React, { useEffect, useRef, useState } from 'react';
import { useGetComicByPageQuery } from '../services/comic';
import Loader from '../components/Loader.component';
import ComicItemList from '../components/ComicItemList.component';
import styled, { createGlobalStyle } from 'styled-components';
import Target from '../components/Target.component';
import { useSelector, useDispatch } from 'react-redux';
import { addComic } from '../features/comic/comicSlice';
import { RootState } from '../store';
import FilterList from '../components/Filter.component';
import { filteredComics } from '../utils/filter.util';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0px;
    margin: 0px;
  }

  body {
    background-color: #f2f5f7;
  }
`;

const AppWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Ranking = () => {
  const [page, setPage] = useState(1);
  const { comics, filters } = useSelector((state: RootState) => state.comic);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetComicByPageQuery(page);

  // io
  const target = useRef<HTMLDivElement>(null);

  const getMoreItem = async () => {
    // await new Promise(resolve => setTimeout(resolve, 1500));
    setPage(prev => prev + 1);
  };

  const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isFetching) {
      await getMoreItem();
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect);
      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [target.current]);

  useEffect(() => {
    if (data) {
      dispatch(addComic(data.data));
    }
  }, [data]);

  if (isLoading) return <Loader />;
  if (!comics || error) return <div>Missing comic!</div>;

  return (
    <>
      {/* 연재중, 완결, 무료회차 3개 이상 */}
      {data && (
        <>
          <GlobalStyle />
          <AppWrap>
            <section id="Ranking">
              <FilterList filters={filters} />
              <ComicItemList comics={filteredComics(filters, comics)} />
            </section>
            <Target
              hasNext={data.hasNext}
              target={target}
              isFetching={isFetching}
            />
          </AppWrap>
        </>
      )}
    </>
  );
};

export default Ranking;
