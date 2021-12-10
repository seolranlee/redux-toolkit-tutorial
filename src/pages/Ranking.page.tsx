import React, { ReactElement, useEffect, useState, useRef } from 'react';
import { useGetComicByPageQuery } from '../services/comic';
import Loader from '../components/Loader.component';
// import useIntersect from '../hooks/useIntersect.hooks';
import ComicItemList from '../components/ComicItemList.component';
import styled, { createGlobalStyle } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { increment } from '../features/comic/comicSlice';
import { ComicRankItem } from '../services/comic';

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

  .Target-Element {
    width: 100vw;
    height: 140px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
  }
`;

const Ranking = (): ReactElement => {
  const page = useAppSelector(state => state.comic.page);
  const dispatch = useAppDispatch();

  const [comics, setComics] = useState<ComicRankItem[]>([]);
  const { data, error, isLoading, isFetching } = useGetComicByPageQuery(page);

  // io
  const target = useRef<HTMLDivElement>(null);

  const getMoreItem = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    dispatch(increment());
  };

  const onIntersect = async ([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting && !isFetching) {
      await getMoreItem();
    }
  };

  useEffect(() => {
    let observer: IntersectionObserver;
    if (target.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [target.current]);

  useEffect(() => {
    if (data) setComics(comics => comics.concat(data.data));
  }, [data]);

  if (isLoading) return <Loader />;
  if (!comics || error) return <div>Missing comic!</div>;

  return (
    <>
      <GlobalStyle />
      <AppWrap>
        <section id="Ranking">
          <ComicItemList comics={comics} />
        </section>
        {data?.hasNext && (
          <div ref={target} className="Target-Element">
            {!isFetching && <Loader />}
          </div>
        )}
      </AppWrap>
    </>
  );
};

export default Ranking;
