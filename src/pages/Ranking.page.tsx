import React, { ReactElement, useEffect, useState } from 'react';
import { useGetComicByPageQuery } from '../services/comic';
import Loader from '../components/Loader.component';
// import useIntersect from '../hooks/useIntersect.hooks';
import ComicItemList from '../components/ComicItemList.component';
import styled, { createGlobalStyle } from 'styled-components';
import { useAppSelector, useAppDispatch } from '../hooks/hooks';
import { increment } from '../features/comic/comicSlice';

// import Counter from '../components/Counter.component';

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

  const [comics, setComics] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data, error, isLoading, isFetching } = useGetComicByPageQuery(page);

  // io
  const [target, setTarget] = useState(null);

  const getMoreItem = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    dispatch(increment());
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isFetching) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

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
        {page < 5 && (
          <div ref={setTarget} className="Target-Element">
            {!isFetching && <Loader />}
          </div>
        )}
      </AppWrap>
    </>
  );
};

export default Ranking;
