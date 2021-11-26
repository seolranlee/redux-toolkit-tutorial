import React, { useEffect, useState } from 'react';
import { useGetComicByPageQuery } from '../services/comic';
import Loader from '../components/Loader.component';
import useIntersect from '../hooks/useIntersect.hoosk';

export default function RankingPage() {
  const [page, setPage] = useState(1);
  const [comics, setComics] = useState([]);
  const { data, error, isLoading } = useGetComicByPageQuery(page);

  // io
  const [target, setTarget] = useState(null);

  const onIntersect = async ([entry], observer) => {
    observer.unobserve(entry.target);
    setTimeout(() => {
      if (page < 5) setPage(page + 1);
    }, 1000);
    observer.observe(entry.target);
  };

  useEffect(() => {
    if (data) setComics(comics.concat(data.data));
  }, [data]);

  useIntersect({
    onIntersect,
    target,
    isLoading,
    page,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!comics) return <div>Missing comic!</div>;

  return (
    <div className="App">
      <>
        {comics.map((comic, idx) => (
          <div key={comic.id}>
            {idx} {comic.title}
          </div>
        ))}
        <button onClick={() => setPage(page + 1)}>page add</button>
        <div ref={setTarget} className="Target-Element">
          {isLoading && <Loader />}
        </div>
      </>
    </div>
  );
}
