import React, { useEffect, useState } from 'react';
import { useGetComicByPageQuery } from './services/comic';
import Loader from './components/Loader.component';
import useIntersect from './hooks/useIntersect.hoosk';
import Counter from './components/Counter.component';

export default function App() {
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

  // Using a query hook automatically fetches data and returns query values
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
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
      <Counter />
    </div>
  );
}
