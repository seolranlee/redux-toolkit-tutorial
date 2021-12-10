import React, { useEffect, useState, useRef } from 'react';
import { useGetComicByPageQuery } from '../services/comic';
import Loader from '../components/Loader.component';
import ComicItemList from '../components/ComicItemList.component';
import styled, { createGlobalStyle } from 'styled-components';
import { ComicRankItem } from '../services/comic';
import Target from '../components/Target.component';

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
  const [comics, setComics] = useState<ComicRankItem[]>([]);
  const { data, error, isLoading, isFetching } = useGetComicByPageQuery(page);

  // io
  const target = useRef<HTMLDivElement>(null);

  const getMoreItem = async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    setPage(page => page + 1);
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
      {data && (
        <>
          <GlobalStyle />
          <AppWrap>
            <section id="Ranking">
              <ComicItemList comics={comics} />
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
